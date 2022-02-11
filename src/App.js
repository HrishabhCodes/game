import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Play from "./components/PlayPage/Play";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
