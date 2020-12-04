import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

export default function Join() {
  let [username, setUserName] = useState("");
  let [topic, setTopic] = useState("");

  function handleChange(event) {
    let { name, value } = event.target;

    if (name === "username") {
      setUserName(value);
    } else if (name === "topic") {
      setTopic(value);
    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Welcome to the Community</h1>
        <div>
          <input
            type="text"
            name="username"
            className="joinInput"
            placeholder="Please enter your name"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="topic"
            className="joinInput mt-20"
            placeholder="Please enter a topic name"
            value={topic}
            onChange={handleChange}
          />
        </div>
        <Link
          to={`/chat?name=${username}&topic=${topic}`}
          onClick={(event) =>
            !username || !topic ? event.preventDefault() : null
          }
        >
          <button className="button mt-20">Enter</button>
        </Link>
      </div>
    </div>
  );
}
