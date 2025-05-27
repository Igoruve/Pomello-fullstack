import FetchData from "./fetch.js";

/**
 * Obtiene las estadísticas del cronómetro desde el backend.
 * @returns {Promise<Object>} Datos de las estadísticas del cronómetro.
 */

export async function getChronoStats() {
  return await FetchData("/chrono/stats");
}