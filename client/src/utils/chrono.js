
import FetchData from "./fetch";

async function startChrono(focusDuration, breakDuration) {
  const data = { focusDuration, breakDuration };
  const result = await FetchData("/chrono/pomellodoro/start", "POST", data);

  if (result.error || result.status >= 400) {
    throw new Error(result.message || "Error al iniciar el pomodoro");
  }

  return result;
}

async function stopChrono() {
  const result = await FetchData("/chrono/pomellodoro/stop", "POST");

  if (result.error || result.status >= 400) {
    throw new Error(result.message || "Error al detener el pomodoro");
  }

  return result;
}


// async function getChronoStats() {
//     const result = await FetchData("/chrono/stats", "GET");
//     if (result.status === 401) {
//       throw new Error("Token inválido o expirado. Por favor, vuelve a iniciar sesión.");
//     }
//     return result;
//   }
export async function getChronoStats() {
  return await FetchData("/chrono/stats");
} 

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