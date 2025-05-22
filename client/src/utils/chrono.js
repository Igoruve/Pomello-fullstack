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

async function getChronoStats() {
    const result = await FetchData("/chrono/stats", "GET");
    if (result.status === 401) {
      throw new Error("Token inválido o expirado. Por favor, vuelve a iniciar sesión.");
    }
    return result;
  }
  

async function getStatus() {
  const result = await FetchData("/chrono/pomellodoro/status", "GET");

  if (result.error || result.status >= 400) {
    throw new Error(result.message || "Error al obtener el estado del pomodoro");
  }

  return result;
}

export { startChrono, stopChrono, getChronoStats, getStatus };
