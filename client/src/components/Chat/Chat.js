import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import TextContainer from "../TextContainer/TextContainer";
import "./Chat.css";

let socket;

export default function Chat(props) {
  const { name, room } = queryString.parse(props.location.search);
  const ENDPOINT = "localhost:4000";
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, () => {});

    return () => {
      console.log("Logging off");
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    console.log("inside effect");

    socket.on("message", (message) => {
      console.log("Got a message");
      setMessages((messages) => [...messages, message]);
    });

    socket.on("currentUsers", ({ users }) => {
      setUsers(users);
      console.log(`users After: ${users}`);
    });
  }, []);

  // useEffect(() => {
  //   console.log(`users Before: ${users}`);

  // }, [users]);

  function sendMessage(message) {
    socket.emit("sendMessage", message, () => {});
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />

        <Input sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
}
