import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate=useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("cookie");

    if (!token) {
      alert("Please log in to view your order history.");
     navigate("/login")
    }

    axios
      .get("https://pharmacy-2-bzdr.onrender.com/order/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrderHistory(response.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="container my-5 p-4 rounded shadow-lg"
      style={{
        background: "linear-gradient(to right, #f1fcff, #e0ffe0)",
        color: "#2f4f4f",
      }}
    >
      <h2 className="text-center mb-5 fw-bold text-success">📦 Your Order History</h2>

      {loading ? (
        <div className="text-center text-muted fs-5">Loading your order history...</div>
      ) : orderHistory.length === 0 ? (
        <div className="text-center text-muted fs-5">No previous orders found.</div>
      ) : (
        orderHistory.map((order, index) => {
          const placedDate = new Date(order.placedAt);
          const formattedDate = placedDate.toLocaleDateString();
          const formattedTime = placedDate.toLocaleTimeString();

          return (
            <div
              key={index}
              className="card mb-4 shadow-sm"
              style={{ backgroundColor: "#ffffff", border: "1px solid #d4f5d4" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title text-success">🧾 Order #{index + 1}</h5>
                  <p className="text-muted mb-2">
                    <small>📅 {formattedDate} | 🕒 {formattedTime}</small>
                  </p>
                </div>
                <p className="card-text mb-3">
                  <strong>Name:</strong> {order.userDetails?.name || "N/A"} <br />
                  <strong>Email:</strong> {order.userDetails?.email || "N/A"} <br />
                  <strong>📍 Address:</strong> {order.address} <br />
                  <strong>📞 Phone:</strong> {order.phone} <br />
                  <strong>💰 Total Price:</strong>{" "}
                  <span className="text-success fw-bold">₹{order.totalPrice}</span>
                </p>

                <h6 className="text-primary">🛍 Products Ordered:</h6>
                <ul className="list-group list-group-flush">
                  {order.products.map((product, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "#f9fdf9" }}
                    >
                      <div>
                        <strong>{product.name}</strong> (x{product.quantity})
                      </div>
                      <span className="badge bg-success fs-6">
                        ₹{product.price * product.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default History;
