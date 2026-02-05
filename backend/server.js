
import { Hono } from "hono";
import { cors } from 'hono/cors';
import { serve } from "@hono/node-server";
import DB from "./database.js"

const App = new Hono();

App.use('*', cors({ origin: 'http://localhost:5173' }));

App.get("api/:table_name",(c) =>{
    const table_name = c.req.param('table_name');
    return c.json(DB.getAllFromTable(table_name))
})

App.delete("api/:table_name/:id",(c) => {
    const table_name = c.req.param('table_name');
    const id = c.req.param('id');
    DB.deleteRecord(table_name,id);
})

App.post("api/users",async (c) => {
    const { name,email,role,created_at } = await c.req.json();
    const info = DB.addRecord("users", { name,email,role,created_at } );
    

    return c.json({ id: info.lastInsertRowid, name, email, role, created_at });
})

App.post("api/equipment",async (c) => {
    const { name,categoryID,status,image_url,created_at } = await c.req.json();
    const info = DB.addRecord("equipment",);
    

    return c.json({ id: info.lastInsertRowid, name, email, role, created_at });
})


serve({ 
    fetch: App.fetch, 
    port: process.env.PORT
})

