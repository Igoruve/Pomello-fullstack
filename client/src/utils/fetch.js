import { getToken, removeToken, removeUser } from "./localStorage";

const BASE_URL = "http://localhost:3013";

async function FetchData(route, method = "GET", data = null) {
  const url = BASE_URL + route;
  const token = getToken();

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");

    let responseData;
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      console.error("Expected JSON but got:", text);
      throw new Error("Response is not JSON");
    }

    // Por si el token expira o es inválido, lo eliminamos:
    if (response.status === 401 && (responseData.error === "Invalid token" || responseData.error === "You shall not pass")) {
      console.warn("Expired or invalid token. Logging out.");
      removeToken();
      removeUser();
    }

    if (!response.ok) {
      responseData.status = response.status;
    }

    return responseData;
  } catch (error) {
    console.error("Fetch error", error);
    return { error: true, message: error.message };
  }
}

export default FetchData;
