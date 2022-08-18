import React, { useState } from "react";
import "../Modes/Canvas.css";
import Button from "./Button";

const colors1 = [
  "#ffffff",
  "#ff0000",
  "#f4fc03",
  "#ff8400",
  "#00ff00",
  "#03bafc",
  "#0000ff",
  "#d10aa3",
  "#f752dc",
  "#6b441a",
];

const colors2 = [
  "#000000",
  "#ad0303",
  "#afba0d",
  "#a3400f",
  "#1c8f11",
  "#0e5bac",
  "#0c1a78",
  "#ac0eac",
  "#fc03d7",
  "#36190a",
];

const Menu = ({ setLineColor, setLineWidth, setLineOpacity, ctx, canvas }) => {
  const [inputColor, setInputColor] = useState("#000000");
  return (
    <div className="menu col-8">
      <div className="small-display">
        <div>
          <input
            className="color-picker m-2"
            type="color"
            value={inputColor}
            onChange={(e) => {
              setLineColor(e.target.value);
              setInputColor(e.target.value);
            }}
          />
        </div>

        <div className="color-wrapper m-2">
          <div>
            {colors1.map((color) => (
              <Button
                key={color}
                setLineColor={setLineColor}
                color={color}
                setInputColor={setInputColor}
              />
            ))}
          </div>

          <div>
            {colors2.map((color) => (
              <Button
                key={color}
                setLineColor={setLineColor}
                color={color}
                setInputColor={setInputColor}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="menuSilde">
        <i
          className="fa-solid fa-eraser m-2 menuButton"
          type="button"
          value="Earase"
          onClick={(e) => {
            e.target.value = "#ffffff";
            setLineColor(e.target.value);
          }}
        ></i>

        {/* <i
          className="m-2 menuButton fa-solid fa-trash-can"
          type="button"
          value="Clear"
          onClick={async (e) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }}
        /> */}
      </div>

      <label className="menuSilde">
        Brush Width
        <div>
          <input
            type="range"
            min="3"
            defaultValue="5"
            max="20"
            onChange={(e) => {
              setLineWidth(e.target.value);
            }}
          />
        </div>
      </label>
      <label className="menuSilde">
        Brush Opacity
        <div>
          <input
            type="range"
            min="1"
            defaultValue="100"
            max="100"
            onChange={(e) => {
              setLineOpacity(e.target.value / 100);
            }}
          />
        </div>
      </label>
    </div>
  );
};

export default Menu;
