import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { saveToken, removeToken, saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";
import { login, register, logout } from "../utils/auth";

const BASE_URL = "http://localhost:3013";

const AuthContext = createContext({
    userData: null,
    onLogin: async () => { },
    onLogout: () => { },
    onRegister: async () => { }
});


/**
 * AuthProvider component that provides authentication context to its children components.
 * It manages user data and authentication actions such as login, logout, and register.
 * 
 * - Loads user data from local storage on initialization if available.
 * - Provides `handleRegister`, `handleLogin`, and `handleLogout` functions to manage user authentication.
 * - Uses `AuthContext` to share authentication state and actions with descendant components.
 * - Redirects users to different routes based on authentication actions.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components that require access to the authentication context.
 */

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    //cargar los datos del usuario al inicio si existe
    useEffect(() => {
        const savedUserData = getFromLocalStorage("userData");
        if (savedUserData) {
            setUserData(savedUserData);
        }
    }, []);



    /**
     * Registers a new user using the provided email and password.
     * 
     * @param {String} email - The user's email address.
     * @param {String} password - The user's password.
     * 
     * @returns {Promise<String>} A promise that resolves with an error message if there was an issue with the registration
     * or null if the registration was successful.
     */
    const handleRegister = async (email, password) => {
        try {
            const result = await register(email, password);
            if (result.error) {
                return result.error;
            } else {
                if (result.token) { //si existe token, lo guarda
                    saveToken(result.token);
                }
                if (result.user) { //y si existe user guarda sus datos
                    setUserData(result.user);
                    saveToLocalStorage("userData", result.user);
                }

                navigate(`/login`);
                return null;
            }
        } catch (error) {
            console.error("Register error: ", error);
            return "Error processing the register.";
        }
    };


    /**
     * Logs in an existing user using the provided email and password.
     * 
     * @param {String} email - The user's email address.
     * @param {String} password - The user's password.
     * 
     * @returns {Promise<String>} A promise that resolves with an error message if there was an issue with the login
     * or null if the login was successful.
     */
    const handleLogin = async (email, password) => {
        try {
            const result = await login(email, password);
            if ("error" in result && result.error) {
                removeToken();
                return result.error;
            } else {
            if (result.token) { //si existe token, lo guarda
                saveToken(result.token);
            }
            let finalUserData = result.user;
            setUserData(finalUserData);
            saveToLocalStorage("userData", finalUserData);
            navigate(`/project/user/`);
            return null;
        }
    }
        catch (error) {
        console.error("Error logging in: ", error);
        return "Error processing the login.";
    }
}


    /**
     * Logs out the current user.
     * 
     * - Calls the logout endpoint on the server to invalidate the user's session.
     * - Removes the user's session token from local storage.
     * - Removes the user's data from local storage.
     * - Sets the user data to null in the state.
     * - Navigates to the root route.
     * 
     * @returns {Promise<void>} A promise that resolves when the logout is complete.
     */
const handleLogout = async () => {
    try {
        await logout();
    } catch (error) {
        console.error("Error loggint out: ", error);
    } finally {
        //siempre limpia los datos locales independientemente de la respuesta del servidor
        removeToken();
        localStorage.removeItem("userData");
        setUserData(null);
        navigate("/");
    }
}

return (
    <AuthContext.Provider value={{
        userData: userData,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister
    }}>
        {children}
    </AuthContext.Provider >
)
}

export {
    AuthContext,
    AuthProvider
}