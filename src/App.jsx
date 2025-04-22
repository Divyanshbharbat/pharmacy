import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from './Order.jsx';
import Login from './Components/Login';
import Signup from './Components/Signup'
import Home from './Home.jsx';
import CartPage from './CartPage.jsx';
import Navbar from './Navbar.jsx';
import Landing from './Landing.jsx';
import History from './History.jsx';
import Product from './Product.jsx';
import About from './Components/About.jsx';
import ContactUs from './Components/Contact.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar/><Landing/></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order" element={<><Navbar/><Order /></>} />
        <Route path="/history" element={<><Navbar/><History /></>} />
        <Route path="/products" element={<><Navbar/><Product/></>} />
        <Route path="/about" element={<><Navbar/><About/></>} />
        <Route path="/contact" element={<><Navbar/><ContactUs/></>} />

        <Route path="/cart" element={
         <> <Navbar/>
          <CartPage/></>} />
        <Route path="/home" element={<>
      <Navbar/>
        <Home/>
        </>} />
      
      </Routes>
    </Router>
  );
}
export default App;
