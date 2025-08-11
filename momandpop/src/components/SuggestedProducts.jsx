import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SuggestedProducts = ({ currentProductId, currentProductCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        // Filter out the current product and ensure related products are in the same category
        const relatedProducts = data.filter(
          (product) =>
            product.id !== currentProductId &&
            product.category === currentProductCategory
        );

        // Shuffle the related products to randomize the display
        const shuffledProducts = relatedProducts.sort(
          () => 0.5 - Math.random()
        );

        // Select the first 5 related products
        setProducts(shuffledProducts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchProducts();
  }, [currentProductId, currentProductCategory]);

  return (
    <div className="suggested-products">
      <div className="product-list">
        {products.length === 0 ? (
          <p>No related products available.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="product-card"
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h3>{product.name}</h3>
              <Link to={`/products/${product.id}`}>
                <button className="see-details">See Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SuggestedProducts;
