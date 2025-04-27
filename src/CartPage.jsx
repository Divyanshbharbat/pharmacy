import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("cookie");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your cart.");

      navigate("/login")
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get("https://pharmacy-2-zfvd.onrender.com/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data.cart);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching cart items.");
      }
    };

    fetchCartItems();
  }, [token]);

  const handleDelete = async (productName) => {
    try {
      // const response = await axios.delete(`http://localhost:3000/cart/${productName}`, {
      const response = await axios.delete(`https://pharmacy-2-zfvd.onrender.com/cart/${productName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      setCartItems(response.data.cart);
    } catch (error) {
      toast.error("Error removing product from cart.");
    }
  };

  const handlePlaceOrder = () => {
    navigate("/order");
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #212121, #424242)",
        color: "white",
      }}
    >
      <Toaster />
      <h2 className="text-center mb-5 fw-bold">🛒 Your Cart</h2>

      <div className="row justify-content-center">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="col-md-4 col-sm-6 mb-4" key={item.id}>
              <div className="card bg-dark text-white border-0 shadow-lg rounded-4 h-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top rounded-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-muted">💰 Price: ₹{item.price}</p>
                  <button
                    className="btn btn-danger mt-auto w-100 rounded-pill"
                    onClick={() => handleDelete(item.name)}
                  >
                    <i className="bi bi-trash3-fill me-2"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h4 className="text-light">Your cart is currently empty 🛍️</h4>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-warning btn-lg rounded-pill px-5 shadow"
            onClick={handlePlaceOrder}
          >
            <i className="bi bi-check2-circle me-2"></i> Place Order
          </button>
        </div>
      )}

      <div className="text-center mt-5">
        <Link
          to="/home"
          className="btn btn-outline-light btn-lg rounded-pill px-4"
        >
          <i className="bi bi-arrow-left-circle me-2"></i> Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
