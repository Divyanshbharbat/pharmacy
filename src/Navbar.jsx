import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {toast,Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
const PharmacyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // toggle this to test login/logout state

  const handleLogout = () => {
    // Handle logout logic here
    setIsLoggedIn(false);
   toast.success('Logged out!');
   navigate("/")
  };
let navigate=useNavigate()
  return (
    <Navbar expand="lg" sticky="top" style={{ background: 'linear-gradient(to right, #16a085, #00b894)' }} variant="dark">
      <Container>
        <Toaster></Toaster>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-white">
          GreenLife Pharmacy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="pharmacy-navbar" />
        <Navbar.Collapse id="pharmacy-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/home" className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white">Contact</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="text-white">Cart</Nav.Link>

            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" className="text-white">Signup</Nav.Link>
              </>
            ) : (
              <>
                
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PharmacyNavbar;
