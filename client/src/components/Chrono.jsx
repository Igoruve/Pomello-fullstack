import React, { useState } from 'react';
import pomeloImg from '../assets/pomelo.png';
import relojArenaImg from '../assets/reloj_arena.png';
import '../styles/chronoStyles.css';

function PomellodoroChrono() {
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState(pomeloImg);
  const [rotationClass, setRotationClass] = useState('');

  const handleClick = async () => {
    const endpoint = isRunning ? '/pomellodoro/stop' : '/pomellodoro/start';
    const method = 'POST';

    try {
      const response = await fetch(`http://localhost:3013${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: isRunning
          ? undefined
          : JSON.stringify({ focusDuration: 1, breakDuration: 0.5 }) // valores de prueba
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unknown error');
      }

      setIsRunning(!isRunning);
      setMessage(data.message);
      setIcon(isRunning ? pomeloImg : relojArenaImg);
      setRotationClass(isRunning ? '' : 'rotating');

    } catch (error) {
      setMessage(`🍅❌ ${error.message}`);
    }
  };

  return (
    <div className="pomelo-chrono-container">
      <img
        src={icon}
        alt="Chronometer"
        className={rotationClass}
        onClick={handleClick}
        style={{ cursor: 'pointer', width: '200px', height: '200px' }}
      />
      {message && <div className="chrono-message">{message}</div>}
    </div>
  );
}

export default PomellodoroChrono;
