import React, { useState, useEffect, useRef } from 'react';
import '../styles/PomellodoroStyles.css';
import tomateIcon from '/assets/rodaja-de-tomate.png';
import relojIcon from '/assets/reloj_arena.png';
import { getToken } from "../utils/localStorage.js";


const PomellodoroChrono = () => {
  const [focusDuration, setFocusDuration] = useState(1);
  const [breakDuration, setBreakDuration] = useState(0.2);
  const [isRunning, setIsRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const calculateBreak = (focus) => {
    const breakValue = Math.round((focus * 0.2 + Number.EPSILON) * 100) / 100;
    setBreakDuration(breakValue);
  };

  const handleFocusChange = (e) => {
    const value = Number(e.target.value);
    setFocusDuration(value);
    calculateBreak(value);
  };

  const handleTomatoClick = async () => {
    const endpoint = isRunning
      ? 'http://localhost:3013/chrono/pomellodoro/stop'
      : 'http://localhost:3013/chrono/pomellodoro/start';

    const token = getToken();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };


    if (!isRunning) {
      options.body = JSON.stringify({ focusDuration, breakDuration });
    }

    try {
      const response = await fetch(endpoint, options);
      if (response.ok) {
        setIsRunning(!isRunning);
        setShowMenu(false); // Cerrar menú al iniciar o detener
      } else {
        const err = await response.json();
        console.error('Error:', err);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Ocultar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="pomello-wrapper" ref={menuRef}>
      <div className="pomello-header">
        <img
          src={isRunning ? relojIcon : tomateIcon}
          alt="Pomellodoro Icon"
          className={`pomello-icon ${isRunning ? 'rotating' : ''}`}
          onClick={handleTomatoClick}
        />
        <span className="pomello-arrow" onClick={handleToggleMenu}>| ▾</span>
      </div>

      {showMenu && (
        <div className="pomello-dropdown">
          <label htmlFor="focus">Focus (min):</label>
          <input
            id="focus"
            type="number"
            value={focusDuration}
            min="1"
            step="1"
            onChange={handleFocusChange}
          />

          <label htmlFor="break">Break (min):</label>
          <input
            id="break"
            type="number"
            value={breakDuration}
            step="0.1"
            readOnly
          />

          <button onClick={handleTomatoClick} className="pomello-button">
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PomellodoroChrono;