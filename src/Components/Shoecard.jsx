import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Shoecard = (props) => {
  const shoes = require("../trial.json");
  const [shoelist, setShoelist] = useState(shoes);
  ///randomizes shoes
  useEffect(() => {
    if (props.brand) {
      let x = [...shoes]
        .filter((shoe) => shoe.Brand == props.brand)
        .filter((shoe) => shoe.Gender == props.gender)
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setShoelist(x);
    } else {
      let x = [...shoes]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setShoelist(x);
    }
  }, []);
  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
  return (
    <>
      <Row className="mt-4">
        <h3>{props.heading}</h3>
      </Row>
      <Row className="mb-2">
        {shoelist.slice(0, 6).map((shoe) => (
          <Col md="2">
            <Card className="mb-3 shoecard1">
              <Card.Img
                className="shoeimgcard"
                src={shoe["Image-src"]}
                alt={shoe["ID"]}
                variant="top"
              />
              <Card.Body>
                <Link className="link" to={"/shoe/" + shoe["ID"]}>
                  <div className="d-grid">
                    <Button
                      variant="primary"
                      // variant={shoe.Gender == "Male" ? "primary" : "danger"}
                      className="textCenter "
                      onClick={topFunction}
                    >
                      {shoe.price}
                    </Button>
                  </div>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
