import ShowTables from "./showTables";
import Handlers from "./Handlers"

function Admin() {
  
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>, table_name: string) => {
        await Handlers.handleSubmit(e, table_name)
    }

    return (
        <div id="admin controls">
            <ShowTables table_name = "users" />
            <ShowTables table_name = "equipment" />
            <ShowTables table_name = "categories" />
            <ShowTables table_name = "rentals" />
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