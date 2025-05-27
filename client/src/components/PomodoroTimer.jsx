import React, { useState, useEffect } from "react";
import { startChrono, stopChrono, getChronoStats, getStatus } from "../utils/chrono.js";

/**
 * PomodoroTimer is a React component that manages a pomodoro timer session.
 * It provides functionality to start and stop the timer, displaying the current status,
 * and shows statistics for the sessions.
 * The component handles loading states and displays error messages when necessary.
 * It uses effect hooks to fetch initial data when mounted and updates the display based
 * on the running state of the timer.
 */

export default function PomodoroTimer() {
    const [status, setStatus] = useState({ running: false });
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("PomodoroTimer mounted");
        fetchData();
    }, []);

    /**
     * fetchData is an async function that fetches the current status and stats from the API,
     * and updates the state of the component accordingly.
     * It sets the loading state to true before the requests, and sets it back to false after.
     * If any of the requests fail, it sets the error state with the error message.
     */
    async function fetchData() {
        try {
            setLoading(true);
            const [statusData, statsData] = await Promise.all([
                getStatus().catch(e => { console.error("Status error:", e); return { running: false }; }),
                getChronoStats().catch(e => { console.error("Stats error:", e); return null; })
            ]);
            setStatus(statusData || { running: false });
            setStats(statsData);
            setError(null);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Error al cargar datos");
        } finally {
            setLoading(false);
        }
    }

/**
 * Initiates a new Pomodoro session with predefined focus and break durations.
 * Sets the loading state to true during the process. If successful, updates the
 * component's status and statistics by fetching data from the API. If an error
 * occurs, logs the error and updates the error state with an appropriate message.
 * Finally, ensures the loading state is set to false.
 */

    async function handleStart() {
        setLoading(true);
        try {
            await startChrono(25, 5);
            await fetchData();
        } catch (err) {
            console.error("Start error:", err);
            setError(err.message || "Error al iniciar");
        }
        setLoading(false);
    }

    async function handleStop() {
        setLoading(true);
        try {
            await stopChrono();
            await fetchData();
        } catch (err) {
            console.error("Stop error:", err);
            setError(err.message || "Error al detener");
        }
        setLoading(false);
    }

    return (
        <div style={{ 
            padding: "1rem", 
            fontFamily: "sans-serif",
            textAlign: "center"
        }}>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            <h2>Estado: {status?.running ? "🟢 En marcha" : "🔴 Detenido"}</h2>
            
            <div style={{ margin: "1rem 0" }}>
                <button 
                    onClick={handleStart} 
                    disabled={loading || status?.running}
                    style={{
                        padding: "0.5rem 1rem",
                        margin: "0 0.5rem",
                        backgroundColor: "#2ecc71",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Iniciar
                </button>
                <button 
                    onClick={handleStop} 
                    disabled={loading || !status?.running}
                    style={{
                        padding: "0.5rem 1rem",
                        margin: "0 0.5rem",
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Detener
                </button>
            </div>

            <div style={{ 
                marginTop: "2rem",
                padding: "1rem",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px"
            }}>
                <h3>Estadísticas</h3>
                {stats ? (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li>Total sesiones: {stats.totalSessions || 0}</li>
                        <li>Tiempo total: {stats.totalMinutes || 0} minutos</li>
                    </ul>
                ) : (
                    <p>No hay datos de sesiones disponibles</p>
                )}
            </div>
        </div>
    );
} 






