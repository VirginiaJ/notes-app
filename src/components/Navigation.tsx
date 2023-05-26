import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";

const Navigation = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Nav className="me-auto">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/manage" className="nav-link">
          Manage notes
        </Link>
        <Link to="/summary" className="nav-link">
          Notes summary
        </Link>
      </Nav>
    </Container>
  </Navbar>
);

export default Navigation;
