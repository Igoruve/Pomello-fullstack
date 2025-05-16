import { Link } from "react-router-dom";

function Auth() {

  return (
    <section>
      <h2>Log in</h2>
      <section>
        <form action="/login" method="post">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Log in</button>
        </form>
      </section>

      <section>
        <p>Don't have an account?</p>
        <Link to = "/register">
            <button>Register</button>
        </Link>
      </section>

    </section>
  );
}

export default Auth;
