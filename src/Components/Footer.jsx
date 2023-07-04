import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../logo.png";
export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="6">
            <h5>靴箱 KUTSUBAKO</h5>
            <div className="footerp">
              <p>
                Discover KUTSUBAKO, inspired by Japanese Minimalism. Shop our
                high-quality sneakers at affordable prices, embracing style and
                value for our customers
              </p>
            </div>
          </Col>
          <Col lg="6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: aster255@kutsubako.ph</li>
              <li>Phone: +639123456789</li>
              <li>Address: 175 Old Balara,Quezon City, Philippines</li>
            </ul>
          </Col>
        </Row>
        <Row className="footerlast">
          <p className="text-center">
            &copy; 2023 靴箱 KUTSUBAKO.ph. All rights reserved.
          </p>
        </Row>
      </Container>
    </footer>
  );
};
