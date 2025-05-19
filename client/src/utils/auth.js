import FetchData from "./fetch.js";
import { saveToken, saveUser } from "../utils/localStorage.js";

// LOGIN

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


// REGISTRO
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

// LOGOUT
async function logout () {
    const result = await FetchData("/logout", "POST");
    return result;
}

export {
    login,
    register,
    logout
}