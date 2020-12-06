import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import "./Chat.css";

let socket;

export default function Chat(props) {
  const { name, topic } = queryString.parse(props.location.search);
  const ENDPOINT = "localhost:4000";
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name, topic }, () => {});

    return () => {
      console.log("Logging off");
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, name, topic]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  function sendMessage(message) {
    socket.emit("sendMessage", message, () => {});
  }

  console.log(messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar topic={topic} />

        <Input sendMessage={sendMessage} />
        {/* <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        /> */}
      </div>
    </div>
  );
}
