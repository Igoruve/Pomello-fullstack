import React, { useState, useEffect, useRef } from "react";
import "../styles/PomellodoroStyles.css";
import tomateIcon from "/assets/icon_01.png";
import relojIcon from "/assets/reloj_arena.png";
import { getToken } from "../utils/localStorage.js";

/**
 * Componente que renderiza un Pomellodoro con una interfaz de usuario simple.
 * El Pomellodoro se puede iniciar y parar con el botón central y ajustar
 * la duración del trabajo y el descanso con los campos de entrada numérica.
 * El componente utiliza el token de autenticación guardado en el almacenamiento
 * local para autenticar las solicitudes al backend.
 * @returns Un JSX element que renderiza el Pomellodoro.
 */
const PomellodoroChrono = () => {
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [notification, setNotification] = useState("");
  const [expanded, setExpanded] = useState(false);

  /**
   * Calcula la duración del descanso en minutos.
   * @param {number} focus - La duración del trabajo en minutos.
   * @returns {undefined}
   */
  const calculateBreak = (focus) => {
    const breakValue = Math.round((focus * 0.2 + Number.EPSILON) * 100) / 100;
    setBreakDuration(breakValue);
  };

  /**
   * Handles changes to the focus duration input field.
   * Updates the focus duration state and recalculates the break duration.
   *
   * @param {Object} e - The event object representing the change event from the input field.
   * @param {string} e.target.value - The new value from the input field, expected to be a string representation of a number.
   */

  const handleFocusChange = (e) => {
    const value = Number(e.target.value);
    setFocusDuration(value);
    calculateBreak(value);
  };

  /**
   * Handles clicks on the tomato button.
   * If the Pomellodoro is running, stops it. If it's not running, starts it.
   * If the Pomellodoro is already running in the backend, doesn't start a new one.
   * If the Pomellodoro is not running in the backend, starts one.
   * @returns {void}
   * @throws {Network error} If there's a network error.
   * @throws {Error} If there's an error from the backend.
   */
  const handleTomatoClick = async () => {
    const token = getToken();

    // check status from backend
    try {
      const statusRes = await fetch(
        "http://localhost:3013/chrono/pomellodoro/visual/status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const status = await statusRes.json();

      //validate status response
      if (!status || typeof status.running !== "boolean") {
        console.warn("Estado inválido desde el backend:", status);
        return;
      }

      //if active in backend, don't start a new one
      if (!isRunning && status.running) {
        console.warn("Ya hay un Pomellodoro activo en backend.");
        return;
      }

      const endpoint = isRunning
        ? "http://localhost:3013/chrono/pomellodoro/stop"
        : "http://localhost:3013/chrono/pomellodoro/start";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      };

      if (!isRunning) {
        options.body = JSON.stringify({ focusDuration, breakDuration });
      }

      const response = await fetch(endpoint, options);
      if (response.ok) {
        setIsRunning(!isRunning);
        setShowMenu(false); // Oculta el menú desplegable si se lanza el start desde botón
      } else {
        const err = await response.json();
        console.error("Error:", err);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  /**
   * Toggle the Pomellodoro menu on/off.
   *
   * @function
   */
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
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  // Polling to get pomellodoro status. LA ALTERNATIVA A WEB SOCKETS, QUE ES MÁS COMPLEJA Y NO NECESARIA PARA ESTE CASO Y NO DABA TIEMPO PARA IMPLEMENTAR PORTE NO LA CONTROLO BIEN.
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(async () => {
      try {
        const token = getToken();
        const response = await fetch(
          "http://localhost:3013/chrono/pomellodoro/status",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.warn(
            "Error checking Pomellodoro status:",
            response.statusText
          );
          setIsRunning(false); // syncro frontend & backend
          return;
        }

        const data = await response.json();
        if (!data.running) {
          console.log("Pomellodoro suscessfully stopped.");
          setIsRunning(false); // syncro frontend & backend
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 5000); // every 5 seconds   "GENTE: MODIFICAR AQUI PARA QUE NO SEA TAN FRECUENTE O SI QUEREIS QUE SEA ACORDE AL TIEMPO QUE ENTRA POR INPUT DE INICIO DEL CHRONO

    return () => clearInterval(interval); // cleanup on unmount or when isRunning changes
  }, [isRunning]);

  const previousStatus = useRef({
    running: false,
    phase: null,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const token = getToken();
        const res = await fetch(
          "http://localhost:3013/chrono/pomellodoro/visual/status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) return;

        const data = await res.json();
        const { running, phase } = data;

        // start of pomellodoro notification
        // start of pomellodoro notification
        if (!previousStatus.current.running && running && phase === "focus") {
          setNotification("Chrono started successfully!");
        }

        // Cphase change notification
        if (
          previousStatus.current.phase !== phase &&
          previousStatus.current.running
        ) {
          if (phase === "break") {
            setNotification("Good job! Time for a break!");
          } else if (phase === "focus") {
            setNotification("Back to work!");
          }
        }

        // end of pomellodoro notification
        if (previousStatus.current.running && !running) {
          if (String(data.manuallyStopped) === "true") {
            setNotification("Chrono stoped manually.");
          } else {
            setNotification("Pomodoro finished! Time to relax!");
          }
        }

        previousStatus.current = { running, phase };
      } catch (error) {
        console.error("Error fetching visual status:", error);
      }
    }, 2000); // every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        setNotification("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  const handleShowInfo = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div
      ref={menuRef}
      className="flex flex-col gap-8 items-center justify-center text-white/80 w-full"
    >
      {notification && (
        <p className="bg-white/50 text-black absolute -left-64 top-6 px-4 py-2 rounded-lg ">
          {notification}
        </p>
      )}

      <img
        src={tomateIcon}
        alt="Pomellodoro Icon"
        className={`pomello-icon ${isRunning ? "rotating" : ""}`}
        onClick={handleTomatoClick}
      />
      <div className="flex flex-col gap-8 items-center justify-center w-full">
        <div className="flex items-center justify-center gap-2 flex-col">
          <label>Focus</label>
          <div className="relative w-32">
            <input
              id="focus"
              type="number"
              value={focusDuration}
              min="1"
              step="1"
              onChange={handleFocusChange}
              className="w-full pr-10 text-center bg-gray-700 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56b79] transition-colors duration-300 py-1"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 text-sm pointer-events-none">
              mins
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="flex items-center justify-center gap-2 flex-col">
            <label>Break</label>
            <div className="relative w-32">
              <input
                id="break"
                type="number"
                value={breakDuration}
                step="0.1"
                readOnly
                tabIndex={-1}
                className="w-full pr-10 text-center py-1 cursor-default focus:outline-none pointer-events-none bg-transparent text-white/80"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 text-sm pointer-events-none">
                mins
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleTomatoClick}
          className="px-4 py-2 bg-[#f56b79] text-white rounded-lg hover:bg-[#f56b79]/90 transition-colors duration-300 cursor-pointer w-32"
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <p className="text-center text-white/80 px-4">
          Want to get extra help to focus? Start your pomodoro chrono and work
          more effectively.
        </p>
        <p
          className="text-[#f56b79] underline cursor-pointer"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          Learn More
        </p>
        {showMenu && (
          <div className="bg-white/90 text-black text-sm px-4 py-4 rounded-lg absolute -left-[600px] right-[200px] bottom-24">
            <p className=" font-bold">How Does the Pomodoro Technique Work?</p>
            <p>
              The Pomodoro Technique is a time management method that helps you
              stay focused and work more efficiently. It divides your time into
              blocks:
            </p>
            <ul>
              <li className="list-disc ml-6">
                Work blocks: You choose how many minutes you want to stay
                focused on your projects (e.g., 25 minutes).
              </li>
              <li className="list-disc ml-6">
                Breaks: After each work block, you take a short break (one fifth
                of your chosen work time).
              </li>
            </ul>
            <p>
              Once you complete four work blocks with their respective breaks,
              you've completed one Pomodoro. Our chrono automatically adjusts
              your breaks based on the focus time you set: you simply choose how
              long you want to work, and we handle the rest. This way, you can
              stay productive without worrying about intervals. We also keep
              track of your sessions so you can monitor your progress and stay
              motivated. You can check them at the Stats section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomellodoroChrono;
