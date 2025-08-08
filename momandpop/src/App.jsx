// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import './App.css';

// Missing Catalogue and Cart components
function Catalogue() {
  return <div>Catalogue Page</div>;
}

function Cart() {
  return <div>Cart Page</div>;
}

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/catalogue"
          element={<Catalogue />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
      </Routes>
    </>
  );
}

export default App;
