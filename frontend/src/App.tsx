import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import AdminPanel from "./AdminPanel";
import HomePage from "./HomePage";
import './App.css'

function App() {

  return (
    <BrowserRouter> 
      <Routes>  
        <Route path="/adminPanel" element={<AdminPanel />} /> 
        <Route path="/HomePage" element={<HomePage />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
