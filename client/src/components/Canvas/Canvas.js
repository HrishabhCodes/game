import React, { useEffect, useRef, useState, useContext } from "react";
import Menu from "./menu";
import SocketContext from "../../context/socketContext";
import Timer from "../Timer/Timer";
import Rate from "./Rate";

// import io from "socket.io-client";
// import Canvas from "../Canvas/Canvas";

const Canvas = ({ seconds, innerRef, chance, word }) => {
  const ctx = useContext(SocketContext);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.5);

  useEffect(() => {
    const canvas = innerRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for drawing
  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <div
      className="draw-area col-7"
      // style={{ pointerEvents: ctx.id === current ? "" : "none" }}
      onMouseLeave={endDrawing}
      onMouseUp={endDrawing}
    >
      <div
        onMouseMove={draw}
        onTouchMove={draw}
        onTouchStart={startDrawing}
        onMouseDown={startDrawing}
      >
        <Timer
          round={1}
          word={word}
          id="current"
          secs={seconds}
          chance={chance}
        />
        <canvas
          ref={innerRef}
          width={window.innerWidth * 0.582}
          height={window.innerHeight * 0.7}
        />
      </div>
      {ctx.mode === "Grand Reveal" ? (
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          ctx={ctxRef.current}
          canvas={innerRef.current}
        />
      ) : chance === 0 && ctx.mode === "Rate It!" ? (
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          ctx={ctxRef.current}
          canvas={innerRef.current}
        />
      ) : (
        <Rate chance={chance} />
      )}
    </div>
  );
};

export default Canvas;
