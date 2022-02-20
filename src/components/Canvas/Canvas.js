import React, { useEffect, useRef, useState } from "react";
import Menu from "./menu";
import "./Canvas.css";
import Chat from "../gameChat/Chat";
import UserData from "../gameChat/UserData";

function Canvas({ socket, username, room }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.5);

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
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
  // Function for end the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };
  // Function for drawing
  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };

  return (
    <div className="container-fluid">
      <div className="App row " onTouchEnd={endDrawing} onMouseUp={endDrawing}>
        <UserData socket={socket} room={room} />
        <div className="draw-area col-7">
          <div
            onMouseMove={draw}
            onTouchMove={draw}
            onTouchStart={startDrawing}
            onMouseDown={startDrawing}
          >
            <canvas
              ref={canvasRef}
              width={window.innerWidth * 0.582}
              height={window.innerHeight * 0.7}
            />
          </div>
          <Menu
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            setLineOpacity={setLineOpacity}
            ctx={ctxRef.current}
            canvas={canvasRef.current}
          />
        </div>
        <Chat socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}
export default Canvas;
