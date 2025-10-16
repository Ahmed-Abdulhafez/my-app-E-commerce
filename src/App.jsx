import React from "react";
import NavBar from "./Components/NavBar";
import { Route, Routes, useLocation } from "react-router";
import Home from "./Components/home/Home";
import Footer from "./Components/Footer";
import ContactUs from "./Components/Contact-us/ContactUs";
import Men from "./Components/products/Men";
import Women from "./Components/products/Women";
import Kids from "./Components/products/Kids";
import ProductsPage from "./Components/products/ProductsPage";
import ShoppingCart from "./Components/shopping/ShoppingCart";
import SignUp from "./Components/Regeaster/SignUp";
import Dashboard from "./Components/admine/Dashboard";
import AllProducts from "./Components/admine/pages/AllProducts";
import AddProduct from "./Components/admine/pages/AddProduct";
import EditDeleteProduct from "./Components/admine/pages/EditDeleteProduct";
import EditProduct from "./Components/admine/pages/EditProduct";

const App = () => {
  const location = useLocation();
  const hideHeader = /^\/Dashboard(\/|$)/.test(location.pathname);
  return (
    <div>
      {!hideHeader && <NavBar />}
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/mens" element={<Men />} />
        <Route path="/womens" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/Contact" element={<ContactUs />} />
        {/* <Route path="/SignUp" element={<SignUp/>} /> */}

        <Route path="/Dashboard/*" element={<Dashboard />}>
          <Route path="All-Products" element={<AllProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-delete" element={<EditDeleteProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>

        <Route path="/ProductsPage/:id" element={<ProductsPage />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />

        <Route path="*" />
      </Routes>
      {!hideHeader && <Footer />}
    </div>
  );
};

export default App;
