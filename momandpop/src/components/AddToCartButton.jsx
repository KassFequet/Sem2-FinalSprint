import React, { useState, useEffect } from 'react';
import AddToCart from '../images/addtocart.png';
import AddedToCart from '../images/addedtocart.png';

const AddToCartButton = ({ product, currentPrice }) => {
  const [added, setAdded] = useState(false);

  // Check if the product is already in the cart when the component loads
  useEffect(() => {
    const checkCartStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart');
        const cartItems = await response.json();
        const existingItem = cartItems.find(
          (item) => item.productId == product.id
        );
        setAdded(!!existingItem);
      } catch (error) {
        console.error('Error checking cart status:', error);
      }
    };

    checkCartStatus();
  }, [product.id]);

  const handleToggleCart = async () => {
    if (!added) {
      // Add to cart
      const cartItem = {
        id: product.id,
        name: product.name,
        price: currentPrice,
        quantity: 1,
        image: product.image,
      };

      try {
        const response = await fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartItem),
        });

        if (response.ok) {
          setAdded(true);
        } else {
          console.error('Failed to add to cart');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      // Remove from cart
      try {
        const response = await fetch('http://localhost:3000/cart');
        const cartItems = await response.json();
        const itemToRemove = cartItems.find((item) => item.id == product.id);

        if (itemToRemove) {
          const deleteResponse = await fetch(
            `http://localhost:3000/cart/${itemToRemove.id}`,
            {
              method: 'DELETE',
            }
          );

          if (deleteResponse.ok) {
            setAdded(false);
          } else {
            console.error('Failed to remove from cart');
          }
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
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
      {added ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
