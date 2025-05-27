import React, { useState } from 'react';
import pomeloImg from '../assets/pomelo.png';
import relojArenaImg from '../assets/reloj_arena.png';
import '../styles/chronoStyles.css';

/**
 * PomellodoroChrono is a React component that visually represents the Pomellodoro cycle.
 * It allows users to start and stop a Pomellodoro session by clicking an icon.
 * The component manages its running state and updates its icon and message accordingly.
 * It communicates with the backend to toggle the Pomellodoro cycle and displays
 * the response message or error in the UI.
 */

function PomellodoroChrono() {
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState(pomeloImg);
  const [rotationClass, setRotationClass] = useState('');

  /**
   * Toggles the Pomellodoro cycle by making a POST request to /pomellodoro/start or /pomellodoro/stop.
   * Updates the component's running state, message and icon accordingly.
   * If the response is not ok, displays the error message.
   */
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
