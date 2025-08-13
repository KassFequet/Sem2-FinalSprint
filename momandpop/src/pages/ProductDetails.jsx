import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LengthButton from '../components/LengthButton';
import AddToCartButton from '../components/AddToCartButton';
import '../ProductDetails.css';
import SuggestedProducts from '../components/SuggestedProducts';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Generate consistent random number based on productId for item number
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

  // Function to truncate description
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <>
      <div>
        <a
          className="back-link"
          href="/catalogue"
        >
          ← Back to Catalogue
        </a>
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

          <div className="description-section">
            <p className="description">
              {product.name.toLowerCase().includes('timber') &&
              product.description.length > 100
                ? showFullDescription
                  ? product.description
                  : truncateDescription(product.description)
                : product.description}
            </p>
            {product.name.toLowerCase().includes('timber') &&
              product.description.length > 100 && (
                <button
                  className="toggle-description"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Show Less' : 'More Details'}
                </button>
              )}
          </div>

          {product.name.toLowerCase().includes('timber') && (
            <LengthButton
              basePrice={product.price}
              onPriceChange={setCurrentPrice}
            />
          )}

          <AddToCartButton
            product={product}
            currentPrice={currentPrice}
            quantity={1}
          />
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

      <div className="product-suggestions-section">
        <h2>People Who Bought this Item also Bought</h2>
        <SuggestedProducts
          currentProductId={product.id}
          currentProductCategory={product.category}
        />
      </div>
    </>
  );
}
