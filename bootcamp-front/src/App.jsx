
import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import PlayGame from "./pages/PlayGame";
import NewGame from "./pages/NewGame"
import { Link } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  return (
    <>
      <ul>
        <li> <button onClick={() => navigate("/")}>Home</button></li>
        <li> <button onClick={() => navigate("/playGame")}>playGame</button></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/playGame">PlayGame</Link></li>
      </ul>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playGame" element={<PlayGame />} />
        <Route path="/newGame" element={<NewGame />} />
      </Routes>
    </>
  )
}

export default App;
