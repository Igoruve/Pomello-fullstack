
import FetchData from "./fetch";


/**
 * Starts a Pomellodoro cycle.
 *
 * Makes an API call to start a new Pomellodoro cycle with the given focus and break durations.
 * If the call fails, it throws an Error with the error message.
 *
 * @param {number} focusDuration The duration of the focus phase in minutes.
 * @param {number} breakDuration The duration of the break phase in minutes.
 *
 * @returns {Promise<Object>} The result of the API call, containing the session ID.
 *
 * @throws {Error} If there's an error starting the Pomellodoro cycle.
 */
async function startChrono(focusDuration, breakDuration) {
  const data = { focusDuration, breakDuration };
  const result = await FetchData("/chrono/pomellodoro/start", "POST", data);

  if (result.error || result.status >= 400) {
    throw new Error(result.message || "Error al iniciar el pomodoro");
  }

  return result;
}


/**
 * Stops the current Pomellodoro cycle.
 *
 * Makes an API call to update the session state to stopped and
 * returns the updated session data.
 *
 * @returns {Promise<Object>} A promise that resolves to the updated session data.
 * @throws {Error} If the fetch operation fails or returns an error.
 */
async function stopChrono() {
  const result = await FetchData("/chrono/pomellodoro/stop", "POST");

  if (result.error || result.status >= 400) {
    throw new Error(result.message || "Error al detener el pomodoro");
  }

  return result;
}



/**
 * Fetches and returns statistics for the user's chronometer sessions.
 *
 * Makes an API call to retrieve the accumulated statistics data
 * which includes total focus time, sessions count, and more.
 *
 * @returns {Promise<Object>} A promise that resolves to the statistics data.
 * @throws {Error} If the fetch operation fails or returns an error.
 */

export async function getChronoStats() {
  return await FetchData("/chrono/stats");
} 

/**
 * Fetches and returns the current state of the Pomellodoro cycle.
 *
 * Makes an API call to retrieve the current state of the Pomellodoro cycle.
 * The state is an object with a single property `running` which is a boolean
 * indicating whether the cycle is currently active.
 *
 * @returns {Promise<Object>} A promise that resolves to the current state of the Pomellodoro cycle.
 * @throws {Error} If the fetch operation fails or returns an error.
 */
async function getStatus() {
  const result = await FetchData("/chrono/pomellodoro/status", "GET");

  if (result.error || result.status >= 400) {
    throw new Error(result.message || "Error al obtener el estado del pomodoro");
  }

  // Agrega esto para ver qué devuelve realmente:
  console.log("🧪 Respuesta de /status:", result);

  return result; // debe ser { running: true }
}


export { startChrono, stopChrono, getStatus };