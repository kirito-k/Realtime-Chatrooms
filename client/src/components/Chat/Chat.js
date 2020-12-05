import React, { useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

let socket;

export default function Chat(props) {
  let { name, topic } = queryString.parse(props.location.search);
  const ENDPOINT = "localhost:4000";

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join", { name, topic }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    }
  }, [ENDPOINT, name, topic]);

  return <h1>This is Chat route</h1>;
}
