import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("cookie");

    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.cart)) {
          setCartItems(response.data.cart);
          calculateTotal(response.data.cart);
        } else {
          console.warn("Cart is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const calculateTotal = (cart) => {
    const total = cart.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + price * quantity;
    }, 0);
    setTotalPrice(total.toFixed(2));
  };

  const handlePlaceOrder = () => {
    const token = localStorage.getItem("cookie");

    if (!token) {
      Swal.fire("Login Required", "Please login to place your order.", "warning");
      return;
    }

    const orderData = {
      userDetails,
      address,
      phone,
      paymentMethod,
      products: cartItems,
      totalPrice,
    };

    axios
      .post("https://pharmacy-2-bzdr.onrender.com/place/order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: "Your order has been successfully placed.",
          confirmButtonColor: "#38c172",
        }).then(() => navigate("/history"));
      })
      .catch((error) => {
        console.error("Order failed:", error);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong while placing the order.",
        });
      });
  };

  return (
    <div
      className="container my-5 p-4 rounded shadow animate__animated animate__fadeIn"
      style={{
        background: "linear-gradient(135deg, #f1fff5, #d0f0dc)",
        color: "#1b4332",
      }}
    >
      <h2 className="text-center mb-4 display-5 fw-bold">🧾 Place Your Order</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Your Name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          className="form-control mb-3 border-0 shadow-sm"
          style={{ backgroundColor: "#eafaf1", color: "#1b4332" }}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          className="form-control mb-3 border-0 shadow-sm"
          style={{ backgroundColor: "#eafaf1", color: "#1b4332" }}
        />
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-control mb-3 border-0 shadow-sm"
          rows="3"
          style={{ backgroundColor: "#eafaf1", color: "#1b4332" }}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control mb-3 border-0 shadow-sm"
          style={{ backgroundColor: "#eafaf1", color: "#1b4332" }}
        />
      </div>

      <div className="mb-4">
        <h5 className="fw-semibold mb-2">💳 Payment Method</h5>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="cod"
            checked
            value="Cash on Delivery"
            readOnly
          />
          <label className="form-check-label text-success fw-semibold" htmlFor="cod">
            Cash on Delivery
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h4>🛍 Cart Items</h4>
        <ul className="list-group shadow-sm">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#ffffff", color: "#2d6a4f" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <strong>{item.name}</strong>
                    <p className="mb-1 text-muted">Qty: {item.quantity}</p>
                    <p className="text-muted">Unit Price: ₹{item.price}</p>
                  </div>
                </div>
                <span className="badge bg-success text-white fs-6 rounded-pill shadow-sm">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-dark">No items in the cart</li>
          )}
        </ul>
        <h5 className="mt-3 fw-bold">
          💰 Total: <span className="text-success">₹{totalPrice}</span>
        </h5>
      </div>

      <div className="d-grid">
        <button
          onClick={handlePlaceOrder}
          className="btn btn-lg btn-success text-white fw-bold shadow"
        >
          ✅ Confirm & Place Order
        </button>
      </div>
    </div>
  );
};

export default Order;
