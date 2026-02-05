let data = {
    id: 1,
    name: "nig",
    desc: "er"
}

let columns = Object.keys(data).join(", ")
let values = Object.values(data).join("', '")
let table_name = "nnnn"
columns = columns.substring(columns.indexOf(",") + 1)
values = values.substring(values.indexOf(",") + 1)

console.log(`INSERT INTO ${table_name} (${columns}) VALUES (${values}')`)
