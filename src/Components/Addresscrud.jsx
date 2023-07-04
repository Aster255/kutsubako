import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {
  Alert,
  Button,
  Container,
  Form,
  Spinner,
  Table,
} from "react-bootstrap";
import { useState } from "react";
import { Addressrow } from "./Addressrow";

export const Addresscrud = (props) => {
  const [contactadress, setContactaddress] = useState("");
  const [contactperson, setContactperson] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [spin, setSpin] = useState("");
  const [errmy, setErrmy] = useState("");
  const dbRefAddress = collection(db, "address");

  const onSubmitAddress = async () => {
    setSpin(" ");
    if (contactadress && contactperson && contactnumber) {
      try {
        await addDoc(dbRefAddress, {
          deliveryaddress: contactadress,
          contactperson: contactperson,
          contactnumber: contactnumber,
          userId: auth?.currentUser?.uid,
        });
        props.getAddress();
      } catch (err) {
        console.error(err);
      }
    } else {
      setErrmy("cannot use blank fields");
    }
    setSpin("");
  };
  return (
    <>
      {/* <h1>{props.address.length}</h1>
      <h1>{contactadress}</h1>
      <h1>{contactperson}</h1>
      <h1>{contactnumber}</h1> */}
      <Container>
        <Form>
          <h2>
            {auth?.currentUser?.displayName
              ? auth.currentUser.displayName
              : auth?.currentUser?.email}
            {/s+$/.test(auth?.currentUser?.displayName) ? "' " : "'s "}Shipping
            Details
          </h2>
          <Table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Contact Person</th>
                <th>Contact Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.address.map((cred) => (
                <tr>
                  <td>{cred.deliveryaddress}</td>
                  <td>{cred.contactperson}</td>
                  <td>{cred.contactnumber}</td>
                  <td>
                    <Addressrow cred={cred} getAddress={props.getAddress} />
                  </td>
                </tr>
              ))}
              {props.address.length < 5 && (
                <>
                  <tr>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        onChange={(e) => {
                          setContactaddress(e.target.value);
                          setErrmy("");
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Contact Person"
                        onChange={(e) => {
                          setContactperson(e.target.value);
                          setErrmy("");
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Contact Number"
                        onChange={(e) => {
                          setContactnumber(e.target.value);
                          setErrmy("");
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="d-grid">
                        {spin ? (
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
                        ) : (
                          <Button onClick={onSubmitAddress}>
                            Save Address
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
          {errmy && <Alert variant="danger">{errmy}</Alert>}
        </Form>
      </Container>
    </>
  );
};
