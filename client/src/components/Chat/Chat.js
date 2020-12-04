import React, { useEffect } from "react";
import "./Chat.css";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

export default function Chat(props) {
  let { name, topic } = queryString.parse(props.location.search);
  const ENDPOINT = "localhost:4000";

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join", { name, topic }, (msg) => console.log(msg));
  }, [ENDPOINT, name, topic]);

  return <h1>This is Chat route</h1>;
}
