import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [equipment, setEquipment] = useState([])
  const [newRecord, setNewRecord] = useState({ name: '',email: '',role: '',created_at: ''});
  useEffect(
    () => {
      fetch("http://localhost:3003/equipment")
        .then(res => res.json())
        .then(data => setEquipment(data))
        .catch(err => console.error("error", err));
    }, []
  )

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3003/equipment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecord)
    });

    if (response.ok) {
      const savedRecord = await response.json();
      setNewRecord([...idk, savedRecord]);
      setNewRecord({ Name: '',Description: '', Amount: '', CategoryID: ''});
    }
  };


  return (
    <div>
      
    </div>
  )
}

export default App
