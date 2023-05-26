import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

const Home = () => (
  <Container className="py-3">
    <Card>
      <Card.Body>
        <Card.Title>Notes manager</Card.Title>
        <Card.Subtitle className="my-3 text-muted">
          All your notes in one place
        </Card.Subtitle>
        <Card.Text>
          From now on manage your notes with ease. Create and delete notes under{" "}
          <Link to="/manage">Manage notes</Link> section. You can delete
          multiple notes at once by selecting multiple rows while holding "ctrl"
          or "cmd" button.
          <br />
          Track the statistics of your notes in{" "}
          <Link to="/summary">Notes summary</Link> section. There you will find
          how many notes were created per category.
        </Card.Text>
      </Card.Body>
    </Card>
  </Container>
);

export default Home;
