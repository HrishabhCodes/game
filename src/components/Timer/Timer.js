import React, { useState, useContext } from "react";
import "./Timer.css";
import SocketContext from "../../context/socketContext";

function Timer({ sec, gameOver }) {
  const ctx = useContext(SocketContext);
  const [secs, setTime] = useState(sec);
  const [word, setWord] = useState("");
  ctx.socket.on("word", (data) => {
    console.log(data);
    setWord(data);
  });

  const tick = () => {
    if (secs === 0) {
      //reset();
      //gameOver();
      ctx.socket.emit("roundOver");
      setTime(parseInt(60));
    } else {
      setTime(secs - 1);
    }
  };
  // const reset = () => setTime(parseInt(sec));

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });
  //   setInterval(function () {
  //     setTime(seconds++);
  //   }, 1000);
  return (
    <React.Fragment>
      <div className="round text-center fs-4 text">1/3</div>
      <div className="drawingObj text-center fs-4 text">{word}</div>
      <div className="timer text-center fs-4 text">{`${secs
        .toString()
        .padStart(2, "0")}`}</div>
    </React.Fragment>
  );
}
export default Timer;
