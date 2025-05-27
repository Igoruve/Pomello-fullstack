import bcrypt from "bcrypt";


/**
 * Hashes a given password using bcrypt with a salt of 10.
 * @param {string} password The password to hash.
 * @returns {Promise<string>} The hashed password.
 */
async function hash(password){
    const result = await bcrypt.hash(password,10);
    return result;
}
/**
 * Compares a given password with its hash.
 * @param {string} password The password to compare.
 * @param {string} hash The hash to compare with.
 * @returns {Promise<boolean>} If the password matches the hash.
 */
async function compare(password,hash){
    const result = await bcrypt.compare(password,hash)
    return result;
}

export {
    hash,
    compare
}