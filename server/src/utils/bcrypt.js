import bcrypt from "bcrypt";


/**
 * Given a password, it will hash it with 10 rounds of salt.
 * @param {string} password The password to hash
 * @returns {Promise<string>} The hashed password
 */
async function hash(password){
    const result = await bcrypt.hash(password,10);
    return result;
}
/**
 * Compare a given password with a given hash, using the same salt value.
 * @param {string} password The password to compare
 * @param {string} hash The hash to compare with
 * @returns {Promise<boolean>} true if the hash matches the password, false otherwise
 */
async function compare(password,hash){
    const result = await bcrypt.compare(password,hash)
    return result;
}

export {
    hash,
    compare
}