import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const megaHrs = Math.floor(seconds / 3600);
  const hrs = Math.floor((seconds % 3600) / 60);
  const mins = seconds % 60;

  const formatTime = (value) => String(value).padStart(2, '0');

  return (
    <div style={styles.container}>
      {/* <h1 style={styles.title}>⏱️ Stopwatch</h1> */}
      <div style={styles.timeDisplay}>
        <span>{formatTime(megaHrs)}:</span>
        <span>{formatTime(hrs)}:</span>
        <span>{formatTime(mins)}</span>
      </div>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={() => setRunning(true)}>Start</button>
        <button style={styles.button} onClick={() => setRunning(false)}>Stop</button>
        <button style={styles.button} onClick={() => { setRunning(false); setSeconds(0); }}>Reset</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    scroll: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxSizing: 'border-box',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
    color: '#00e0ff',
  },
  timeDisplay: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#ffffff',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: '1px solid #00e0ff',
    background: 'transparent',
    color: '#00e0ff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};


export default App;
