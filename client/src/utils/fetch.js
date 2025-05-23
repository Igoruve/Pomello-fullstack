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
    const contentType = response.headers.get("content-type");
  
    let responseData;
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      const text = await response.text(); // para debug
      console.error("Expected JSON but got:", text);
      throw new Error("Response is not JSON");
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
