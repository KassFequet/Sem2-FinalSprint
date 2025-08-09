import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LengthButton from '../components/LengthButton';
import '../ProductDetails.css';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);

  // Generate consistent random number based on productId
  const generateItemNumber = (id) => {
    const seed = parseInt(id) * 12345;
    return 10000 + (seed % 90000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/products/${productId}`
        );

        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data = await response.json();
        setProduct(data);
        setCurrentPrice(data.price);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <>
      <div className="back-link">
        <a href="/catalogue">← Go Back</a>
      </div>
      <div className="product-details">
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="item-id">
            Item # {generateItemNumber(productId)}
            <span className="rating">★★★★★</span>
          </p>
          <p className="price">
            ${currentPrice.toFixed(2)}
            <span className="tax">Tax</span>
          </p>
          <p className="description">{product.description}</p>

          {product.name.toLowerCase().includes('timber') && (
            <LengthButton
              basePrice={product.price}
              onPriceChange={setCurrentPrice}
            />
          )}

          <button className="add-to-cart">Add to Cart</button>
          <p
            className={`stock ${
              product.quantity > 0 ? 'in-stock' : 'out-of-stock'
            }`}
          >
            {product.quantity > 0
              ? `In Stock: ${product.quantity}`
              : 'Out of Stock'}
          </p>
        </div>
      </div>
    </>
  );
}
