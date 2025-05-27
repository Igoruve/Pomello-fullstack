import { verifyToken } from "../utils/token.js";

/**
 * Middleware to check if a user is logged in by verifying the JWT token.
 *
 * Extracts the token from the 'Authorization' header, verifies its validity,
 * and assigns the user's ID to the request object if the token is valid.
 * If the token is missing or invalid, responds with a 401 status and an error message.
 *
 * @param {Object} req - Express request object. Must include 'Authorization' header.
 * @param {Object} res - Express response object. Used to send error responses.
 * @param {Function} next - Express next middleware function. Called if the token is valid.
 */

function isLoggedInAPI(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "You shall not pass" });
  }

  const token = authorization.split(" ")[1]; // Extraer el token del encabezado Authorization
  try {
    const decoded = verifyToken(token); // Verificar el token
    req.user = { id: decoded._id }; // Asegurarse de asignar el userId al req.user
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
}

export {isLoggedInAPI}  
export default isLoggedInAPI; 

