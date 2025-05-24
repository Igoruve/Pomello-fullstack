import { verifyToken } from "../utils/token.js";

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