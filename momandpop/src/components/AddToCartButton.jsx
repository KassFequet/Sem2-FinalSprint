import React, { useState, useEffect } from 'react';
import AddToCart from '../images/addtocart.png';
import AddedToCart from '../images/addedtocart.png';

const AddToCartButton = ({ product }) => {
  const [added, setAdded] = useState(false);

  // Check if the product is already in the cart when the component loads
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find((item) => item.id === product.id);
    setAdded(!!existingItem);
  }, [product.id]);

  const handleToggleCart = async () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (!added) {
      // Add to cart
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price, // fixed from currentPrice
        quantityInStock: 1,
        image: product.image,
      };

      try {
        const response = await fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartItem),
        });

        if (response.ok) {
          localStorage.setItem('cart', JSON.stringify([...cartItems, cartItem])); // keep localStorage updated
          setAdded(true);
        } else {
          console.error('Failed to add to cart');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      // Remove from cart
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setAdded(false);
    }
  };

  return (
    <button
      className={`add-to-cart ${added ? 'added' : ''}`}
      onClick={handleToggleCart}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      <img
        src={added ? AddedToCart : AddToCart}
        alt={added ? 'Added to Cart' : 'Add to Cart'}
        style={{ width: '24px', height: '18px', marginRight: '-2px' }}
      />
      {added ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
