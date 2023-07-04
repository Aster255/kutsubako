import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { Shoecard } from "./Shoecard";

export const Shoepage = (props) => {
  const { id } = useParams();
  const shoes = require("../trial.json");
  const shoe = shoes.filter((shoe) => shoe.ID == id);
  const name = shoe[0].productname;
  const brand = shoe[0].Brand;
  const gender = shoe[0].Gender;
  const imagesrc = shoe[0]["Image-src"];
  const price = shoe[0].price;
  const desc = shoe[0].description;
  const womansize = [3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9];
  const mansize = [4, 4.5, 5, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9, 9.5];
  const [activesize, setActivesize] = useState(0);
  const dbRefCart = collection(db, "cart");
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState("");
  const [spin, setSpin] = useState("");
  const [show, setShow] = useState(false);
  const addtoCart = async () => {
    if (activesize) {
      try {
        setSpin(" ");
        await addDoc(dbRefCart, {
          shoeId: id,
          size: activesize,
          userId: auth?.currentUser?.uid,
        });
        props.getCart();
      } catch (err) {
        console.error(err);
      }
      setSpin("");
    } else {
      setWarning("no size selected");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, [count]);

  const functionCall = (event) => {
    setActivesize(event.target.getAttribute("a-key"));
    setWarning("");
  };
  const shoesize = [
    {
      "UK Size": "3",
      "US Men": "4",
      "US Women": "5",
      "EU Size": "36",
      "CM/JP": "22.5",
    },
    {
      "UK Size": "3.5",
      "US Men": "4.5",
      "US Women": "5.5",
      "EU Size": "36.5",
      "CM/JP": "23",
    },
    {
      "UK Size": "4",
      "US Men": "5",
      "US Women": "6",
      "EU Size": "37",
      "CM/JP": "23.5",
    },
    {
      "UK Size": "4.5",
      "US Men": "5.5",
      "US Women": "6.5",
      "EU Size": "37.5",
      "CM/JP": "24",
    },
    {
      "UK Size": "5",
      "US Men": "6",
      "US Women": "7",
      "EU Size": "38",
      "CM/JP": "24.5",
    },
    {
      "UK Size": "5.5",
      "US Men": "6.5",
      "US Women": "7.5",
      "EU Size": "38.5",
      "CM/JP": "25",
    },
    {
      "UK Size": "6",
      "US Men": "7",
      "US Women": "8",
      "EU Size": "39",
      "CM/JP": "25.5",
    },
    {
      "UK Size": "6.5",
      "US Men": "7.5",
      "US Women": "8.5",
      "EU Size": "40",
      "CM/JP": "26",
    },
    {
      "UK Size": "7",
      "US Men": "8",
      "US Women": "9",
      "EU Size": "41",
      "CM/JP": "26.5",
    },
    {
      "UK Size": "7.5",
      "US Men": "8.5",
      "US Women": "9.5",
      "EU Size": "41.5",
      "CM/JP": "27",
    },
    {
      "UK Size": "8",
      "US Men": "9",
      "US Women": "10",
      "EU Size": "42",
      "CM/JP": "27.5",
    },
    {
      "UK Size": "8.5",
      "US Men": "9.5",
      "US Women": "10.5",
      "EU Size": "42.5",
      "CM/JP": "28",
    },
    {
      "UK Size": "9",
      "US Men": "10",
      "US Women": "11",
      "EU Size": "43",
      "CM/JP": "28.5",
    },
    {
      "UK Size": "9.5",
      "US Men": "10.5",
      "US Women": "11.5",
      "EU Size": "44",
      "CM/JP": "29",
    },
    {
      "UK Size": "10",
      "US Men": "11",
      "US Women": "12",
      "EU Size": "45",
      "CM/JP": "29.5",
    },
    {
      "UK Size": "10.5",
      "US Men": "11.5",
      "US Women": "12.5",
      "EU Size": "45.5",
      "CM/JP": "30",
    },
    {
      "UK Size": "11",
      "US Men": "12",
      "US Women": "13",
      "EU Size": "46",
      "CM/JP": "30.5",
    },
    {
      "UK Size": "11.5",
      "US Men": "12.5",
      "US Women": "13.5",
      "EU Size": "46.5",
      "CM/JP": "31",
    },
    {
      "UK Size": "12",
      "US Men": "13",
      "US Women": "14",
      "EU Size": "47",
      "CM/JP": "31.5",
    },
    {
      "UK Size": "12.5",
      "US Men": "13.5",
      "US Women": "14.5",
      "EU Size": "48",
      "CM/JP": "32",
    },
    {
      "UK Size": "13",
      "US Men": "14",
      "US Women": "-",
      "EU Size": "49",
      "CM/JP": "32.5",
    },
    {
      "UK Size": "14",
      "US Men": "15",
      "US Women": "-",
      "EU Size": "50",
      "CM/JP": "33.5",
    },
    {
      "UK Size": "15",
      "US Men": "16",
      "US Women": "-",
      "EU Size": "51",
      "CM/JP": "34.5",
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col lg="4">
            <div>
              <h1>{name}</h1>
              <h3>
                {gender == "Male" ? "Men's Footwear" : "Women's Footwear"}
              </h3>
              {brand}
            </div>
            <h5>
              <Button
                variant="light"
                className="zeroradius"
                onClick={handleShow}
              >
                size chart
              </Button>
            </h5>
            {gender == "Female"
              ? womansize.map((size) => (
                  <Button
                    className="zeroradius"
                    a-key={size}
                    active={size == activesize}
                    onClick={functionCall}
                    variant="light"
                  >
                    {size.toFixed(1)} UK
                  </Button>
                ))
              : mansize.map((size) => (
                  <Button
                    className="zeroradius"
                    a-key={size}
                    active={size == activesize}
                    onClick={functionCall}
                    variant="light"
                  >
                    {size.toFixed(1)} UK
                  </Button>
                ))}
            {auth.currentUser && (
              <div className="d-grid">
                {spin ? (
                  <Button variant="warning" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </Button>
                ) : (
                  <Button
                    onClick={addtoCart}
                    className="mt-2"
                    variant="warning"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-cart-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    Add to Cart {price}
                  </Button>
                )}
              </div>
            )}
            {warning && (
              <Alert className="mt-1" variant="danger">
                {warning}
              </Alert>
            )}
          </Col>
          <Col lg="4">
            <Card className="p-2">
              <Card.Img src={imagesrc} alt={name} />
            </Card>
          </Col>
          <Col lg="4" className="shoedesc">
            {desc}
          </Col>
        </Row>
        <Shoecard
          heading="Similar items to this:"
          gender={gender}
          brand={brand}
        />
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Size Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Find your correct size in the chart below.</p>
          <Table striped bordered hover>
            <thead>
              <th>UK</th>
              <th>US - Men's</th>
              <th>US - Women's</th>
              <th>EU</th>
              <th>CM/JP</th>
            </thead>
            <tbody>
              {shoesize.map((x) => (
                <tr>
                  <td>{x["UK Size"]}</td>
                  <td>{x["US Men"]}</td>
                  <td>{x["US Women"]}</td>
                  <td>{x["EU Size"]}</td>
                  <td>{x["CM/JP"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
