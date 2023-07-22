const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
require('dotenv').config();

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
}

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PW,
  database: 'vehicle_app_db',
});
connection.connect((err) => {
  if(err){
    throw err;
  }
  console.log("mysql is connected..")
});

// Middleware to parse incoming JSON data
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // Check if user with the given email exists in the database
  const query = `SELECT * FROM Users WHERE email = '${email}'`; 
  connection.query(query, (error, results) => { 
    if (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    } else {
      if (results.length === 0) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        const user = results[0];

  // Compare the provided password with the hashed password in the user data
  bcrypt.compare(password, user.password, (err, isMatch) => {
    console.log(isMatch)
    if (err) {
      console.error('Error comparing passwords:', err);
      res.status(500).json({ message: 'Server error' });
    } else if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      // Create and send a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', {
        expiresIn: '1h', // Token expires in 1 hour
      });
      res.json({ token });
    }
  });
      }
    }
  });
});
// ...

// API endpoint for retrieving all vehicles
app.get('/api/vehicles', (req, res) => {
  const query = 'SELECT * FROM Vehicles';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ message: 'Server error' });
    } else {
      res.json(results);
    }
  });
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
