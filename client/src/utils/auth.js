import FetchData from "./fetch.js";
import { saveToken, saveUser } from "../utils/localStorage.js";



/**
 * Logs in an existing user using the provided email and password.
 * 
 * @param {String} email - The user's email address.
 * @param {String} password - The user's password.
 * 
 * @returns {Promise<Object>} A promise that resolves with an object containing an error message if there was an issue with the login
 * or an object with the user data and a token if the login was successful.
 */
async function login(email, password) {
    if (!email) return { error: "Not valid email" };
    if (!password) return { error: "Please introduce the password" };

    const data = { email, password };
    const result = await FetchData("/login", "POST", data);

    if (!result.error) {
        saveToken(result.token);
        saveUser(result.user);
    }

    return result;
}



/**
 * Registers a new user using the provided email and password.
 * 
 * @param {String} email - The user's email address.
 * @param {String} password - The user's password.
 * 
 * @returns {Promise<Object>} A promise that resolves with an object containing an error message if there was an issue with the registration
 * or an object with the user data if the registration was successful.
 */
async function register(email, password) {
    // Control de errores
    if (!email || !email.includes("@")) {
        return { error: "Not valid email" };
    }
    if (!password) {
        return { error: "Please introduce the password" };
    }

    const data = {
        email,
        password,
    }
    
    const result = await FetchData("/register", "POST", data);
    
    if (result.error) {
        console.error("Register error", result);
    } else {
        console.log("You have been registered", { usuario: result.user?.username || "desconocido" });
    }
    
    return result;
}


/**
 * Logs out the current user by sending a POST request to the logout endpoint.
 * 
 * @returns {Promise<Object>} A promise that resolves with the server's response object
 * indicating the result of the logout operation.
 */

async function logout () {
    const result = await FetchData("/logout", "POST");
    return result;
}

export {
    login,
    register,
    logout
}