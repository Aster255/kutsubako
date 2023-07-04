import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { auth, db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Cartspin } from "./Removecartspinner";
import { Link } from "react-router-dom";

export const Cart = (props) => {
  const shoes = require("../trial.json");
  const [cartx, setCartx] = useState(1);
  const [was, setWas] = useState("test");
  const [spin, setSpin] = useState("");

  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
            <h2>
              {auth?.currentUser?.displayName
                ? auth.currentUser.displayName
                : auth?.currentUser?.email}
              {/s+$/.test(auth?.currentUser?.displayName) ? "' " : "'s "}Cart
            </h2>
            <div className="d-none d-sm-block">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {/* <th>shoe id</th> */}
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.cart.map((item) => {
                    let x = shoes.find((z) => z.ID == item.shoeId);
                    return (
                      <tr>
                        <td>
                          <Link className="link" to={"/shoe/" + item["shoeId"]}>
                            <Image className="cartimg" src={x["Image-src"]} />
                          </Link>
                        </td>
                        <td>
                          <Link className="link" to={"/shoe/" + item["shoeId"]}>
                            <div>{x["productname"]}</div>
                            <div>
                              {x["Brand"]}-{x["ID"]}
                            </div>
                            <div>
                              {x["Gender"] == "Male"
                                ? "Men's Sneakers"
                                : "Ladies' Sneakers"}
                            </div>
                            <div>
                              <b>Sneaker Size:{item.size}UK </b>
                            </div>
                          </Link>
                        </td>

                        <td>{x.price}</td>
                        {/* {newFunction(spin, item, removeShoe)} */}
                        <Cartspin
                          getCart={props.getCart}
                          item={item}
                          address={props.address}
                          getShipment={props.getShipment}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="d-block d-sm-none">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {/* <th>shoe id</th> */}
                    <th></th>
                    <th>Name and Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.cart.map((item) => {
                    let x = shoes.find((z) => z.ID == item.shoeId);
                    return (
                      <tr>
                        <td>
                          <Link className="link" to={"/shoe/" + item["shoeId"]}>
                            <Image className="cartimg" src={x["Image-src"]} />
                          </Link>
                        </td>
                        <td>
                          <Link className="link" to={"/shoe/" + item["shoeId"]}>
                            <div>{x["productname"]}</div>
                            <div>
                              {x["Brand"]}-{x["ID"]}
                            </div>
                            <div>
                              {x["Gender"] == "Male"
                                ? "Men's Sneakers"
                                : "Ladies' Sneakers"}
                            </div>
                            <div>
                              <b>Sneaker Size:{item.size}UK </b>
                            </div>
                            <div>
                              <b>{x.price}</b>
                            </div>
                          </Link>
                        </td>

                        {/* {newFunction(spin, item, removeShoe)} */}
                        <Cartspin
                          getCart={props.getCart}
                          item={item}
                          address={props.address}
                          getShipment={props.getShipment}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
