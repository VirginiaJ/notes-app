import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/manage">Manage notes</Link>
      </li>
      <li>
        <Link to="/summary">Notes summary</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
