import React from "react";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router";
import Home from "./Components/home/Home";
import Footer from "./Components/Footer";
import ContactUs from "./Components/Contact-us/ContactUs";
import Men from "./Components/products/Men";
import Women from "./Components/products/Women";
import Kids from "./Components/products/Kids";
import ProductsPage from "./Components/products/ProductsPage";
import ShoppingCart from "./Components/shopping/ShoppingCart";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/mens" element={<Men />} />
        <Route path="/womens" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/Contact" element={<ContactUs/>} />

        <Route path="/ProductsPage/:id" element={<ProductsPage />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />

        <Route path="*" />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
