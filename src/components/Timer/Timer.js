import React, { useState, useContext } from "react";
import "./timer.css";
import SocketContext from "../../context/socketContext";

function Timer({ sec, round }) {
  const ctx = useContext(SocketContext);
  // const [secs, setTime] = useState(sec);
  // const [word, setWord] = useState("");
  // setWord("words");
  const word = "word";
  const secs = sec;
  const tick = () => {
    if (secs === 0) {
      //reset();
      // gameOver();
      // setTime(parseInt(0.5));
    } else {
      // setTime(secs - 1);
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
      <div className="round text-center fs-4 text">{round}/3</div>
      <div className="drawingObj text-center fs-4 text">{word}</div>
      <div className="timer text-center fs-4 text">{`${secs
        .toString()
        .padStart(2, "0")}`}</div>
    </React.Fragment>
  );
}
export default Timer;
