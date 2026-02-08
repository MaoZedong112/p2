

console.log(import.meta.env.VITE_API_URL)

const handleSubmit = async (
  event: React.SubmitEvent<HTMLFormElement>,
  table_name: string,
) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch(`${import.meta.env.VITE_API_URL}/${table_name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return response.json();
  }
};

const handleDelete = async (table_name: string, id: number) => {
    const respose = await fetch(`${import.meta.env.VITE_API_URL}/${table_name}/${id}`, { method: "DELETE"})
    return respose
}

const handleUpdate = async(table_name: string, id: number, data: []) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${table_name}/${id}`, { 
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    return response
}

export default {handleSubmit, handleDelete, handleUpdate}