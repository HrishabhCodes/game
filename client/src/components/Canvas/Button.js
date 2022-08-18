import React from "react";
import "../Modes/Canvas.css";
const Button = (props) => {
  return (
    <span
      className="colorButton "
      style={{ backgroundColor: props.color, height: "15px", width: "15px" }}
      onClick={(e) => {
        e.target.value = props.color;
        props.setLineColor(e.target.value);
        props.setInputColor(props.color);
      }}
    />
  );
};
export default Button;
