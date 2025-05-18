import { Link } from "react-router-dom";

function Homepage() {

  return (
    <section className="mb-2 bg-amber-200 h-24 rounded-2xl p-4 cursor-pointer hover:bg-amber-300">
      <h2>Pomello Home</h2>
      <section>
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </section>

    </section>
  );
}

export default Homepage;
