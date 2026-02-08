
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

App.delete("api/:table_name/:id",async (c) => {
    const table_name = c.req.param('table_name');
    const id = c.req.param('id');

    try {
        const result = await DB.deleteRecord(table_name,id);
        return c.json(result, 200)
    }
    catch (err) {
        return c.json({error: err.message}, 500)
    }
})

App.post("api/:table_name", async (c) => {
    const table_name = c.req.param("table_name");
    const data = await c.req.json();

    try {
        const result = await DB.addRecord(table_name, data);
        return c.json(result, 201);
    } 
    catch (err) {
        return c.json({ error: err.message }, 500);
    }
});

App.put("api/:table_name/:id",async (c) => {
    const table_name = c.req.param('table_name');
    const id = c.req.param('id');

    const data = await c.req.json();
    const result = DB.updateRecord(table_name, id, data);
    
    return c.json(result, 201);
})



serve({ 
    fetch: App.fetch, 
    port: process.env.PORT
})

