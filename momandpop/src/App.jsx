import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
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
      </Routes>
      
    </>
  );
}

export default App;
