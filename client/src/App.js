import Play from "./components/PlayPage/Play";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import React, { useContext } from "react";
import Home from "./components/HomePage/Home";
import Profile from "./components/Profile/Profile";
import "./App.css";
const shape = [];
for (let i = 1; i <= 10; i++) {
  shape.push(<li key={i} />);
}

const App = () => {
  return (
    <div className="app-container ">
      <ul className="circles">{shape}</ul>
      <BrowserRouter>
        <Navbar />
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="play" element={<Play />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
};

export default App;
