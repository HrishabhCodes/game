import React, { useEffect } from "react";
const tmi = require("tmi.js");

const Twitch = () => {
  useEffect(() => {
    let users = [];

    const client = new tmi.Client({
      channels: ["ilmango"],
    });

    client.connect();

    client.on("message", (channel, tags, message, self) => {
      users[tags.username] = true;
      console.log(`${tags["display-name"]}: ${message}`);
    });
  }, []);

  return <></>;
};

export default Twitch;
