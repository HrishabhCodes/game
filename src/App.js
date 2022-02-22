import Navbar from "./components/Navbar/Navbar";
import Play from "./components/PlayPage/Play";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Profile from "./components/Profile/Profile";
import "./App.css";
const shape = [];
for (let i = 1; i <= 10; i++) {
  shape.push(<li />);
}
console.log(shape);
function App() {
  return (
    <div className="app-container ">
      <ul className="circles">{shape}</ul>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
