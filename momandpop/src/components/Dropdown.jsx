import { useState, useEffect } from "react";

export default function Dropdown({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/products?category=${encodeURIComponent(category)}`   /* encodedURIComponent essentially encodes the category variable into the URL so it can be associated with the correct category */
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "1.5rem",
        padding: "1rem",
      }}
    >
      {products.map(({ id, image, name, price }) => (
        <div
          key={id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "0.5rem",
            backgroundColor: "#fff",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={image}
            alt={name}
            style={{ width: "150px", height: "auto", marginBottom: "0.5rem" }}
          />
          <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: "0.25rem" }}>
            {name}
          </div>
          <div style={{ color: "#555", textAlign: "center" }}>${price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
