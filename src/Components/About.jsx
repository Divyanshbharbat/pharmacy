import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
     
      <section className="text-center section" data-aos="fade-down">
        <h1>About <span className="highlight">LifeLine Pharmacy</span></h1>
        <p className="lead">Delivering care, compassion, and quality healthcare at your doorstep.</p>
      </section>

      <section className="container section" data-aos="fade-up">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="https://img.freepik.com/free-photo/healthcare-workers-pharmacy_23-2149343905.jpg" alt="Pharmacy" className="about-img" />
          </div>
          <div className="col-md-6">
            <div className="glass">
              <h2>Our Journey</h2>
              <p>LifeLine Pharmacy started in 2010 with a simple mission — to make high-quality medicines accessible, affordable, and delivered with care.</p>
              <p>Today, we serve more than 1 lakh families with doorstep delivery, online consultations, and 24x7 support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section" data-aos="fade-up">
        <h2 className="text-center mb-5">Our <span className="highlight">Mission & Vision</span></h2>
        <div className="row text-center">
          <div className="col-md-6">
            <div className="info-box">
              <h4>🎯 Mission</h4>
              <p>To provide safe, affordable, and accessible healthcare to every individual by leveraging digital technology and trusted service.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-box">
              <h4>👁️ Vision</h4>
              <p>To be India's most reliable pharmacy — known for compassion, convenience, and customer-centricity in everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section" data-aos="zoom-in">
        <h2 className="text-center mb-5">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="info-box">
              <h5>✅ Trusted by 100K+ Families</h5>
              <p>We’ve built our reputation through transparency and reliability in all our services.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-box">
              <h5>🛒 24x7 Order Support</h5>
              <p>Order medicines anytime from our website or app with real-time delivery tracking.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-box">
              <h5>💊 Verified Medicines</h5>
              <p>We source from top pharmaceutical companies to ensure product quality and authenticity.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section" data-aos="fade-up">
        <h2 className="text-center mb-5">Meet Our <span className="highlight">Team</span></h2>
        <div className="row text-center">
          {[
            { name: "Dr. Arjun Malhotra", role: "Founder & CEO", img: "https://img.freepik.com/free-photo/portrait-happy-young-male-doctor-white-coat_171337-15138.jpg" },
            { name: "Priya Desai", role: "Chief Pharmacist", img: "https://img.freepik.com/free-photo/close-up-smiley-woman-lab-coat_23-2149241531.jpg" },
            { name: "Neha Kapoor", role: "Operations Head", img: "https://img.freepik.com/free-photo/young-businesswoman-standing-office_1303-27684.jpg" }
          ].map((member, i) => (
            <div className="col-md-4" key={i}>
              <div className="team-card">
                <img src={member.img} alt={member.name} className="img-fluid rounded-circle mb-3" width="120" />
                <h5>{member.name}</h5>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section" data-aos="fade-up">
        <h2 className="text-center mb-5">🏆 Our Achievements</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">✔️ Delivered over <strong>2 million+ prescriptions</strong> across India.</li>
          <li className="list-group-item">✔️ 99% customer satisfaction and positive service feedback.</li>
          <li className="list-group-item">✔️ Partnered with 500+ certified healthcare providers.</li>
          <li className="list-group-item">✔️ Winner of <strong>India HealthTech Excellence Award</strong> in 2023.</li>
        </ul>
      </section>

      <footer className="text-center" style={{ backgroundColor: '#ffebe0', padding: '30px', marginTop: '60px' }}>
        <p>&copy; 2025 LifeLine Pharmacy. All Rights Reserved | Designed with ❤️ for your health.</p>
      </footer>

      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(to right, #fff0e6, #ffe6f0);
          color: #333;
        }
        h1, h2, h3 {
          color: #b03a2e;
          font-weight: bold;
        }
        .section {
          padding: 80px 20px;
        }
        .highlight {
          color: #e67e22;
        }
        .about-img {
          max-width: 100%;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        .glass {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        .info-box {
          background-color: #fff7f0;
          padding: 25px;
          border-left: 5px solid #e67e22;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .team-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s;
        }
        .team-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </>
  );
};

export default About;
