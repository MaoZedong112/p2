import ShowTables from "./showTables";
import Handlers from "./Handlers"
import { useState, useEffect } from "react";

function Admin() {
    const [dataTables, setDataTables] = useState<{ [key: string] : []}>({
        users: [],
        equipment: [],
        categories: [],
        rentals: []
    });

    const fetchData = async (table_name: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${table_name}`);
            const json = await response.json();
            setDataTables(prev => ({ ...prev, [table_name]: json }));
        }
        catch{ console.log("?")}
    };

    useEffect(() => {
      Object.keys(dataTables).forEach(table => fetchData(table))
    }, [dataTables]);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>, table_name: string) => {
      const response = await Handlers.handleSubmit(e, table_name);
      if (response) {
        // setDataTables(prev => ({ ...prev, [table_name]: [...prev[table_name], response] })); 
        await fetchData(table_name)
      }
    };

    const handleDelete = async (table_name: string, id: number) => {
        const response = await Handlers.handleDelete(table_name, id);
        if (response.ok){
            await fetchData(table_name)
        }
    };

    const handleUpdate = async(table_name: string, id: number, data: []) => {
        const response = await Handlers.handleUpdate(table_name,id,data)

        if (response.ok){
            fetchData(table_name)
        }
    }

    const [selectedTable, setSelectedTable] = useState("users");

    return (
        <div id="adminControls">
            <select value={selectedTable} onChange={(e) => {setSelectedTable(e.target.value)}}>
                <option value="users">users</option>
                <option value="equipment">equipment</option>
                <option value="categories">categories</option>
                <option value="rentals">rentals</option>
            </select>
            <ShowTables  
                table_name={selectedTable} 
                data={dataTables[selectedTable]}
                onDelete={(id) => handleDelete(selectedTable, id)} 
                onUpdate={handleUpdate}
            />

            <hr></hr>
            <form onSubmit={(e) => handleSubmit(e, "users")}>
                <h2>User</h2>
                <input type="text" name="name" placeholder="name" required></input>
                <input type="text" name="email" placeholder="email" required></input>
                <input type="text" name="role" placeholder="role" required></input>
                <input type="text" name="created_at" placeholder="created_at"></input>
                <button type="submit">Submit</button>
            </form>
            <form onSubmit={(e) => handleSubmit(e, "equipment")}>
                <h2>Equipment</h2>
                <input type="text" name="name" placeholder="name" required></input>
                <input type="number" name="categoryID" placeholder="categoryID" required></input>
                <input type="text" name="status" placeholder="status" required></input>
                <input type="text" name="image_url" placeholder="image url"></input>
                <input type="text" name="created_at" placeholder="created_at"></input>
                <button type="submit">Submit</button>
            </form>
            <form onSubmit={(e) => handleSubmit(e, "categories")}>
                <h2>Categories</h2>
                <input type="text" name="name" placeholder="name" required></input>
                <input type="text" name="description" placeholder="description" required></input>
                <button type="submit">Submit</button>
            </form>
            <form onSubmit={(e) => handleSubmit(e, "rentals")}>
                <h2>Rentals</h2>
                <input type="number" name="equipmentID" placeholder="equipment id" required></input>
                <input type="number" name="userID" placeholder="User id" required></input>
                <input type="text" name="rented_at" placeholder="rented at" required></input>
                <input type="text" name="return_date" placeholder="return date" required></input>
                <input type="text" name="returned_at" placeholder="returned at"></input>
                <input type="text" name="status" placeholder="status" required></input>
                <button type="submit">Submit</button>
            </form>
            </div>
  );
}

export default Admin