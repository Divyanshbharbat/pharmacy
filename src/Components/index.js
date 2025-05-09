import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import Order from './Order.js';
import User from './User.js';


// Configure environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
  origin: 'https://pharmacywebapplication.vercel.app', // Replace with your frontend's origin
  credentials: true, // Allow cookies and other credentials
};
// const corsOptions = {
//   origin: '*',
//   credentials: true,
// };
app.use(cors(corsOptions));
app.use(cookieParser());

// JWT Middleware for regular user
const jwtMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
     return res.status(401).send("fail");
   
  }
 
  try {
    const decoded = jwt.verify(token, "divyansh");
   
    req.user = decoded;
    console.log(req.user) // Attach the decoded token to the request object
    // Log user info for debugging
    next(); // Proceed with the next middleware
  } catch (error) {

     res.send("fail");
  }
};
app.post("/add", jwtMiddleware, async (req, res) => {
  try {
    console.log(req.body)
    const { medicine } = req.body;  // Full product data
    

    // Find the user based on the JWT
    const user = await User.findOne({ username: req.user.username });
   
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the medicine is already in the cart
   

    // Add the medicine to the user's cart (storing the full product data)
    user.cart.push(medicine);

    // Save the updated user data to the database
    const updatedUser = await user.save();
   

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding product to cart" });
  }
});
import nodemailer from 'nodemailer' // make sure you require nodemailer

// Setup nodemailer transporter (example using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bharbatdivyansh1@gmail.com', // replace with your email
    pass: 'uejuxvsnsyvotsgg',    // use app password, not your main password
  },
});

app.post("/place/order", jwtMiddleware, async (req, res) => {
  try {
    const { userDetails, address, phone, products, totalPrice } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty!" });
    }

    const newOrder = new Order({
      user: req.user.id,
      userDetails,
      address,
      phone,
      products,
      totalPrice,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();

    let user2 = await User.findOne({ username: req.user.username });

    // Link order to user
    await User.findByIdAndUpdate(user2._id, {
      $push: { orders: savedOrder._id },
      $set: { cart: [] },
    });

    // Send confirmation email
    const mailOptions = {
      from: `${user2.username}`, // your email
      to: 'bharbatdivyansh1@gmail.com',              // assuming user2 has an email field
      subject: 'Order Confirmation',
      html: `
        <h1>Thank you for your order!</h1>
        <p>Hi ${user2.username},</p>
        <p>Your order has been placed successfully. Here are your order details:</p>
        <ul>
          ${products.map(product => `<li>${product.name} - Quantity: ${product.quantity}</li>`).join('')}
        </ul>
        <p><strong>Total Price:</strong> $${totalPrice}</p>
        <p>We will deliver your order to:</p>
        <p>${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p>Status: <strong>Pending</strong></p>
        <br/>
        <p>Thank you for shopping with us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Order placed and confirmation email sent", order: savedOrder });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

app.delete("/cart/:productName", jwtMiddleware, async (req, res) => {
  try {
    const userId = req.user.username; // Get from middleware
    const { productName } = req.params; // Get from URL

    const user = await User.findOne({username:userId})
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const originalLength = user.cart.length;

    // Remove product by name
    user.cart = user.cart.filter(item => item.name !== productName);

    if (user.cart.length === originalLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

   let y= await user.save();
  

    res.status(200).json({ message: "Product removed from cart", cart: user.cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});
import Contact from './Contact.js';
app.post("/api/contact/submit",async (req, res) => {
  console.log(req.body)
  const { name, email, subject, message } = req.body;

  // Validate the request body
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Simulate saving the contact message (e.g., in a database)
let r=new Contact({name,email,subject,message})
await r.save();

  // Return a success response
  res.status(200).json({
    message: "Thank you for contacting us! We'll get back to you shortly.",
    
  });
});


app.get('/order/history', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token
    const decoded = jwt.verify(token, 'divyansh');
   
    const userId = decoded.username;  // Assuming userId is part of the token
   
    // Find the user and get their orders
    const user = await User.findOne({username:userId}).populate('orders');
   
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ orders: user.orders });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Sign up route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
console.log(req.body)
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.send("success");
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username }, "divyansh", { expiresIn: "1h" });


    return res.send({message:"success",token:token});
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/cart', jwtMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user.cart)

    return res.status(200).json({ cart: user.cart });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});


mongoose.connect(process.env.VITE_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error", err));

// Start the Express server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});