import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import HomeNavbar from "../../components/navbar/HomeNavbar";

/**
 * Component to render the register or login page.
 *
 * This component renders a form to register or login to the app,
 * depending on the value of the `isRegister` prop.
 *
 * @param {boolean} isRegister - `true` if the component should render a
 * registration form, `false` otherwise
 *
 * @returns {JSX.Element} The rendered register or login page
 */
function Auth({ isRegister }) {
  const [error, setError] = useState(null);
  const { onLogin, onRegister } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

/**
 * Updates the user's password in the userData state.
 *
 * @param {Event} e - The event triggered by the user's input in the password field.
 */

  const handleUserPassword = (e) => {
    const newPassword = e.target.value;
    const newState = { ...userData, password: newPassword };
    setUserData(newState);
  };
  /**
   * Updates the user's email in the userData state.
   *
   * @param {Event} e - The event triggered by the user's input in the email field.
   */
  const handleUserEmail = (e) => {
    const newEmail = e.target.value;
    const newState = { ...userData, email: newEmail };
    setUserData(newState);
  };
  /**
   * Handles the submission of the login or register form.
   *
   * Calls the `onLogin` or `onRegister` function from the `AuthContext` based on the value of `isRegister`.
   * The function is called with the current `email` and `password` values from the `userData` state.
   * If the function returns an error, it is saved in the `error` state.
   * @param {Event} e - The event triggered by the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isRegister ? onRegister : onLogin;
    //sacamos los datos del formulario:
    const result = await action(userData.email, userData.password);
    setError(result);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <HomeNavbar />
      <h2 className="text-4xl font-bold text-white pt-38 pb-8">
        {isRegister ? "Register" : "Log in"}
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {!isRegister && (
        <p className="text-white">
          Email: demo@gmail.com <br />
          Password: Demo123*
        </p>
      )}
      <section className="flex flex-col items-center justify-center w-full max-w-md mx-auto h-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-900 p-4 rounded-lg border border-gray-500/50 shadow-lg h-fit justify-around w-84 items-center"
        >
          <div className="flex flex-col gap-4 ">
            {!isRegister ? (
              ""
            ) : (
              <div className="flex flex-col gap-2">
                <label className="text-white" htmlFor="email">
                  Username:
                </label>
                <input
                  className="bg-gray-800 border border-white/50 rounded-sm text-white px-2 py-2"
                  type="text"
                  id="text"
                  name="text"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-white" htmlFor="email">
                Email:
              </label>
              <input
                className="bg-gray-800 border border-white/50 rounded-sm text-white px-2 py-2"
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleUserEmail}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white" htmlFor="password">
                Password:
              </label>
              <input
                className="bg-gray-800 border border-white/50 rounded-sm text-white px-2 py-2"
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleUserPassword}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-fit self-center font-bold px-6 py-2 rounded-lg bg-gradient-to-r from-[#f56b79] via-[#f78a6b] to-[#fcab51] mt-10 hover:opacity-90 shadow-lg text-white cursor-pointer"
            >
              {isRegister ? "Register" : "Log in"}
            </button>
          </div>
        </form>
        {isRegister ? (
          <>
            <p className="mt-4 text-white">Already have an account?</p>
            <Link to="/login">
              <button className="underline text-[#f56b79] cursor-pointer">
                Go to Log In
              </button>
            </Link>
          </>
        ) : (
          <>
            <p className="mt-4 text-white">Don't have an account?</p>
            <Link to="/register">
              <button className="underline text-[#f56b79] cursor-pointer">
                Register
              </button>
            </Link>
          </>
        )}
      </section>
    </section>
  );
}

export default Auth;
