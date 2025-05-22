import React, { useState, useEffect } from "react";
import {startChrono, stopChrono, getChronoStats, getStatus} from "../utils/chrono.js";

export default function PomodoroTimer() {
    const [status, setStatus] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStatus();
        fetchStats();
    }, []);

    async function fetchStatus() {
        try {
            const data = await getStatus();
            setStatus(data);
        } catch (err) {
            console.error("Error al obtener estado:", err);
        }
    }

    async function fetchStats() {
        try {
            const data = await getChronoStats();
            setStats(data);
        } catch (err) {
            console.error("Error al obtener estadísticas:", err);
        }
    }

    async function handleStart() {
        setLoading(true);
        try {
            await startChrono(25,5);
            fetchStatus();
        } catch (err) {
            console.error("Error al iniciar:", err);
        }
        setLoading(false);
    }


    async function handleStop() {
        setLoading(true);
        try {
            await stopChrono();
            fetchStatus();
            fetchStats();
        } catch (err) {
            console.error("Error al parar:", err);
        }
        setLoading(false);
    }

    return (
        <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
            <h1>Pomodoro</h1>
            <p>Estado actual: {status?.running ? "En marcha" : "Detenido"}</p>
            <button onClick={handleStart} disabled={loading || status?.running}>
                Iniciar
            </button>
            <button onClick={handleStop} disabled={loading || !status?.running}>
                Detener
            </button>

            <h2>Estadísticas</h2>
            {stats && (
                <ul>
                    <li>Total de sesiones: {stats.totalSessions}</li>
                    <li>Tiempo total: {stats.totalMinutes} minutos</li>
                </ul>
            )}
        </div>
    );
}
