import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Catalogue from "./pages/Catalogue";

// Missing Catalogue and Cart components
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
        <Route path="/Catalogue" element={<Catalogue />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
