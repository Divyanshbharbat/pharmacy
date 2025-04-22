// import para from '../src/assets/paracetaml.jpg'
// import Ibu from '../src/assets/ibuprofgen.jpeg';
// import Aspirin from '../src/assets/aspirin.jpeg';
// import vitamin from '../src/assets/vitamin.jpeg';
// import Folic from '../src/assets/folic acid.jpeg';
// import meta from '../src/assets/metamorphin.jpeg';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast ,Toaster} from 'react-hot-toast';
import axios from 'axios';
// Sample image imports
import para from '../src/assets/paracetaml.jpg';
import Ibu from '../src/assets/ibuprofgen.jpeg';
import Aspirin from '../src/assets/aspirin.jpeg';
import vitamin from '../src/assets/vitamin.jpeg';
import Folic from '../src/assets/folic acid.jpeg';
import meta from '../src/assets/metamorphin.jpeg';

const Home = () => {
  const navigate = useNavigate();

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
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const addToCart = async (medicine) => {
    try {
      const token = localStorage.getItem('cookie');
      console.log(token)
      if (!token) {
        toast.error('You must be logged in to add medicines to your cart!');
        return;
      }
   // 'https://pharmacy-2-bzdr.onrender.com/add',
      const response = await axios.post('http://localhost:3000/add',
        { medicine },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(response.data)
      if (response.data.message=="success") {
        toast.success('Product added to cart');
      }
    } catch (error) {
      console.error(error);
      toast.error('Product Already Added to Cart');
    }
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero Section */}
      <Container className="my-4">
      <Row className="align-items-center">
        {/* Left side: Text */}
        <Col md={6}>
          <Card className="text-dark text-center" >
            <Toaster/>
            <Card.Body className="py-5">
              <h1 data-aos="fade-down" className="fw-bold mb-3">Welcome to GreenLeaf Pharmacy</h1>
              <p data-aos="fade-up">Your one-stop online store for reliable, affordable medicines and healthcare essentials.</p>
              <Button variant="success" className="mt-3 fw-semibold " onClick={() => navigate('/')}>
                Shop Now
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Right side: Image */}
        <Col md={6}>
          <img 
            src='https://img.freepik.com/premium-vector/pharmacy-drugs-bottle-pills-illustration_128772-628.jpg?ga=GA1.1.860258030.1745240119&semt=ais_hybrid&w=740'
            alt="Pharmacy" 
            className="img-fluid rounded shadow-lg" 
            style={{ maxHeight: '400px', objectFit: 'cover' }} 
          />
        </Col>
      </Row>
    </Container>

      {/* Featured Medicines */}
      <Container className="my-4">
        <Card className="p-4 shadow-sm border-0" style={{ background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)' }}>
          <h2 className="text-center mb-4" data-aos="fade-up">Featured Medicines</h2>
          <Row>
            {featuredMeds.map((med, idx) => (
              <Col md={4} className="mb-4" key={idx} data-aos="zoom-in" data-aos-delay={(idx % 6) * 100}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Img
                    variant="top"
                    src={med.image}
                    alt={med.name}
                    className="img-fluid p-3"
                    style={{ maxHeight: '220px', objectFit: 'contain' }}
                  />
                  <Card.Body>
                    <h5 className="fw-bold">{med.name}</h5>
                    <Badge bg="success" className="mb-2">{med.category}</Badge>
                    <Card.Text>{med.desc}</Card.Text>
                    <h6 className="fw-semibold text-success">₹{med.price}</h6>
                    <Button variant="success" className="mt-2" onClick={() => addToCart(med)}>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Container>

      {/* About Us Section */}
      <Container className="my-4">
        <Card className="p-4 shadow-sm border-0" style={{ background: 'linear-gradient(135deg, #fdfbfb, #ebedee)' }}>
          <Row>
            <Col md={6}>
              <h2 className="mb-4" data-aos="fade-up">About Us</h2>
              <p data-aos="fade-up" className="lead">
                GreenLeaf Pharmacy is committed to providing high-quality, affordable medicines, and healthcare products. 
                With our online platform, you can get your medicines delivered to your doorstep with ease.
              </p>
              <Button variant="success" onClick={() => navigate('/about')}>
                Learn More
              </Button>
            </Col>
            <Col md={6} data-aos="fade-left">
              <img
                src="https://img.freepik.com/free-photo/young-hispanic-woman-pharmacist-smiling-confident-standing-with-arms-crossed-gesture-pharmacy_839833-7087.jpg?ga=GA1.1.860258030.1745240119&semt=ais_hybrid&w=740"
                alt="Pharmacy"
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Card>
      </Container>

      {/* Customer Testimonials Section */}
      <Container className="my-4">
        <Card className="p-4 shadow-sm border-0" style={{ background: 'linear-gradient(135deg, #fffbd5, #b20a2c)' }}>
          <h2 className="text-center text-white mb-4" data-aos="fade-up">What Our Customers Say</h2>
          <Row>
            <Col md={4} data-aos="fade-up" data-aos-delay="100">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <p>"GreenLeaf Pharmacy is my go-to online store for all my health needs. Fast delivery and great prices!"</p>
                  <h6>- John Doe</h6>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <p>"Excellent customer service and prompt deliveries. The quality of medicines is top-notch!"</p>
                  <h6>- Jane Smith</h6>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="300">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <p>"I’ve been using GreenLeaf for over a year. They offer a wide range of medicines at unbeatable prices."</p>
                  <h6>- Mark Johnson</h6>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>

      {/* Health Tips Section */}
      <Container className="my-4">
        <Card className="p-4 shadow-sm border-0" style={{ background: 'linear-gradient(135deg, #ffecd2, #fcb69f)' }}>
          <h2 className="text-center mb-4" data-aos="fade-up">Health Tips</h2>
          <Row>
            <Col md={4} data-aos="fade-up" data-aos-delay="100">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold">Drink Plenty of Water</h5>
                  <p>Stay hydrated for better energy and improved overall health.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold">Regular Exercise</h5>
                  <p>Maintaining an active lifestyle helps boost immunity and mental health.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="300">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold">Eat a Balanced Diet</h5>
                  <p>Ensure you’re getting the right nutrients for optimal health.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
