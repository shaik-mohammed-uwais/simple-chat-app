import "./App.css";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import Toggleswitch from "./Toggleswitch";
import Colors from "./Colors";

// const username = nanoid(5);
const socket = io.connect(import.meta.env.VITE_SOCKET_URI);

function App() {
  const localusername = localStorage.getItem("username");
  const [username, setusername] = useState(localusername || nanoid(5));
  const [usercolor, setusercolor] = useState({});
  const scrollableDivRef = useRef(null);
  const [chat, setchat] = useState([]);
  const [message, setmessage] = useState("");

  const getusercolor = (id) => {
    if (!usercolor[id]) {
      const randomcolor = Colors[Math.floor(Math.random() * Colors.length)];
      setusercolor((prev) => ({
        ...prev,
        [id]: randomcolor,
      }));
      return randomcolor;
    }
    return usercolor[id];
  };
  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  const changeusername = (user) => {
    setusername(user);
  };

  useEffect(() => {
    if (chat.length < 100) {
      socket.on("chat", (payload) => {
        setchat([...chat, payload]);
      });
    } else {
      clearchat();
    }
  });
  const clearchat = () => {
    setchat([]);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, username });
    setmessage("");
  };

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <>
      <header>
        <Toggleswitch />
        <h1>chat-app</h1>
        <div>
          <span>user name</span>
          <input
            type="text"
            className="input-username"
            maxLength={6}
            value={username}
            onChange={(e) => {
              changeusername(e.target.value);
            }}
          />
        </div>

        <div className="scrollable-div" ref={scrollableDivRef}>
          {chat.map((payload, index) => {
            const usercolor = getusercolor(payload.username);
            return (
              <p
                key={index}
                className="chats-messages"
                style={{ backgroundColor: usercolor }}
              >
                <span>
                  {payload.username} : {payload.message}
                </span>
              </p>
            );
          })}
        </div>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            className=""
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
          <div className="buttons-contaier">
            <button
              type="button"
              value="clear"
              className="clear-chat"
              onClick={clearchat}
            >
              Clear
            </button>
            <button type="submit" className="send-button">
              Send
            </button>
          </div>
        </form>
      </header>
    </>
  );
}

export default App;
