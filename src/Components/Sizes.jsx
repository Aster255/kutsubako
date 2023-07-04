import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

export const Sizes = () => {
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

  return (
    <>
      <Container>
        <Row>
          <h2>Sneakers Size Chart</h2>
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
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};
