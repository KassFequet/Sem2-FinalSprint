import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Hello from './components/Hello';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import './App.css';

// ✅ Navigation bar
function Navigation() {
  return (
    <nav style={{ marginBottom: '1rem' }}>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </nav>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navigation /> {/* ✅ Renders the nav bar at the top */}
      <Routes>
        <Route
          path="/"
          element={<Hello name="Brendan" />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/products/:productId"
          element={<ProductDetails />}
        />
      </Routes>
    </>
  );
}

export default App;
