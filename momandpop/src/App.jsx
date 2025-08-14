import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact"; 
import Support from "./pages/Support"
import Questions from "./pages/Questions"
import Home from "./pages/Home";
import Receipt from "./pages/Receipt";

import ProductDetails from "./pages/ProductDetails";

// Missing Catalogue and Cart components
function Catalogue() {
  return <div>Catalogue Page</div>;
}

function Cart() {
  return <div>Cart Page</div>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/Cart" element={<Checkout />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
      <Footer />
      
    </>
  );
}

export default App;
