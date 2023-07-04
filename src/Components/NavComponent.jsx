import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Badge, Button, Form, Image, Offcanvas } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";

import logo from "./logo.png";

export const NavComponent = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, [count]);

  const logout = async () => {
    try {
      await signOut(auth);
      setCount(count + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container>
            <Navbar.Brand>
              <Link className="link" to="/">
                <Image src={logo} height="80px" />
              </Link>
            </Navbar.Brand>
            {auth?.currentUser ? (
              <div className="d-block d-sm-none">
                <Nav.Link>
                  <Link className="link" to="/cart">
                    <Badge>{props.cartcount}</Badge>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </Link>
                </Nav.Link>
              </div>
            ) : (
              <></>
            )}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Image src={logo} height="80px" />
                  靴箱
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 ps-3">
                  <Nav.Link>
                    <Link className="link" to="/">
                      KUTSUBAKO
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="link" to="/store">
                      STORE
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="link" to="/about">
                      ABOUT
                    </Link>
                  </Nav.Link>
                  {/* <Nav.Link>
                    <Link className="link" to="/size">
                      SIZE CHART
                    </Link>
                  </Nav.Link> */}
                </Nav>
                <Nav className="ps-3">
                  <>
                    {auth.currentUser ? (
                      <>
                        <Nav.Link>
                          <div className="d-none d-sm-block">
                            <Link className="link" to="/cart">
                              <Badge>{props.cartcount}</Badge>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-cart"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                              </svg>
                            </Link>
                          </div>
                        </Nav.Link>
                        <NavDropdown
                          title={
                            auth?.currentUser?.displayName
                              ? auth.currentUser.displayName
                              : auth.currentUser.email
                          }
                          id="collasible-nav-dropdown"
                        >
                          <NavDropdown.Item>
                            <Nav.Link>
                              <Link className="link" to="/shippingdetails">
                                SHIPPING DETAILS
                              </Link>
                            </Nav.Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Nav.Link>
                              <Link className="link" to="/shipment">
                                ORDERS
                              </Link>
                            </Nav.Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Nav.Link>
                              <Link
                                className="link"
                                to="/"
                                onClick={() => {
                                  logout();
                                  props.setUser("");
                                }}
                              >
                                LOG OUT
                              </Link>
                            </Nav.Link>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    ) : (
                      <Nav.Link>
                        <Link className="link" to="/register">
                          LOGIN/REGISTER
                        </Link>
                      </Nav.Link>
                    )}
                  </>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>

    // <div>
    //   {" "}
    //   <Container>
    //     <Navbar>
    //       <Navbar.Brand>
    //         <Image src={logo} height="80px" />
    //       </Navbar.Brand>

    //       <Navbar.Collapse id="responsive-navbar-nav">
    // <Nav className="me-auto">
    // <Nav.Link>
    //   <Link className="link" to="/">
    //     KUTSUBAKO
    //   </Link>
    // </Nav.Link>
    // <Nav.Link>
    //   <Link className="link" to="/store">
    //     STORE
    //   </Link>
    // </Nav.Link>
    // <Nav.Link>
    //   <Link className="link" to="/about">
    //     ABOUT
    //   </Link>
    // </Nav.Link>
    // <Nav.Link>
    //   <Link className="link" to="/size">
    //     SIZE CHART
    //   </Link>
    // </Nav.Link>
    // </Nav>

    // <Nav>
    //   <>
    //     {auth.currentUser ? (
    //       <>
    //         <Nav.Link>
    //           <Link className="link" to="/cart">
    //             <Badge>{props.cartcount}</Badge>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="24"
    //               height="24"
    //               fill="currentColor"
    //               class="bi bi-cart"
    //               viewBox="0 0 16 16"
    //             >
    //               <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    //             </svg>
    //           </Link>
    //         </Nav.Link>
    //         <NavDropdown
    //           title={
    //             auth?.currentUser?.displayName
    //               ? auth.currentUser.displayName
    //               : auth.currentUser.email
    //           }
    //           id="collasible-nav-dropdown"
    //         >
    //           <NavDropdown.Item>
    //             <Nav.Link>
    //               <Link className="link" to="/shippingdetails">
    //                 Shipping Details
    //               </Link>
    //             </Nav.Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Nav.Link>
    //               <Link className="link" to="/shipment">
    //                 ORDERS
    //               </Link>
    //             </Nav.Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Nav.Link
    //               onClick={() => {
    //                 logout();
    //                 props.setUser("");
    //               }}
    //             >
    //               LOG OUT
    //             </Nav.Link>
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </>
    //     ) : (
    //       <Nav.Link>
    //         <Link className="link" to="/register">
    //           Login/Register
    //         </Link>
    //       </Nav.Link>
    //     )}
    //   </>
    // </Nav>
    //       </Navbar.Collapse>
    //     </Navbar>
    //   </Container>
    // </div>
  );
};

{
  /* <NavDropdown title="男 MEN " id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="men/addidas">
                      ADDIDAS
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="men/asics">
                      ASICS
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="men/newbalance">
                      NEW BALANCE
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="men/nike">
                      NIKE
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="men/onitsukatiger">
                      ONITSUKA TIGER
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="女 WOMEN " id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="women/addidas">
                      ADDIDAS
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="women/asics">
                      ASICS
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="women/newbalance">
                      NEW BALANCE
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="women/nike">
                      NIKE
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="women/onitsukatiger">
                      ONITSUKA TIGER
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="全 ALL " id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="ze/addidas">
                      ADDIDAS
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="ze/asics">
                      ASICS
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="ze/newbalance">
                      NEW BALANCE
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="ze/nike">
                      NIKE
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link className="link" to="women/onitsukatiger">
                      ONITSUKA TIGER
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown> */
}
{
  /* <Nav.Link>
                <Link className="link" to="/about">
                  Features
                </Link>
              </Nav.Link>
              <Nav.Link>Features</Nav.Link>
              <Nav.Link>Pricing</Nav.Link> */
}
