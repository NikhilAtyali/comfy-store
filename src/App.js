import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  AboutPage,
  AuthWrapper,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  PrivateRoute,
  ProductPage,
  SingleProductPage,
} from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route exact path="/products" element={<ProductPage />} />
        <Route exact path="/products/:id" element={<SingleProductPage />} />
        <Route exact path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
