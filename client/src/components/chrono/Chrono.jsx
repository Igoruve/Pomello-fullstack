import React, { useState } from 'react';

import pomeloImg from '../../../public/assets/icon_02.png';
import relojArenaImg from '../../../public/assets/icon_01.png';
import {
  startChrono,
  stopChrono,
  getChronoStatus
} from "../../utils/chrono.js";

import '../../../public/styles/chronoStyles.css';

function PomeloChrono() {
  const [isRunning, setIsRunning] = useState(false);
  const [showStopConfirmation, setShowStopConfirmation] = useState(false);
  const [status, setStatus] = useState(null);

  const handleStartChrono = async () => {
    try {
      await startChrono(25, 5);
      setIsRunning(true);
    } catch (error) {
      console.error("Error starting the chrono: ", error);
    }
  };

  const confirmStopChrono = async () => {
    try {
      await stopChrono();
      setIsRunning(false);
    } catch (error) {
      console.error("Error stopping the chrono: ", error);
    }
    setShowStopConfirmation(false);
  };

  return (
    <section className='flex flex-col items-center'>
      <img
        src={isRunning ? relojArenaImg : pomeloImg}
        alt="Timer Icon"
        className={isRunning ? 'rotating' : ''}
        style={{ cursor: 'pointer', width: '100px', height: '100px' }}
      />

      {!isRunning ? (
        <button
          onClick={handleStartChrono}
          className="font-bold px-4 py-2 rounded-lg bg-[#f56b79] mt-6 hover:bg-[#f56b79]/80 flex flex-row w-42 shadow-lg items-center justify-center"
        >
          Start chrono
        </button>
      ) : (
        <button
          onClick={() => setShowStopConfirmation(true)}
          className="font-bold px-4 py-2 rounded-lg bg-[#f56b79] mt-6 hover:bg-[#f56b79]/80 flex flex-row w-42 shadow-lg items-center justify-center"
        >
          Stop chrono
        </button>
      )}

      {showStopConfirmation && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setShowStopConfirmation(false)}
        >
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-gray-300 mb-6">
              Are you sure you want to stop your pomodoro? It'll affect your focus stats.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowStopConfirmation(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmStopChrono}
                className="bg-[#f56b79] text-white px-4 py-2 rounded-lg hover:brightness-90 transition cursor-pointer"
              >
                Stop
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PomeloChrono;
