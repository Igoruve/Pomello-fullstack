//GESTION LOCAL STORAGE

function saveToLocalStorage(key, value) {
    if(value!== null && value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
        
  } else {
    localStorage.removeItem(key);
  }
}
  
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
  
  function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  //TOKEN
  
  function saveToken(token) {
    if(token){
        saveToLocalStorage("token", token);
    }
  }
  
  function getToken() {
    return getFromLocalStorage("token", null);
    console.log("TOKEN", token);
  }
  
  function removeToken() {
    removeFromLocalStorage("token");
  }

  //USER ??¿???¿?¿?¿?¿?¿
  
  function saveUser(user) {
    saveToLocalStorage("user", user);
  }
  
  function getUser() {
    return getFromLocalStorage("user", null);
  }
  
  function removeUser() {
    removeFromLocalStorage("user");
  }
  
  export { saveToLocalStorage, getFromLocalStorage, saveToken, getToken, removeToken, saveUser, getUser, removeUser };
  