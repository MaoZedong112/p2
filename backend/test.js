let data = {
  name: 'ni',
  email: 'alexxxb200@gmail.com',
  role: 'user',
  created_at: '2024-01-03'
}

// let columns = Object.keys(data).join(", ")
// let values = Object.values(data).join("', '")
// let table_name = "nnnn"
// columns = columns.substring(columns.indexOf(",") + 1)
// values = values.substring(values.indexOf(",") + 1)

const columns = Object.keys(data).join(", ");
const placeholders = Object.keys(data).map(() => "?").join(", ");
const values = Object.values(data);

let table_name = "users"

const stmt = `INSERT INTO ${table_name} (${columns}) VALUES (${placeholders})`;

console.log(stmt)
console.log(values)

