import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import ""

let socket;

export default function Chat(props) {
  const { name, topic } = queryString.parse(props.location.search);
  const ENDPOINT = "localhost:4000";
  const [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");

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

  function sendMessage(event) {
    event.preventDefault();
    console.log(event.key);
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  }
  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
      <InfoBar />
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => (event.key === "Enter") ? sendMessage(event) : null}
        />
      </div>
    </div>
  );
}
