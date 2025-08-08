import './App.css';
import io from 'socket.io-client';
import {useState} from 'react';
import Chat from './chat';

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== ""){
      socket.emit("join_room", room);
      setShowChat(true);
      //console.log(`${username} has joined room: ${room}`);

    }
  };
  
  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
        <h3>Tico Chat</h3>
        <input
          type="text"
          placeholder='Your Name...'
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          />
          <input
            type="text"
            placeholder='Enter a Room ID'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      )
      : (
          <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}


export default App;
