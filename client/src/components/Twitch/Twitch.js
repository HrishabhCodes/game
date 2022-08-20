import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";
const tmi = require("tmi.js");
let barChart = {};

const Twitch = ({chance}) => {
  const [userData, setUserData] = useState({ labels: [], datasets: [] });
  useEffect(() => {
    setUserData({ labels: [], datasets: [] });
    barChart={}
  }, [chance])
  
  const addScore = (msg) => {
    if (barChart[msg]) {
      barChart[msg] = barChart[msg] + 1;
    } else {
      barChart[msg] = 1;
    }
  };
  useEffect(() => {
    let users = [];

    const client = new tmi.Client({
      channels: [""],
    });

    client.connect();

    client.on("message", (channel, tags, message, self) => {
      users[tags.username] = true;
    });
  }, []);

  useEffect(() => {
    let time = setInterval(() => {
      addScore(Math.floor(Math.random() * 10 + 1));
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, []);

  const sortResposne = () => {
    let sortable = [];
    for (var score in barChart) {
      sortable.push([score, barChart[score]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    const labels = [];
    const datasets = [];

    for (let i = 0; i < 5; i++) {
      labels.push(sortable[i][0]);
      datasets.push(sortable[i][1]);
    }

    setUserData({
      labels: labels,
      datasets: [
        {
          label: "score",
          data: datasets,
          backgroundColor: ["#9adcff", "#e97aff"],
        },
      ],
    });
  };

  useEffect(() => {
    let time = setInterval(() => {
      sortResposne();
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Bar data={userData} />
    </div>
  );
};

export default Twitch;
