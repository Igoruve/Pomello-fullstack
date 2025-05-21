import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

function Auth({ isRegister }) {
  const [error, setError] = useState(null);
  const { onLogin, onRegister } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleUserPassword = (e) => {
    const newPassword = e.target.value;
    const newState = { ...userData, password: newPassword };
    setUserData(newState);
  };
  const handleUserEmail = (e) => {
    const newEmail = e.target.value;
    const newState = { ...userData, email: newEmail };
    setUserData(newState);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isRegister ? onRegister : onLogin;
    //sacamos los datos del formulario:
    const result = await action(userData.email, userData.password);
    setError(result);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-700">
      <h2 className="text-4xl font-bold text-white mb-12">
        {isRegister ? "Register" : "Log in"}
      </h2>
      <section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-800 p-4 rounded-lg border border-gray-500/50 shadow-lg"
        >
          <label className="text-white" htmlFor="email">Email:</label>
          <input
		  className="bg-gray-800 border border-white/50 rounded-sm text-white"
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleUserEmail}
            required
          />
          <label className="text-white" htmlFor="password">Password:</label>
          <input
		  className="bg-gray-800 border border-white/50 rounded-sm text-white"
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleUserPassword}
            required
          />
          <button
            type="submit"
            className="bg-[#f56b79] text-white px-4 py-2 rounded cursor-pointer"
          >
            {isRegister ? "Create account" : "Log in"}
          </button>
        </form>
      </section>

      {error && <p>{error}</p>}

      {isRegister ? (
        <>
          <p className="mt-4 text-white">Already have an account?</p>
          <Link to="/login">
            <button className="underline text-blue-600 cursor-pointer">
              Go to login
            </button>
          </Link>
        </>
      ) : (
        <>
          <p className="mt-4 text-white">Don't have an account?</p>
          <Link to="/register">
            <button className="underline text-blue-600 cursor-pointer">
              Register
            </button>
          </Link>
        </>
      )}
    </section>
  );
}

export default Auth;
