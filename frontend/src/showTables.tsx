
import Handlers from "./Handlers"
import { useState, useEffect } from "react";

type Props = { table_name: string; };

function ShowTables({ table_name }: Props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3003/api/${table_name}`);
            const json = await res.json();
            setData(json);
        };
        fetchData();
    }, [table_name]);

    let keys;
    if (data[0] != undefined || data[0] != null) {
        keys = Object.keys(data[0]);
    } else keys = [];


    const handleDelete = (table_name: string, id: number) => {
        Handlers.handleDelete(table_name,id)

        setData(prev => prev.filter(item => item.id !== id))
    }

  // const keys = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <h3>{`${table_name} list`}</h3>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {keys.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              <td>
                <button
                  onClick={() => {
                    handleDelete(table_name, item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && <p>No Data</p>}
    </div>
  );
}

export default ShowTables