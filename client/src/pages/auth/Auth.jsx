import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

function Auth({ isRegister }) {
	const [error, setError] = useState(null);
	const { onLogin, onRegister } = useContext(AuthContext);
	const [userData, setUserData] = useState({
		email: "",
		password: ""
	})

	const handleUserPassword = (e) => {
		const newPassword = e.target.value;
		const newState = { ...userData, password: newPassword }
		setUserData(newState);
	}
	const handleUserEmail = (e) => {
		const newEmail = e.target.value;
		const newState = { ...userData, email: newEmail }
		setUserData(newState);
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		const action = isRegister ? onRegister : onLogin;
		//sacamos los datos del formulario:
		const result = await action(userData.email, userData.password);
		setError(result);
	}

	return (
		<section className="bg-amber-200">
			<h2>{isRegister ? "Register" : "Log in"}</h2>
			<section>

				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" value={userData.email} onChange={handleUserEmail} required />
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="password" value={userData.password} onChange={handleUserPassword} required />
					<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
						{isRegister ? "Create account" : "Log in"}
					</button>
				</form>
			</section>

			{error && <p>{error}</p>}

			{isRegister ? (
				<>
					<p>Already have an account?</p>
					<Link to="/login">
						<button className="underline text-blue-600">Go to login</button>
					</Link>
				</>
			) : (
				<>
					<p>Don't have an account?</p>
					<Link to="/register">
						<button className="underline text-blue-600">Register</button>
					</Link>
				</>
			)}
        </section >
    );
}

export default Auth;
