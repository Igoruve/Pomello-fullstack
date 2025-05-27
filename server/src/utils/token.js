import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Creates a new JSON Web Token (JWT) given the userData object.
 * The token will expire in 24 hours and is signed with the JWT_SECRET
 * environment variable.
 * @param {Object} userData - The user data to sign. Must contain the user's
 * id and email.
 * @returns {string} The newly created JWT.
 */
function createToken(userData){
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' });
    return token;
}

/**
 * Verifies the given token against the JWT_SECRET environment variable.
 * If the token is invalid or tampered with, this will throw an error.
 * @param {string} token - The JSON Web Token (JWT) to verify.
 * @returns {Object} The decoded user data if the token is valid.
 * @throws {Error} If the token is invalid or tampered with.
 */
function verifyToken(token){
    const result = jwt.verify(token,JWT_SECRET);
    return result;
}

export {
    createToken,
    verifyToken
}