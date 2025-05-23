import React, { useState, useEffect } from 'react';
import pomeloImg from './assets/pomelo.png';
import relojArenaImg from './assets/reloj_arena.png';
import './PomeloChrono.css'; // Asegúrate de crear este archivo para las animaciones

function PomeloChrono() {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleClick = () => {
    if (!isRunning) {
      // Iniciar el cronómetro
      const id = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      // Detener el cronómetro
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    // Limpieza al desmontar el componente
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="pomelo-chrono-container">
      <img
        src={isRunning ? relojArenaImg : pomeloImg}
        alt="Cronómetro"
        className={isRunning ? 'rotating' : ''}
        onClick={handleClick}
        style={{ cursor: 'pointer', width: '200px', height: '200px' }}
      />
      <div>
        <h2>Tiempo: {timer} segundos</h2>
      </div>
    </div>
  );
}

export default PomeloChrono;
