import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wedding from "../components/WeddingBanner";
import SuggestedProducts from '../components/SuggestedProducts.jsx';
import "../Styles/Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // Generate a unique item number
  const generateItemNumber = (id) => {
    const seed = parseInt(id) * 12345;
    return 10000 + (seed % 90000);
  };

  // Show alert
  const showAlert = (message) => {
    const alertBar = document.getElementById("alert-bar");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = message;
    alertBar.style.opacity = 1;

    setTimeout(() => {
      alertBar.style.opacity = 0;
    }, 2000);
  };

  // Format phone number as (###)###-####
  const formatPhoneNumber = (phone) => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)})${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return phone;
  };

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const initializedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCart(initializedCart);
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

  // Handle Buy Now
  const handleBuyNow = () => {
    if (!name || !phone) {
      showAlert("Please fill out your name and phone number.");
      return;
    }

    // Validate 10-digit phone
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      showAlert("Phone number must be 10 digits.");
      return;
    }

    if (cart.length === 0) {
      showAlert("Your cart is empty!");
      return;
    }

    const orderData = {
      date: new Date().toLocaleString(),
      name,
      phone: formatPhoneNumber(phone),
      items: cart.map(item => ({
        ...item,
        quantity: item.quantity || 1,
        itemNumber: generateItemNumber(item.id)
      })),
    };

    handleClearCart();
    navigate("/Receipt", { state: orderData });
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Galada" rel="stylesheet" />
      <div className="checkout-box">
        <div 
          className="alert-bar" 
          style={{ opacity: 0 }} 
          id="alert-bar"
        >
          <p id="alert-message"></p>
        </div>
        <a className="back-link" href="/catalogue">← Back to Catalogue</a>
        <div className="check-holder">
          {/* LEFT: CART ITEMS */}
          <div className="checkout-left">
            <div className="my-cart">My Cart: <p>{cart.length} Items</p></div>
            <button className="clear-cart" onClick={handleClearCart}>Clear Cart</button>
            <div className="items-holder">
              <div className="checkout-items">
                {cart.length === 0 ? (
                  <p>The cart is empty</p>
                ) : (
                  cart.map(item => (
                    <div className="cart-item" key={item.id}>
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <div className="item-info-box">
                          <div className="item-info">
                            <h3>{item.name}</h3>
                            <p className="item-num">Item # {generateItemNumber(item.id)}</p>
                          </div>
                          <div className="item-quantityInStock">
                            <label htmlFor={`quantity-${item.id}`}>
                              <span className="quantity">Qty</span>
                            </label>
                            <select
                              id={`quantity-${item.id}`}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            >
                              {Array.from({ length: Math.min(item.quantityInStock, 99) }, (_, i) => i + 1).map(qty => (
                                <option key={qty} value={qty}>{qty}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="items-right">
                          <div className="item-price">
                            <p>${item.price.toFixed(2)}</p>
                          </div>
                          <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>
                            <h3>Remove Item</h3>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
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
                <p>Order Subtotal: <span className="right-text">${subtotal.toFixed(2)}</span></p>
                <p>Taxes: <span className="right-text">${taxes.toFixed(2)}</span></p>
              </div>
              <hr />
              <p><strong>Order Total: <span className="right-text">${total.toFixed(2)}</span></strong></p>
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
              <div className="product-suggestions-section">
                <h2>People Who Bought this Item also Bought</h2>
                <SuggestedProducts 
                    currentProductId={cart[0]?.id || ""} 
                    currentProductCategory={cart[0]?.category || ""} 
                />
              </div>
              <Wedding />
              
      </div>
    </>
  );
}

export default Checkout;
