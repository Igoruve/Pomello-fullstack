import { getToken } from "./localStorage";

const BASE_URL = "http://localhost:3013";

async function FetchData(route, method = "GET", data = null) {
  const url = BASE_URL + route;
  const token = getToken();
  const options = {
    method,
    headers: {},
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      responseData.status = response.status;
    }
    return responseData;
  } catch (error) {
    console.error("Fetch error", error);
    return { error: "FetchData error" };
  }
}

export default FetchData;
