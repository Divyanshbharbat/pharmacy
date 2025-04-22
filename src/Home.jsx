import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast,Toaster } from 'react-hot-toast';
import './Home.css';
import Aspirin from '../src/assets/aspirin.jpeg';

import Folic from '../src/assets/folic acid.jpeg';
import Ibu from '../src/assets/ibuprofgen.jpeg';
import para from '../src/assets/paracetaml.jpg';
import vitamin from '../src/assets/vitamin.jpeg';
import meta from '../src/assets/metamorphin.jpeg';


const Home = () => {
  const [featuredMeds, setFeaturedMeds] = useState([
    {
      name: 'Paracetamol 500mg',
      price: '30',
      desc: 'Effective for fever and mild pain relief.',
      image: para,
      category: 'Pain Relief',
    },
    {
      name: 'Ibuprofen 400mg',
      price: '45',
      desc: 'Reduces inflammation and pain.',
      image: Ibu,
      category: 'Pain Relief',
    },
    {
      name: 'Aspirin 100mg',
      price: '20',
      desc: 'Effective for pain relief and anti-inflammatory.',
      image: Aspirin,
      category: 'Pain Relief',
    },
    {
      name: 'Vitamin C 500mg',
      price: '50',
      desc: 'Boosts immunity and overall health.',
      image: vitamin,
      category: 'Vitamins',
    },
    {
      name: 'Folic Acid 400mg',
      price: '60',
      desc: 'Supports healthy pregnancy and blood cell production.',
      image: Folic,
      category: 'Vitamins',
    },
    {
      name: 'Metformin 500mg',
      price: '80',
      desc: 'Helps control blood sugar levels.',
      image: meta,
      category: 'Diabetes',
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const addToCart = async (medicine) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in to add medicines to your cart!');
        return;
      }

      const response = await axios.post(
        'https://pharmacy-2-bzdr.onrender.com/add',
        { medicine },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Product added to cart');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error adding product to cart');
    }
  };

  return (
    <div className="home" style={{ fontFamily: 'Poppins' }}>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hero Section */}
      <section className="hero text-dark text-center py-5" style={{ background: 'linear-gradient(to right, #00c9ff, #92fe9d)' }} data-aos="fade-down">
        <h1 className="display-4 fw-bold">Welcome to GreenLife Pharmacy</h1>
        <p className="lead">Your trusted online medical store for genuine and affordable medicines.</p>
        <button className="btn btn-success btn-lg mt-3" onClick={() => navigate('#featuredMeds')}>Shop Now</button>
      </section>

      {/* Featured Medicines */}
      <section className="container my-5" id="featuredMeds" data-aos="fade-up">
        <h2 className="text-center mb-4">Featured Medicines</h2>
        <div className="row">
          {featuredMeds.map((med, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm border-0">
                <img src={med.image} className="card-img-top" alt={med.name} />
                <div className="card-body">
                  <h5 className="card-title">{med.name}</h5>
                  <p className="card-text">{med.desc}</p>
                  <p className="fw-bold text-success">{med.price}</p>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => addToCart(med)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="py-5 bg-light" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-4">About GreenLife Pharmacy</h2>
          <p className="lead">
            Established in 2010, GreenLife Pharmacy has been providing quality healthcare solutions to millions across the country. We aim to deliver accessible, affordable, and authentic medical services with the highest level of customer satisfaction.
          </p>
          <img src="https://img.freepik.com/free-vector/medical-design-poster-with-original-medicinal-capsule-consisting-green-blue-parts-leaves-as-life-symbol-illustration_1284-53606.jpg?ga=GA1.1.109368830.1743779497&semt=ais_hybrid&w=740" className="img-fluid mt-3 rounded" alt="pharmacy" />
        </div>
      </section>

      {/* Our Qualities */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(to right, #2BC0E4, #EAECC6)' }} data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-4">What Makes Us Different?</h2>
          <div className="row">
            <div className="col-md-3">
              <h5>✅ Certified Pharmacists</h5>
              <p>Qualified experts ensure accuracy and safety in every order.</p>
            </div>
            <div className="col-md-3">
              <h5>📦 Express Delivery</h5>
              <p>Most orders are delivered within 24 hours.</p>
            </div>
            <div className="col-md-3">
              <h5>📱 App Integration</h5>
              <p>Seamless experience across mobile and desktop.</p>
            </div>
            <div className="col-md-3">
              <h5>💳 Secure Payment</h5>
              <p>Encrypted transactions with all major payment options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container py-5" data-aos="fade-up">
        <h2 className="text-center mb-4">Meet Our Experts</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="rounded-circle mb-2" width="100" alt="Team" />
            <h5>Dr. Rahul Mehta</h5>
            <p>Chief Pharmacist</p>
          </div>
          <div className="col-md-4">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" className="rounded-circle mb-2" width="100" alt="Team" />
            <h5>Dr. Shruti Agarwal</h5>
            <p>Nutrition Specialist</p>
          </div>
          <div className="col-md-4">
            <img src="https://randomuser.me/api/portraits/men/76.jpg" className="rounded-circle mb-2" width="100" alt="Team" />
            <h5>Mr. Anand Verma</h5>
            <p>Health Advisor</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-5 text-white text-center" style={{ background: 'linear-gradient(to right, #56CCF2, #2F80ED)' }} data-aos="fade-up">
        <div className="container">
          <h2 className="mb-4">Our Impact</h2>
          <div className="row">
            <div className="col-md-3">
              <h3>1M+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="col-md-3">
              <h3>50K+</h3>
              <p>Orders Delivered</p>
            </div>
            <div className="col-md-3">
              <h3>100+</h3>
              <p>Trusted Brands</p>
            </div>
            <div className="col-md-3">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark text-white">
        <p>&copy; 2025 GreenLife Pharmacy | Your health, our priority.</p>
      </footer>
    </div>
  );
};

export default Home;
