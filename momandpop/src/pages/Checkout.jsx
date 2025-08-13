import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

    const generateItemNumber = (id) => {
    const seed = parseInt(id) * 12345;
    return 10000 + (seed % 90000);
  };
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
    // Not mad yet 
    navigate("/order-confirmation");
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Galada" rel="stylesheet" />
      <div className="checkout-box">
        <a
          className="back-link"
          href="/catalogue"
        >
          ← Back to Catalogue
        </a>
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
                      <img src={item.image} alt={item.name}  />
                    </div>
                    <div className="item-details">
                      <div className="item-info-box">
                        <div className="item-info">
                          <h3>{item.name}</h3>
                          <p className="item-num">Item # {generateItemNumber(item.id)}</p>
                          <p className="item-desc">{item.description}</p>
                        </div>
                        <div className="item-quantity">
                          <label htmlFor={`quantity-${item.id}`}>
                            <span className="quantity">Qty</span>
                          </label>
                          <select
                            id={`quantity-${item.id}`}
                            name="quantity"
                            value={item.quantity} // <-- show the actual cart quantity
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))} // <-- update when changed
                          >
                            {[1, 2, 3, 4, 5].map(qty => (
                              <option key={qty} value={qty}>
                                {qty}
                              </option>
                            ))}
                          </select>
                        </div>


                      </div>
                      <div className="items-right">
                        <div className="item-price">
                          <p>${item.price.toFixed(2)}</p>
                        </div>
                        <button className="remove-item" onClick={() => handleRemoveItem(item.id)}><h3>Remove Item</h3></button>
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
