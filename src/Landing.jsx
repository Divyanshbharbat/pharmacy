import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, Toaster } from 'react-hot-toast';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleShopNow = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      toast.success('Welcome back! Redirecting to home...');
      setTimeout(() => navigate('/home'), 1000);
    } else {
      toast.error('Please login to continue');
      setTimeout(() => navigate('/login'), 1000);
    }
  };

  return (
    <div className="landing-page">
      <Toaster position="top-center" />

      {/* Hero Section */}
      <header
        className="text-white text-center"
        style={{
       backgroundColor:"blue",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '120px 0',
        }}
        data-aos="fade-down"
      >
        <div className="container">
          <h1 className="display-3 fw-bold">Welcome to Our Pharmacy</h1>
          <p className="lead">Reliable medicines. Trusted care. Delivered to your door.</p>
          <button className="btn btn-light btn-lg mt-4" onClick={handleShopNow}>
            Show Now
          </button>
        </div>
      </header>

      {/* Why Choose Us */}
      <section className="py-5 bg-light" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-5 text-success">Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4" data-aos="zoom-in">
              <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" width="80" alt="Genuine" />
              <h5 className="mt-3">100% Genuine Products</h5>
              <p>All our medicines are sourced from verified pharmaceutical companies.</p>
            </div>
            <div className="col-md-4" data-aos="zoom-in">
              <img src="https://cdn-icons-png.flaticon.com/512/235/235861.png" width="80" alt="Delivery" />
              <h5 className="mt-3">Fast Delivery</h5>
              <p>Get your medications delivered to your doorstep on time, every time.</p>
            </div>
            <div className="col-md-4" data-aos="zoom-in">
              <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" width="80" alt="Support" />
              <h5 className="mt-3">24/7 Support</h5>
              <p>Expert pharmacists available round the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="py-5 text-white"
        style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}
        data-aos="fade-up"
      >
        <div className="container text-center">
          <h2 className="mb-4">Our Services</h2>
          <div className="row">
            <div className="col-md-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3756/3756931.png" width="70" alt="Prescription" />
              <h5 className="mt-3">Prescription Management</h5>
              <p>We manage, refill, and deliver prescriptions for chronic conditions.</p>
            </div>
            <div className="col-md-4">
              <img src="https://cdn-icons-png.flaticon.com/512/2356/2356981.png" width="70" alt="Consult" />
              <h5 className="mt-3">Free Consultations</h5>
              <p>Talk to a certified pharmacist online or in-store anytime.</p>
            </div>
            <div className="col-md-4">
              <img src="https://cdn-icons-png.flaticon.com/512/2942/2942846.png" width="70" alt="Reminders" />
              <h5 className="mt-3">Smart Reminders</h5>
              <p>Get notified before your prescriptions run out or refills are due.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-4 text-primary">What Our Customers Say</h2>
          <div className="row">
            <div className="col-md-4">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="rounded-circle mb-2" width="80" alt="Customer" />
              <p className="fst-italic">“Super fast delivery and best discounts!”</p>
              <strong>- Neha S.</strong>
            </div>
            <div className="col-md-4">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="rounded-circle mb-2" width="80" alt="Customer" />
              <p className="fst-italic">“Helpful staff and verified products. Highly recommend.”</p>
              <strong>- Ankit R.</strong>
            </div>
            <div className="col-md-4">
              <img src="https://randomuser.me/api/portraits/women/55.jpg" className="rounded-circle mb-2" width="80" alt="Customer" />
              <p className="fst-italic">“Best online medical store in my city!”</p>
              <strong>- Kavya M.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Health Articles */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(to right, #1D976C, #93F9B9)' }} data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-4">Latest Health Articles</h2>
          <p className="lead">Stay informed with curated health news, wellness tips, and medical breakthroughs.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4" style={{ backgroundColor: '#111', color: 'white' }}>
        <p>&copy; 2025 Our Pharmacy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
