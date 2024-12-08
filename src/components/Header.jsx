import { Link } from "react-router-dom";
import classes from "./css/Header.module.css";

function MainNavigation() {
  return (
    <div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
