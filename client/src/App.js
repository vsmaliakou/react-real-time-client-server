import EventSourcing from './EventSourcing';
import LongPulling from './LongPulling';
import WebSock from './WebSock';
import './app.css';

function App() {
  return (
    <div>
      {/* <LongPulling /> */}
      {/* <EventSourcing /> */}
      <WebSock />
    </div>
  );
}

export default App;
