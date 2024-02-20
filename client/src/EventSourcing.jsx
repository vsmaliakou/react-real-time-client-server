import { useEffect, useState } from "react";
import axios from 'axios';

const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');

  const sendMessage = async () => {
    await axios.post('http://localhost:4000/new-messages', {
      message: value,
      id: Date.now(),
    });
  };

  const subscribe = async () => {
    const eventSource = new EventSource(`http://localhost:4000/connect`);
    eventSource.onmessage = function(event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    }
  };

  useEffect(() => {
    subscribe();
  }, []);

  return (
    <div className="center">
      <div>
        <div className="form">
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages.map((mess) => {
            return (
              <div className="message" key={mess.id}>
                {mess.message}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventSourcing;
