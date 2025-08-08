import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import './App.css';
import Home from './pages/Home';

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
      <Navigation />  {/* ✅ Renders the nav bar at the top */}
      <Home />
    </>
  );
}

export default App;
