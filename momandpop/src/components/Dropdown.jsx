import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

export default function Dropdown({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/products?category=${encodeURIComponent(category)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Scroll to hash target after products are loaded & rendered
  useEffect(() => {
    if (!location.hash || products.length === 0) return;

    const targetId = location.hash.substring(1); // remove "#"

    // Use setTimeout to wait for DOM render after products update
    const scrollTimeout = setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50); // small delay ensures the DOM is ready

    return () => clearTimeout(scrollTimeout);
  }, [products, location.hash]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products found in this category.</div>;

  return (
    <div className="productsgrid">
      {products.map((product) => (
        <div
          key={product.id}
          id={product.category?.toLowerCase().replace(/\s+/g, '') || `product-${product.id}`}
          className="productcard"
        >
          {/* Clickable area for navigation */}
          <div
            className="productclickarea"
            onClick={() => navigate(`/products/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={product.image} alt={product.name} className="productimage" />
            <div className="productname">{product.name}</div>
            <div className="productprice">${product.price.toFixed(2)}</div>
          </div>

          {/* Separate add-to-cart button so it's unaffected by card navigation */}
          <div onClick={(e) => e.stopPropagation()}>
            <AddToCartButton product={product} currentPrice={product.price} />
          </div>
        </div>
      ))}
    </div>
  );
}
