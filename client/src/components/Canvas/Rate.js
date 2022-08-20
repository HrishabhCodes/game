import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, runTransaction } from "firebase/firestore";
import SocketContext from "../../context/socketContext";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Rate = ({ chance }) => {
  const [isRated, setIsRated] = useState(false);
  const ctx = useContext(SocketContext);

  useEffect(() => {
    setIsRated(false);
  }, [chance]);

  const rateDrawing = async (score) => {
    setIsRated(true);
    try {
      const newScore = await runTransaction(db, async (transaction) => {
        const roomDocRef = doc(db, "rooms", ctx.docRef);
        const roomDoc = await transaction.get(roomDocRef);

        if (!roomDoc.exists()) {
          throw "Document does not exist!";
        }

        const obj = roomDoc.data();
        const points = obj.users[chance - 1].score + score;
        obj.users[chance - 1].score = points;
        transaction.update(roomDocRef, obj);
        return points;
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="menu col-8">
      {arr.map((score, index) => {
        return (
          <div
            key={index}
            onClick={() => rateDrawing(score)}
            className={isRated ? "score-num rated" : "score-num"}
          >
            {score}
          </div>
        );
      })}
    </div>
  );
};

export default Rate;
