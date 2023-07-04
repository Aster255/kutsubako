import { Container, Image, Table } from "react-bootstrap";
import { auth } from "../config/firebase";

export const Shipment = (props) => {
  {
    /* {shipment[0]["contactnumber"]} */
  }
  {
    /* {console.log(shipment[0]["date"])}
      {console.log(shipment[0]["date"].toDate())} */
  }

  return (
    <>
      {console.log(props.shipment)}
      <Container>
        <h2>
          {auth?.currentUser?.displayName
            ? auth.currentUser.displayName
            : auth?.currentUser?.email}
          {/s+$/.test(auth?.currentUser?.displayName) ? "' " : "'s "}Order
          History
        </h2>
        <div className="d-none d-sm-block">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Product Details</th>
                <th>Tracking ID and Order Date</th>
                <th>Shipping Details</th>
                <th>Payment Method</th>
                <th>Shipping Status</th>
              </tr>
            </thead>
            <tbody>
              {props.shipment.map((x) => (
                <tr>
                  <td>
                    <Image className="cartimg" src={x.shoeimage} />
                  </td>
                  <td>
                    <div>
                      {x.shoename}-{x.shoebrand}
                    </div>
                    <div>
                      {x.shoegender == "Male"
                        ? "Men's Sneakers"
                        : "Ladies'Sneakers"}
                      -{x.size}UK
                    </div>
                    <div>
                      <b>{x.shoeprice}</b>
                    </div>
                  </td>
                  <td>
                    <div>{x.id}</div>
                    <div>{x.date.toDate().toString()}</div>
                    <div></div>
                  </td>
                  <td>
                    <div>{x.deliveryaddress}</div>
                    <div>{x.contactperson}</div>
                    <div>{x.contactnumber}</div>
                  </td>
                  <td>{x.payment ? x.payment : "Cash on Delivery"}</td>
                  <td>{x.status ? x.status : "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-block d-sm-none">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Shipment Details</th>
              </tr>
            </thead>
            <tbody>
              {props.shipment.map((x) => (
                <tr>
                  <td>
                    <Image className="cartimgmobile" src={x.shoeimage} />
                    <div>{x.shoename}</div>
                    <div>{x.size} UK</div>
                    <div>
                      <b>{x.shoeprice}</b>
                    </div>
                  </td>
                  <td>
                    <div>{x.id}</div>
                    <div>{x.date.toDate().toString()}</div>
                    <div></div>
                    <div>{x.deliveryaddress}</div>
                    <div>{x.contactperson}</div>
                    <div>{x.contactnumber}</div>
                    <div>
                      <b>
                        Payment: {x.payment ? x.payment : "Cash on Delivery"}
                      </b>
                    </div>
                    <div>
                      <b>Delivery Status: {x.status ? x.status : "Pending"} </b>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
