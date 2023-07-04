import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

export const Store = () => {
  const [sortBy, setSortBy] = useState("");
  const [filterByBrand, setFilterByBrand] = useState("");
  const [filterByGender, setFilterByGender] = useState("");
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermDesc, setSearchTermDesc] = useState("");
  const [count, setCount] = useState(0);
  const [pagination, setPagination] = useState(1);
  const shoes = require("../trial.json");
  const [shoes_unfiltered, setShoes_unfiltered] = useState(shoes);

  const [shoelist, setShoelist] = useState(shoes);
  ///randomizes shoes
  useEffect(() => {
    let x = [...shoes_unfiltered]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setShoes_unfiltered(x);
    setShoelist(x);
  }, []);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setPagination(1);
  };

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
      let x = [...shoes_unfiltered];
      if (filterByBrand) {
        x = x.filter((a) => a.Brand == filterByBrand);
      }
      if (filterByGender) {
        x = x.filter((a) => a.Gender == filterByGender);
      }
      if (searchTermName) {
        x = x.filter((a) =>
          a.productname.toLowerCase().includes(searchTermName.toLowerCase())
        );
      }
      if (searchTermDesc) {
        x = x.filter((a) =>
          a.description.toLowerCase().includes(searchTermDesc.toLowerCase())
        );
      }

      if (sortBy == "priceAsc") {
        x = x.sort(
          (a, b) =>
            Number(a.price.replace(/[^0-9]/g, "")) -
            Number(b.price.replace(/[^0-9]/g, ""))
        );
      } else if (sortBy == "priceDesc") {
        x = x.sort(
          (a, b) =>
            Number(b.price.replace(/[^0-9]/g, "")) -
            Number(a.price.replace(/[^0-9]/g, ""))
        );
      }
      setShoelist(x);
    }, 1000);
  }, [count]);

  const handleFilterByBrandChange = (event) => {
    setFilterByBrand(event.target.value);
    setPagination(1);
  };
  const handleFilterByGenderChange = (event) => {
    setFilterByGender(event.target.value);
    setPagination(1);
  };

  const searchName = (event) => {
    setSearchTermName(event.target.value);
    setPagination(1);
  };
  const searchDesc = (event) => {
    setSearchTermDesc(event.target.value);
    setPagination(1);
  };

  const functionCall = (event) => {
    setPagination(event.target.getAttribute("a-key"));
    topFunction();
  };

  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <Container>
      <Col lg="12">
        <h3>KUTSUBAKO STORE</h3>
        <h5>
          Product Count: {shoelist.length} - Page: {pagination}
        </h5>
        <div className="d-none d-sm-block">
          <Pagination>
            {(() => {
              let td = [];
              for (let i = 1; i <= shoelist.length / 47 + 1; i++) {
                td.push(
                  <Pagination.Item
                    key={i}
                    a-key={i}
                    onClick={functionCall}
                    active={i == pagination}
                  >
                    {i}
                  </Pagination.Item>
                );
              }
              return td;
            })()}
          </Pagination>
        </div>
        <div className="d-block d-sm-none">
          <Pagination>
            {(() => {
              let td = [];
              for (let i = 1; i <= 10 && i <= shoelist.length / 47 + 1; i++) {
                td.push(
                  <Pagination.Item
                    key={i}
                    a-key={i}
                    onClick={functionCall}
                    active={i == pagination}
                  >
                    {i}
                  </Pagination.Item>
                );
              }
              return td;
            })()}
          </Pagination>
        </div>
      </Col>

      <Row>
        <Col md="3">
          <Card className="p-3 mb-4 filtercard">
            <h3>FILTERS</h3>
            {/* <h4>
              {searchTermName}
              {filterByGender}
            </h4> */}
            <Form>
              <Form.Label htmlFor="storesort">
                <h4>Sort by:</h4>
              </Form.Label>
              <Form.Select id="storesort" onChange={handleSortByChange}>
                <option value="">None</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </Form.Select>
              <Form.Label htmlFor="brandfilter">
                <h4>Filter by Brand:</h4>
              </Form.Label>
              <Form.Select
                id="brandfilter"
                onChange={handleFilterByBrandChange}
              >
                <option value="">All Brands</option>
                <option value="ADDIDAS">ADDIDAS</option>
                <option value="ASICS">ASICS</option>
                <option value="NIKE">NIKE</option>
                <option value="ONITSUKA TIGER">ONITSUKA TIGER</option>
              </Form.Select>
              <Form.Label htmlFor="genderfilter">
                <h4>Filter by Gender:</h4>
              </Form.Label>
              <Form.Select
                id="genderfilter"
                onChange={handleFilterByGenderChange}
              >
                <option value="">Unisex</option>
                <option value="Male">Men</option>
                <option value="Female">Women</option>
              </Form.Select>
            </Form>
            <Form.Group>
              <Form.Label>
                <h4>Search by Name:</h4>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. VAPORFLY"
                onChange={searchName}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h4>Search by Description:</h4>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Futuristic"
                onChange={searchDesc}
              />
            </Form.Group>
          </Card>
        </Col>
        {shoelist.slice((pagination - 1) * 47, pagination * 47).map((shoe) => (
          <Col md="3">
            <Card className="cardshop mb-3">
              <Card.Img
                className="shoeimgcard"
                src={shoe["Image-src"]}
                alt={shoe["ID"]}
              />
              <Card.Body>
                <Card.Title className="shopcardtitle">
                  {shoe.productname}
                </Card.Title>
                <Card.Text variant="top">
                  <div>
                    <span className="me-auto relative">{shoe.price}</span>
                    <span> {shoe.Brand}</span>
                  </div>
                  <div>
                    <span>
                      {shoe.Gender == "Male"
                        ? "Men's Sneakers"
                        : "Ladies' Sneakers"}
                    </span>
                  </div>
                </Card.Text>
                <Link className="link" to={"/shoe/" + shoe["ID"]}>
                  <div className="d-grid">
                    <Button
                      variant="primary"
                      // variant={shoe.Gender == "Male" ? "primary" : "danger"}
                      className="textCenter "
                      onClick={topFunction}
                    >
                      View Details
                    </Button>
                  </div>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col lg="12">
          <div className="d-none d-sm-block">
            <Pagination>
              {(() => {
                let td = [];
                for (let i = 1; i <= shoelist.length / 47 + 1; i++) {
                  td.push(
                    <Pagination.Item
                      key={i}
                      a-key={i}
                      onClick={functionCall}
                      active={i == pagination}
                    >
                      {i}
                    </Pagination.Item>
                  );
                }
                return td;
              })()}
            </Pagination>
          </div>
          <div className="d-block d-sm-none">
            <Pagination>
              {(() => {
                let td = [];
                for (let i = 1; i <= 10 && i <= shoelist.length / 47 + 1; i++) {
                  td.push(
                    <Pagination.Item
                      key={i}
                      a-key={i}
                      onClick={functionCall}
                      active={i == pagination}
                    >
                      {i}
                    </Pagination.Item>
                  );
                }
                return td;
              })()}
            </Pagination>
          </div>
          <Button onClick={topFunction}>Scroll to TOP</Button>
        </Col>
      </Row>
    </Container>
  );
};
