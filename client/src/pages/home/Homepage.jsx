import { Link } from "react-router-dom";

function Homepage() {

  return (
    <section>
      <h2>Pomello Home</h2>
      <section>
        <Link to = "/login">
            <button>Login</button>
        </Link>
        
        <Link to = "/register">
            <button>Register</button>
        </Link>
      </section>

    </section>
  );
}

export default Homepage;
