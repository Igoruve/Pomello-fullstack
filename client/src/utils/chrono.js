import FetchData from "./fetch.js";

/**
 * Obtiene las estadísticas del cronómetro desde el backend.
 */
async function getChronoStats() {
  return await FetchData("/chrono/stats");
}

/**
 * Inicia el cronómetro en el backend.
 */
async function startChrono(focusDuration, breakDuration) {
  return await FetchData("/chrono/pomellodoro/start", "POST", {
    focusDuration,
    breakDuration,
  });
}

/**
 * Detiene el cronómetro en el backend.
 */
async function stopChrono() {
  return await FetchData("/chrono/pomellodoro/stop", "POST");
}

/**
 * Obtiene el estado actual del cronómetro.
 */
async function getChronoStatus() {
  return await FetchData("/chrono/pomellodoro/status");
}

export {
  getChronoStats,
  startChrono,
  stopChrono,
  getChronoStatus
};
