import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <Container className="py-3">
    Page Not Found
    <br />
    <Link to="/">Back to Home</Link>
  </Container>
);

export default NotFoundPage;
