import { verifyToken } from "../utils/token.js";

/**
 * Verificar si el usuario est  autenticado en la API (usar en rutas protegidas).
 *
 * Verifica si el encabezado "Authorization" est  presente en el request y si el
 * token es v lido. Si todo sale bien, asocia el id del usuario al req.user y llama
 * al next(). Si hay un error, devuelve un 401 con un mensaje de error.
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
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

