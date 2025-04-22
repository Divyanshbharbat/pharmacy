import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";  // Import axios

const ContactUs = () => {
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    AOS.init();
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
      try {
        // Send the form data to the server using axios
        const response = await axios.post("http://localhost:3000/api/contact/submit", formData);
        console.log(response.data); // Log the server response
        setShowModal(true); // Show modal on successful submission
        setValidated(false);
        setFormData ({ name: "",
            email: "",
            subject: "",
            message: "",})// Reset validation state
        form.reset(); // Reset the form
      } catch (err) {
        console.error("Error submitting contact form:", err);
        setValidated(true); // Show validation error if there's an issue
      }
    } else {
      setValidated(true); // If the form is invalid
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "linear-gradient(to right, #fff5e6, #ffe0f0)", color: "#333" }}>
    

      <div className="container contact-container py-5">
        <h1 className="text-center mb-5" data-aos="fade-down">Get in Touch with Us</h1>

        <div className="row align-items-center">
          <div className="col-md-6 mb-4" data-aos="fade-right">
            <img
              src="https://img.freepik.com/premium-vector/contact-us-concept-illustration_86047-957.jpg?semt=ais_hybrid&w=740"
              alt="Contact Us"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-6" data-aos="fade-left">
            <div className="bg-white rounded p-4 shadow">
              <h4 className="mb-4">Send us a message</h4>
              <form noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                  <div className="invalid-feedback">Please enter your name.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                  <div className="invalid-feedback">Please enter a valid email address.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                    required
                  />
                  <div className="invalid-feedback">Please enter a subject.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                  <div className="invalid-feedback">Please enter your message.</div>
                </div>
                <button type="submit" className="btn btn-warning w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header border-0">
                <h5 className="modal-title w-100">🎉 Message Sent!</h5>
              </div>
              <div className="modal-body">
                <p>Thank you for contacting us. We'll get back to you shortly!</p>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-success w-100" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer style={{ backgroundColor: "#fff2e6", textAlign: "center", padding: "20px", marginTop: "60px" }}>
        <p>&copy; 2025 LifeLine Pharmacy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
