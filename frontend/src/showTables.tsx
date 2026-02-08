import { useState } from "react";

type Props = { 
  table_name: string, 
  data: [],
  onDelete: (id: number) => void,
  onUpdate: (table_name: string, id: number, data: []) => void
};

function ShowTables({ table_name, data, onDelete, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editFormData, setEditFormData] = useState<any>({});

  let keys: string[]
  if (data[0] != undefined && data[0] != null) {
    keys = Object.keys(data[0]);
  }
  else {keys = [];}

  // const keys = data.length > 0 ? Object.keys(data[0]) : [];

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditFormData(item); // Pre-fill with existing data
  };

  const handleSave = (id: number) => {
    onUpdate(table_name, id, editFormData);
    setEditingId(null);
  };

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
                <td key={key}>
                  {editingId === item.id ? (
                    <input
                      value={editFormData[key] || ""}
                      onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                    />
                  ) : (item[key])}
                </td>
              ))}
              <td>
                {editingId === item.id ? (
                  <>
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(item)}>Edit</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                  </>
                )}
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