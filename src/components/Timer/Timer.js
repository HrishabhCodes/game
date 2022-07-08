import React, { useState, useContext, useEffect } from "react";
import "./Timer.css";
import SocketContext from "../../context/socketContext";

function Timer({ round, word, id, secs, setSecs }) {
  const ctx = useContext(SocketContext);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSecs((prev) => prev - 1);
  //   }, 1000);
  // }, [secs]);
  if (id !== ctx.id) {
    word = "-".repeat(word.length);
    word = word + ` (${word.length})`;
  }
  return (
    <React.Fragment>
      <div className="round text-center fs-4 text">{round}/3</div>
      <div className="drawingObj text-center fs-4 text">{word}</div>
      <div className="timer text-center fs-4 text">{secs}</div>
    </React.Fragment>
  );
}
export default Timer;
