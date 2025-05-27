import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Generates a JSON Web Token for the provided user data.
 *
 * @param {Object} userData - The user data to include in the token payload.
 * @returns {string} The generated JWT.
 */

function createToken(userData){
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' });
    return token;
}

/**
 * Verifies the provided JWT.
 *
 * @param {string} token - The JWT to verify.
 * @returns {Object} The payload of the JWT, or an error if verification fails.
 */
function verifyToken(token){
    const result = jwt.verify(token,JWT_SECRET);
    return result;
}

export {
    createToken,
    verifyToken
}