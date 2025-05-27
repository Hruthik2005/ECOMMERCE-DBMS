const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // ✅ change this if your MySQL username is different
  password: 'Hruthik@2005', // ✅ replace with your MySQL password
  database: 'user_auth' // ✅ make sure this database exists
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ MySQL connected');
});

// Register API
app.post('/register', async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, password) VALUES (?, ?)';
    db.query(query, [name, hashed], (err, result) => {
      if (err) {
        console.error('Registration Error:', err);
        return res.status(500).send("User already exists or DB error");
      }
      res.send("✅ Registered successfully");
    });
  } catch (err) {
    console.error('Hashing Error:', err);
    res.status(500).send("Server error");
  }
});

// Login API - update this function to return userId
app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const query = 'SELECT * FROM users WHERE name = ?';
  db.query(query, [name], async (err, result) => {
    if (err) {
      console.error('Login DB Error:', err);
      return res.status(500).send("Server error");
    }
    if (result.length === 0) return res.status(401).send("❌ Invalid credentials");

    const isMatch = await bcrypt.compare(password, result[0].password);
    if (isMatch) {
      // Return JSON with userId instead of just a text message
      res.json({
        message: "✅ Login successful",
        userId: result[0].id
      });
    } else {
      res.status(401).send("❌ Invalid credentials");
    }
  });
});

// Get products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Get products by category
app.get('/products/category/:category', (req, res) => {
  const category = req.params.category;
  const query = category === 'all' 
    ? 'SELECT * FROM products' 
    : 'SELECT * FROM products WHERE category = ?';
  
  db.query(query, category === 'all' ? [] : [category], (err, results) => {
    if (err) {
      console.error('Error fetching products by category:', err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Get user's cart
app.get('/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT c.id, c.quantity, c.product_id, p.name, p.price, p.category 
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching cart:', err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Add item to cart
app.post('/cart', (req, res) => {
  const { userId, productId } = req.body;
  
  // First check if item already exists in cart
  const checkQuery = 'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?';
  db.query(checkQuery, [userId, productId], (err, results) => {
    if (err) {
      console.error('Error checking cart:', err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (results.length > 0) {
      // Item exists, update quantity
      const updateQuery = 'UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?';
      db.query(updateQuery, [userId, productId], (err) => {
        if (err) {
          console.error('Error updating cart:', err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Cart updated successfully" });
      });
    } else {
      // Item doesn't exist, add new item
      const insertQuery = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)';
      db.query(insertQuery, [userId, productId], (err) => {
        if (err) {
          console.error('Error adding to cart:', err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Item added to cart" });
      });
    }
  });
});

// Remove item from cart
app.delete('/cart/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;
  
  const query = 'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?';
  db.query(query, [userId, productId], (err) => {
    if (err) {
      console.error('Error removing from cart:', err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Item removed from cart" });
  });
});

// Clear cart
app.delete('/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  
  const query = 'DELETE FROM cart_items WHERE user_id = ?';
  db.query(query, [userId], (err) => {
    if (err) {
      console.error('Error clearing cart:', err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Cart cleared successfully" });
  });
});

// Start Server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
