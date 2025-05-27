
/**
 * Saves a given value to localStorage.
 * If the value is null or undefined, it removes the item from localStorage instead.
 * @param {string} key The key to store the value under.
 * @param {*} value The value to store.
 */
function saveToLocalStorage(key, value) {
    if(value!== null && value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
        
  } else {
    localStorage.removeItem(key);
  }
}
  
  /**
   * Retrieves a value from localStorage.
   * If the value doesn't exist, returns the defaultValue instead.
   * If the value exists but is not a valid JSON, removes it from localStorage
   * and returns the defaultValue.
   * @param {string} key The key to retrieve the value from.
   * @param {*} [defaultValue=null] The value to return if the key doesn't exist.
   * @returns {*} The value stored in localStorage, or the defaultValue.
   */
  function getFromLocalStorage(key, defaultValue = null) {
    const result = localStorage.getItem(key);
    if (result) {
        try{
            return JSON.parse(result); //intentamos parsear el resultado
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            localStorage.removeItem(key); // eliminamos el item si no se puede parsear  
            return defaultValue;
        }
    } else {
      return defaultValue;
    }
  }
  
  /**
   * Removes a given key from localStorage.
   * @param {string} key The key to remove from localStorage.
   */
  function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  
  /**
   * Saves a given token to localStorage.
   * If the token is null or undefined, it removes the token from localStorage instead.
   * @param {string} token The token to store in localStorage.
   */
  function saveToken(token) {
    if(token){
        saveToLocalStorage("token", token);
    }
  }
  
  /**
   * Retrieves the token from localStorage.
   * If the token doesn't exist, returns null instead.
   * @returns {string|null} The token stored in localStorage, or null.
   */
  function getToken() {
    return getFromLocalStorage("token", null);
  }
  
  /**
   * Removes the token from localStorage.
   */
  function removeToken() {
    removeFromLocalStorage("token");
  }


  /**
   * Saves a given user object to localStorage.
   * If the user is null or undefined, it removes the user from localStorage instead.
   * @param {Object} user The user object to store in localStorage.
   */
  function saveUser(user) {
    saveToLocalStorage("user", user);
  }
  
  /**
   * Retrieves the user object from localStorage.
   * If the user object doesn't exist, returns null instead.
   * @returns {Object|null} The user object stored in localStorage, or null.
   */
  function getUser() {
    return getFromLocalStorage("user", null);
  }
  
/**
 * Removes the user object from localStorage.
 */

  function removeUser() {
    removeFromLocalStorage("user");
  }
  
  export { saveToLocalStorage, getFromLocalStorage, saveToken, getToken, removeToken, saveUser, getUser, removeUser };
  