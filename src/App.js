import Play from "./components/PlayPage/Play";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/HomePage/Home";
import Profile from "./components/Profile/Profile";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const shape = [];
for (let i = 1; i <= 10; i++) {
  shape.push(<li key={i} />);
}

function App() {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [active, setActive] = useState("home");
  return (
    <div className="app-container ">
      <ul className="circles">{shape}</ul>
      <BrowserRouter>
        <Navbar active={active} setActive={setActive} />
        <Routes>
          <Route
            path="/"
            element={<Home name={name} socket={socket} setActive={setActive} />}
          />
          <Route
            path="profile"
            element={<Profile name={name} setName={setName} />}
          />
          <Route path="play" element={<Play name={name} socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
