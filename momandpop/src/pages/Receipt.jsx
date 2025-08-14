import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/Receipt.css";

export default function Receipt() {
  const navigate = useNavigate();
  const location = useLocation();

  // Grab order data from router state
  const [orderData] = useState(() => {
    const state = location.state || null;
    if (!state) return null;

    // Ensure each item has quantity (default 1 if missing)
    const itemsWithQuantity = state.items.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));

    return { ...state, items: itemsWithQuantity };
  });

  if (!orderData) {
    return (
      <div className="receipt-page">
        <div className="receipt-container">
          <span className="center-text">
            <p>No order found.</p>
          </span>
          <button onClick={() => navigate("/")}>Return Home</button>
        </div>
      </div>
    );
  }

  const { date, name, phone, items } = orderData;

  // Calculate totals using the purchased quantity
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.15;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <div className="receipt-page">
      <div className="receipt-container">
        {/* Header Info */}
        <div className="receipt-header">
          <div className="order-date">
            <strong>Order Placed:</strong> {date}
          </div>
          <div className="order-amount">
            <strong>Total:</strong> ${total.toFixed(2)}
          </div>
          <div className="customer-info">
            <strong>Name on Order:</strong> {name} <br />
            <strong>Phone:</strong> {phone}
          </div>
        </div>

        {/* Items */}
        <div className="receipt-items">
          {items.map((item, index) => (
            <div key={index} className="receipt-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <p className="item-id">ID: {item.itemNumber || "N/A"}</p>
              </div>
              <p className="item-qty">Qty: {item.quantity}</p>
              <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="receipt-footer">
        <p>
          Thanks for shopping at
          <br />
          Mom's Garden and Pop's
          <br />
          Workshop
        </p>
        <button onClick={() => navigate("/")}>Return Home</button>
      </div>
    </div>
  );
}
