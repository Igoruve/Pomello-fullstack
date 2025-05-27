import { getToken } from "./localStorage";

const BASE_URL = "http://localhost:3013";

/**
 * @module fetchData
 * @description Generic function to fetch data to connect with the backend
 */

/**
 * Fetch data from the backend. If token is present, it will be added to the headers, and the data will be sent as JSON. If the response is not JSON, an error will be thrown.
 * @function
 * @param {string} route - The route to fetch data from.
 * @param {string} method - The HTTP method to use.
 * @param {*} data - The data to send with the request.
 * @returns -- The response data.
 */
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
