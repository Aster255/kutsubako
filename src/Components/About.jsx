import { Col, Container, Image, Row } from "react-bootstrap";
import { Shoecard } from "./Shoecard";
import about1 from "./about.jpg";
export const About = () => {
  return (
    <>
      <Container>
        <Row>
          <h2>ABOUT KUTSUBAKO</h2>
          <Col lg={4}>
            <Image src={about1} fluid />
          </Col>
          <Col className="aboutp">
            <p>
              Welcome to Kutsubako, your premier destination for
              Japanese-inspired footwear. With a name that translates to "shoe
              rack" in Japanese, we are dedicated to offering a carefully
              curated selection of sneakers that embody the essence of
              minimalist design and exceptional craftsmanship. Each pair of
              shoes in our collection is thoughtfully chosen to reflect the
              timeless elegance and understated beauty of Japanese minimalism.
            </p>
            <p>
              At Kutsubako, we believe that finding the perfect pair of sneakers
              should be a seamless and enjoyable experience. We strive to
              provide our customers with a user-friendly online platform where
              they can explore our handpicked selection of high-quality
              footwear. From classic styles to contemporary designs, our aim is
              to offer sneakers that not only elevate your style but also
              provide utmost comfort and durability. Step into the world of
              Kutsubako and discover the perfect blend of minimalist aesthetics,
              exquisite craftsmanship, and unparalleled quality in every step
              you take.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Shoecard
          heading="Japanese Inspired Sneakers"
          gender="Male"
          brand="ONITSUKA TIGER"
        />
      </Container>
    </>
  );
};
