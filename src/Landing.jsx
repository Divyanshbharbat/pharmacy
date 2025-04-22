import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PharmacyLandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero Section */}
      <section className="text-white" style={{
        background: 'linear-gradient(135deg, #0f9b0f 0%, #000000 100%)',
        padding: '80px 0'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} data-aos="fade-right">
              <h1 className="display-4 fw-bold">Your Trusted Online Pharmacy</h1>
              <p className="lead mt-4">Order medicine, health essentials, and wellness products with a single click.</p>
              <Button variant="light" className="mt-3 fw-semibold">Shop Now</Button>
            </Col>
            <Col md={6} data-aos="fade-left">
              <img src="https://img.freepik.com/free-vector/medical-prescription-concept-illustration_114360-6595.jpg?ga=GA1.1.109368830.1743779497&semt=ais_hybrid&w=740" alt="Pharmacy" className="img-fluid rounded" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4" data-aos="fade-up">Why Choose Us?</h2>
          <Row className="text-center">
            <Col md={4} data-aos="fade-up">
              <img src="https://img.icons8.com/ios-filled/100/0f9b0f/medicine.png" alt="Genuine Medicines" />
              <h5 className="mt-3">Genuine Medicines</h5>
              <p>All medicines are sourced directly from licensed pharmacies and manufacturers.</p>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="100">
              <img src="https://img.icons8.com/ios-filled/100/0f9b0f/delivery.png" alt="Fast Delivery" />
              <h5 className="mt-3">Fast Delivery</h5>
              <p>Receive your orders within 24–48 hours in all major cities.</p>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <img src="https://img.icons8.com/ios-filled/100/0f9b0f/customer-support.png" alt="24/7 Support" />
              <h5 className="mt-3">24/7 Support</h5>
              <p>Chat with pharmacists anytime for prescription and health advice.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Us */}
      <section className="py-5 text-white" style={{ background: '#0f9b0f' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} data-aos="fade-right">
              <img src="https://img.freepik.com/free-vector/doctor-explaining-patient-pharmacy_74855-14169.jpg" alt="About Pharmacy" className="img-fluid rounded shadow" />
            </Col>
            <Col md={6} data-aos="fade-left">
              <h2>About Our Pharmacy</h2>
              <p className="mt-3">We are committed to delivering authentic medicines at affordable prices. Our platform ensures every product is verified, safe, and delivered with care. With over 10,000+ satisfied customers, we are proud to be a trusted name in online healthcare.</p>
              <Button variant="light" className="fw-semibold">Learn More</Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* App Download Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="align-items-center text-center text-md-start">
            <Col md={6} data-aos="zoom-in">
              <h3 className="fw-bold">Download Our Mobile App</h3>
              <p className="mt-2">Order medicine and track deliveries on the go!</p>
              <Button variant="success" className="mt-2">Download App</Button>
            </Col>
            <Col md={6} data-aos="zoom-in">
              <img src="https://img.freepik.com/free-vector/mobile-banking-isometric_98292-6944.jpg" alt="App Download" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <Container>
          <p>&copy; {new Date().getFullYear()} GreenLeaf Pharmacy. All rights reserved.</p>
          <p>Email: support@greenleafpharma.com | Phone: +91-9876543210</p>
        </Container>
      </footer>
    </div>
  );
};

export default PharmacyLandingPage;
