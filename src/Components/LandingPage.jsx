import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Shoecard } from "./Shoecard";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import ReactPlayer from "react-player";

export const LandingPage = () => {
  return (
    <Container className="landing">
      <Row>
        {/* <Col lg="4">
          <img className="img-fluid" src={require("./hero.jpg")} />
        </Col> */}
        <div className="hero-video-container">
          <div className="hero-video">
            <ReactPlayer
              // url={`${process.env.PUBLIC_URL}/assets/videos/video-3.mp4`}
              url="https://res.cloudinary.com/dqgsn9024/video/upload/v1688368089/vid1_mwikxk.mp4"
              playing
              playbackRate={1.5}
              muted
              loop
              controls={false}
              width={"100%"}
              height={"500px"}
            />
          </div>

          <div className="hero-text">
            <h1>Experience Serendipity</h1>
            <h2>Where Minimalism and Tradition Meets Style</h2>
            <Link
              className="link"
              to={auth.currentUser ? "/store" : "/register"}
            >
              <button className="shop-now-btn">Step into Zenplicity</button>
            </Link>
          </div>
        </div>
      </Row>
      {/* <Row className="mt-3">
        <Col lg="4">
          <Card className="p-2">
            <Card.Img variant="top" src={require("./Left.jpg")} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="p-2">
            <Card.Img variant="top" src={require("./center.jpg")} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="p-2">
            <Card.Img variant="top" src={require("./right.jpg")} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
      <Shoecard heading="Hot Picks" />
      <Shoecard heading="Featured Sneakers" />
    </Container>
  );
};
