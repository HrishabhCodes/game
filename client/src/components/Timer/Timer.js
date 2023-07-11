import React, { useContext } from "react";
import "./Timer.css";
import SocketContext from "../../context/socketContext";

const Timer = ({ round, word, id, secs, chance }) => {
  const ctx = useContext(SocketContext);
  console.log(
    ctx.mode,
    chance,
    word,
    ctx.mode === "Grand Reveal" && chance > 0
  );
  if (id !== ctx.id && ctx.mode === "Grand Reveal" && chance > 0) {
    const arr = word.split(" ");
    let charCounter = 0;
    let temp = "";
    for (let i = 0; i < arr.length; i++) {
      temp = temp + `_ `.repeat(arr[i].length) + `\xa0\xa0`;
      charCounter += arr[i].length;
    }
    if (!(ctx?.user[chance - 1]?.id === ctx?.id))
      word = `${temp}(${charCounter})`;
  }

  return (
    <React.Fragment>
      <div className="round text-center fs-4 text">
        {round}/{ctx.mode === "Grand Reveal" || ctx.mode === "Rate It!" ? 1 : 3}
      </div>
      <div className="drawingObj text-center fs-4 text">{word}</div>
      <div className="timer text-center fs-4 text">{secs}</div>
    </React.Fragment>
  );
};
export default Timer;
