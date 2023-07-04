import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Store } from "./Components/Store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavComponent } from "./Components/NavComponent";
import { Account } from "./Components/Account";
import { Footer } from "./Components/Footer";
import { LandingPage } from "./Components/LandingPage";
import { Shoepage } from "./Components/Shoepage";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import { useEffect, useState } from "react";
import { Cart } from "./Components/Cart";
import { Alert } from "react-bootstrap";
import { Addresscrud } from "./Components/Addresscrud";
import { Shipment } from "./Components/Shipment";
import { About } from "./Components/About";
import { Sizes } from "./Components/Sizes";

const App = () => {
  const dbRefCart = collection(db, "cart");
  const dbRefAddress = collection(db, "address");
  const dbRefShipment = collection(db, "shipment");
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [shipment, setShipment] = useState([]);
  const [count, setCount] = useState(0);
  const [cartlert, setCartlert] = useState("");
  const [user, setUser] = useState("");
  // const [cartattempt, setcA]

  const getCart = async () => {
    try {
      const data = await getDocs(dbRefCart);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((doc) => doc.userId == auth?.currentUser?.uid);
      setCart(filteredData);
    } catch (err) {
      if (auth.currentUser) {
        setCartlert("cannot access firebase server");
      }
      console.error(err);
    }
  };

  const getAddress = async () => {
    try {
      const data = await getDocs(dbRefAddress);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((doc) => doc.userId == auth?.currentUser?.uid);
      setAddress(filteredData);
    } catch (err) {
      if (auth.currentUser) {
        setCartlert("cannot access firebase server");
      }
      console.error(err);
    }
  };

  const getShipment = async () => {
    try {
      const data = await getDocs(dbRefShipment);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((doc) => doc.userId == auth?.currentUser?.uid)
        .sort((a, b) => b.date.toDate() - a.date.toDate());
      setShipment(filteredData);
    } catch (err) {
      if (auth.currentUser) {
        setCartlert("cannot access firebase server");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, [count]);

  useEffect(() => {
    getCart();
    getAddress();
    getShipment();
  }, [user]);

  return (
    <div className="App">
      {cartlert && <Alert variant="primary">{cartlert}</Alert>}
      <NavComponent cartcount={cart.length} key={cart} setUser={setUser} />
      {/* <Login /> */}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/kutsubako" element={<LandingPage />} />
        <Route exact path="/store" element={<Store />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/size" element={<Sizes />} />
        <Route path="/register" element={<Account setUser={setUser} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              getCart={getCart}
              address={address}
              getShipment={getShipment}
            />
          }
        />
        <Route
          exact
          path="/shoe/:id"
          element={<Shoepage getCart={getCart} />}
        />
        <Route
          path="/shippingdetails"
          element={<Addresscrud address={address} getAddress={getAddress} />}
        />
        <Route path="/shipment" element={<Shipment shipment={shipment} />} />
      </Routes>
      <Footer />
      <div class="zooter"></div>
    </div>
  );
};

export default App;
