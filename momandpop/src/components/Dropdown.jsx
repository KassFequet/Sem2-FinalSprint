import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

export default function Dropdown({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      /* fetch data and encode url with category tag */
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

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products found in this category.</div>;

  return (
    <div className="productsgrid">
      {products.map((product) => (
        <div key={product.id} className="productcard">
          {/* Clickable area for navigation */}
          <div
            className="productclickarea"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={product.image} alt={product.name} className="productimage" />
            <div className="productname">{product.name}</div>
            <div className="productprice">${product.price.toFixed(2)}</div>
          </div>

          {/* seperate add to cart button so it's unnaffected by the card navigation */}
          <div
            onClick={(e) => e.stopPropagation()} // stops click from reaching parent
          >
            <AddToCartButton
              product={product}
              currentPrice={product.price}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
