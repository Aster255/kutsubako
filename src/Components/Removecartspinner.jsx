import {
  Alert,
  Button,
  Container,
  Form,
  Image,
  Modal,
  Spinner,
  Table,
  Toast,
} from "react-bootstrap";
import { auth, db } from "../config/firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Cartspin = (props) => {
  const [spin, setSpin] = useState("");
  const [spin2, setSpin2] = useState("");

  const [show, setShow] = useState(false);
  const [credval, setCredval] = useState("");
  const [paymentmethod, setPaymentmethod] = useState("");
  const [errmy, setErrmy] = useState("");

  const shoes = require("../trial.json").find(
    (z) => z["ID"] == props["item"]["shoeId"]
  );
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log(props.address);
    console.log(shoes);
  };

  const removeShoe = async (event) => {
    const cartDoc = doc(db, "cart", event.target.value);
    setSpin(" ");
    try {
      await deleteDoc(cartDoc);
      props.getCart();
    } catch (err) {
      console.log(err);
    }
    setSpin("");
  };
  const dbRefShipment = collection(db, "shipment");

  const onSubmitShipment = async () => {
    setSpin2(" ");
    let creds = props.address.find((x) => x.id == credval);
    console.log(creds);
    if (credval && paymentmethod) {
      let newDate = new Date();
      // console.log(newDate);
      // console.log(props["item"]["shoeId"]);
      try {
        await addDoc(dbRefShipment, {
          shoeid: shoes["ID"],
          shoebrand: shoes["Brand"],
          shoegender: shoes["Gender"],
          shoename: shoes["productname"],
          shoeimage: shoes["Image-src"],
          shoeprice: shoes["price"],
          size: props["item"]["size"],
          status: "Pending",
          payment: paymentmethod,
          date: newDate,
          contactperson: creds.contactperson,
          contactnumber: creds.contactnumber,
          deliveryaddress: creds.deliveryaddress,
          userId: auth?.currentUser?.uid,
        });
        const cartDoc = doc(db, "cart", props.item.id);
        try {
          await deleteDoc(cartDoc);
          props.getCart();
        } catch (err) {
          console.log(err);
        }
        props.getShipment();
      } catch (err) {
        console.error(err);
        setErrmy("error creating an invoice");
      }
      setSpin("");
      handleClose();
    } else {
      setErrmy("please select a shipment address/payment method");
    }
    setSpin2("");
  };

  return (
    <>
      <td>
        <div className="d-grid">
          {spin ? (
            <>
              <div className="d-grid">
                <Button variant="primary" disabled>
                  <Spinner as="span" animation="border" size="sm" />
                  <span className="visually-hidden">Loading...</span>
                </Button>
              </div>{" "}
              <div className="d-grid mt-3">
                <Button variant="primary" disabled>
                  <Spinner as="span" animation="border" size="sm" />
                  <span className="visually-hidden">Loading...</span>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="d-grid">
                <Button
                  variant="warning"
                  value={props.item.id}
                  onClick={() => {
                    setSpin(" ");
                    handleShow();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cash-stack"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                  </svg>{" "}
                  Proceed to Checkout
                </Button>
              </div>
              <div className="d-grid mt-3">
                <Button
                  value={props.item.id}
                  onClick={removeShoe}
                  variant="danger"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cart-dash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>{" "}
                  Remove from Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </td>
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Product</h3>
            <Table>
              <tr>
                <td>
                  <Image src={shoes["Image-src"]} className="cartimg" />
                </td>
                <td>
                  <div>{shoes["productname"]}</div>
                  <div>Shoe size: {props["item"]["size"]} UK</div>
                </td>
              </tr>
            </Table>
            {props.address.length ? (
              <>
                <h3>Select a Shipping Address:</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Delivery Address</th>
                      <th>Contact Person</th>
                      <th>Contact Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.address.map((x) => (
                      <tr>
                        <td>
                          <Form.Check
                            type="radio"
                            name="x"
                            value={x["id"]}
                            onChange={(e) => {
                              setErrmy("");
                              setCredval(e.target.value);
                            }}
                          />
                        </td>
                        <td>{x["deliveryaddress"]}</td>
                        <td>{x["contactperson"]}</td>
                        <td>{x["contactnumber"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <h3>Select a Payment Method:</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <td></td>
                      <th>Payment Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Check
                          type="radio"
                          name="y"
                          value={"Cash on Delivery"}
                          onChange={(e) => {
                            setErrmy("");
                            setPaymentmethod(e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-cash-coin"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                          />
                          <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                          <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                          <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                        </svg>{" "}
                        Cash on Delivery
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check
                          type="radio"
                          name="y"
                          value={"Credit Card"}
                          onChange={(e) => {
                            setErrmy("");
                            setPaymentmethod(e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-credit-card"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                          <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                        </svg>{" "}
                        Credit Card
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <Form.Check
                          type="radio"
                          name="y"
                          value={"Gcash"}
                          onChange={(e) => {
                            setErrmy("");
                            setPaymentmethod(e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16px"
                          height="16px"
                          viewBox="0 0 192 192"
                          fill="none"
                        >
                          <path
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="12"
                            d="M84 96h36c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36c9.941 0 18.941 4.03 25.456 10.544"
                          />
                          <path
                            fill="#000000"
                            d="M145.315 66.564a6 6 0 0 0-10.815 5.2l10.815-5.2ZM134.5 120.235a6 6 0 0 0 10.815 5.201l-10.815-5.201Zm-16.26-68.552a6 6 0 1 0 7.344-9.49l-7.344 9.49Zm7.344 98.124a6 6 0 0 0-7.344-9.49l7.344 9.49ZM84 152c-30.928 0-56-25.072-56-56H16c0 37.555 30.445 68 68 68v-12ZM28 96c0-30.928 25.072-56 56-56V28c-37.555 0-68 30.445-68 68h12Zm106.5-24.235C138.023 79.09 140 87.306 140 96h12c0-10.532-2.399-20.522-6.685-29.436l-10.815 5.2ZM140 96c0 8.694-1.977 16.909-5.5 24.235l10.815 5.201C149.601 116.522 152 106.532 152 96h-12ZM84 40c12.903 0 24.772 4.357 34.24 11.683l7.344-9.49A67.733 67.733 0 0 0 84 28v12Zm34.24 100.317C108.772 147.643 96.903 152 84 152v12a67.733 67.733 0 0 0 41.584-14.193l-7.344-9.49Z"
                          />
                          <path
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="12"
                            d="M161.549 58.776C166.965 70.04 170 82.666 170 96c0 13.334-3.035 25.96-8.451 37.223"
                          />
                        </svg>{" "}
                        GCash
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <Form.Check
                          type="radio"
                          name="y"
                          value={"Paypal"}
                          onChange={(e) => {
                            setErrmy("");
                            setPaymentmethod(e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-paypal"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.695.695 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.217.124.4.27.548.438.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.873.873 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.352.352 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214Z" />
                        </svg>{" "}
                        Paypal
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <h3>Price: {shoes.price}</h3>
              </>
            ) : (
              <>
                <Alert variant="danger">
                  Set up your acccount and add <b>shipping details</b> to
                  continue checkout
                </Alert>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {errmy && (
              <Alert variant="danger" size="sm">
                {errmy}
              </Alert>
            )}
            {spin2 ? (
              <div className="d-grid">
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSpin("");
                    handleClose();
                  }}
                >
                  Close
                </Button>
                {props.address.length ? (
                  <Button variant="warning" onClick={onSubmitShipment}>
                    Pay via {paymentmethod}
                  </Button>
                ) : (
                  <>
                    <Link to="/shippingdetails">
                      <Button variant="primary">Add Shipping Details</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};
