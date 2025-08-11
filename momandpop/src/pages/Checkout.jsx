import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // Load cart on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Update cart in state + localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const updateQuantity = (id, qty) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    updateCart(updatedCart);
  };

  // Totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.15;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  const handleBuyNow = () => {
    if (!name || !phone) {
      alert("Please fill out your name and phone number.");
      return;
    }
    alert("Order placed! Thank you.");
    handleClearCart();
    // Not made yet \/
    navigate("/order-confirmation");
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Galada" rel="stylesheet" />
      <div className="checkout-box">
        <button id="back-button" onClick={() => navigate(-1)}>← Go Back</button>
        <div className="check-holder">
          {/* LEFT: CART ITEMS */}
          <div className="checkout-left">
            <div className="my-cart">My Cart: <p>{cart.length} Items</p></div>
            <button className="clear-cart" onClick={handleClearCart}>Clear Cart</button>

            <div className="checkout-items">
              {cart.length === 0 ? (
                <p>The cart is empty</p>
              ) : (
                cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} width="60" />
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: ORDER INFO */}
          <div className="checkout-right">
            <div className="order-info">
              <div className="order-hero">Order Info</div>
              <div className="order-details">
                <p>Name <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></p>
                <p>Phone <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /></p>
              </div>
            </div>

            <div className="checkout-total">
              <h2>Order Summary</h2>
              <hr />
              <div className="receipt">
                <p>Order Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Taxes: ${taxes.toFixed(2)}</p>
              </div>
              <hr />
              <p><strong>Order Total: ${total.toFixed(2)}</strong></p>
              <div className="checkout-buttons">
                <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                <button
                  className="e-transfer"
                  onClick={() => alert("Please send e-transfer to MomsGarden&PopsWorkshop.com")}
                >
                  E-transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
