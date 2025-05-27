import { getToken } from "./localStorage";

const BASE_URL = "http://localhost:3013";

/**
 * Performs a fetch request to the given route.
 *
 * If the user is logged in, it will include the Authorization token in the request headers.
 *
 * If the data argument is provided, it will be sent as JSON in the request body.
 *
 * Returns the response data as a JSON object. If the response is not JSON,
 * it will throw an error. If the response status is not 200, it will include
 * the status code in the returned object.
 *
 * If any error occurs (network, server, parsing), it will return an object
 * with an "error" property set to true and a "message" property with the
 * error message.
 *
 * @param {string} route The route to fetch, relative to the BASE_URL.
 * @param {string} [method="GET"] The HTTP method to use.
 * @param {object} [data=null] The data to send in the request body.
 * @returns {Promise<Object>}
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
