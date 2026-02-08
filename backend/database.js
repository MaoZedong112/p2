import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DBpath = path.join(__dirname,"../database",process.env.DB_NAME)
console.log(DBpath)

const DB = new Database(DBpath)

DB.exec(
    `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE, 
        role TEXT CHECK(role IN ('admin', 'user')) DEFAULT 'user', 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
)

DB.exec(
    `CREATE TABLE IF NOT EXISTS categories(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        description TEXT
    )`
)

DB.exec(
    `CREATE TABLE IF NOT EXISTS equipment(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        categoryID INTEGER,
        status TEXT CHECK(status IN ('available', 'rented', 'maintenance')) DEFAULT 'available',
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoryID) REFERENCES categories(id)
    )`
)

DB.exec(
    `CREATE TABLE IF NOT EXISTS rentals(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        equipmentID INTEGER,
        userID INTEGER,
        rented_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        return_date DATETIME,
        returned_at DATETIME,
        status TEXT CHECK(status IN ('active', 'completed', 'overdue')) NOT NULL DEFAULT 'active',
        FOREIGN KEY (equipmentID) REFERENCES equipment(id),
        FOREIGN KEY (userID) REFERENCES users(id)
    )`
)

// DB.exec(
//     `CREATE TRIGGER IF NOT EXISTS set_equipment_rented
//     AFTER INSERT ON rentals
//     FOR EACH ROW 
//     BEGIN
//         UPDATE equipment
//         SET status = 'rented'
//         WHERE id = NEW.equipmentID;
//     END;`
// )

const getAllFromTable = (table_name) => {
    return DB.prepare(`SELECT * FROM ${table_name}`).all()
}

const deleteRecord = (table_name, id) => {
    return DB.prepare(`DELETE FROM ${table_name} WHERE id = ?`).run(id)
}

const addRecord = (table_name, data) => {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data).map(() => "?").join(", ");
    const values = Object.values(data);
      
    const stmt = DB.prepare( `INSERT INTO ${table_name} (${columns}) VALUES (${placeholders})` );
    return stmt.run(values);
}

const updateUsers = (id,name,emal,role,created_at) => {
    return DB.prepare(
        `UPDATE users SET name = ?, email = ?, role = ?, created_at = ? WHERE id = ?`
    ).run(name,emal,role,created_at,id)
};

const updateCategories = (id,name,description) => {
    return DB.prepare(
        `UPDATE categories SET name = ?, description = ? WHERE id = ?`
    ).run(name,description,id)
};

const updateEquipment = (id,name,categoryID,status,image_url,created_at) => {
    return DB.prepare(
        `UPDATE equipment SET name = ?, categoryID = ?, status = ?, image_url = ?, created_at = ? WHERE id = ?`
    ).run(name,categoryID,status,image_url,created_at,id)
};

const updateRentals = (id,name,equipmentID,userID,rented_at,return_date,returned_at,status) => {
    return DB.prepare(
        `UPDATE rentals SET name = ?, equipmentID = ?, userID = ?, rented_at = ?, return_date = ?, returned_at = ?, status = ? WHERE id = ?`
    ).run(name,equipmentID,userID,rented_at,return_date,returned_at,status,id)
};

const updateRecord = (table_name, id, data) => {
    const columns = Object.keys(data).map(key => `${key} = ?`) .join(", ");

    const values = Object.values(data);

    const stmt = DB.prepare(`UPDATE ${table_name} SET ${columns} WHERE id = ?`)

    return stmt.run(...values, id)
}

export default {deleteRecord, getAllFromTable, addRecord, updateUsers,updateCategories,updateEquipment,updateRentals,updateRecord}