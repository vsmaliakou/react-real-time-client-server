import { useEffect, useState } from "react";
import axios from 'axios';

const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');

  const sendMessage = async () => {
    await axios.post('http://localhost:4000/new-messages', {
      message: value,
      id: Date.now(),
    });
  };

  const subscribe = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/get-messages');
      setMessages((prev) => [data, ...prev]);
      subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500);
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

export default LongPulling;
