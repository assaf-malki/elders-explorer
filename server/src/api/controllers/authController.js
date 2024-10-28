const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Ensure you have a db.js file to handle your MySQL pool

exports.getUser = (req, res) => {
  // Retrieve user ID from the request user object
  const userId = req.user.userId;

  // SQL query to select user from the database
  const sql = 'SELECT * FROM users WHERE id = ?';

  // Execute the query with the user ID
  pool.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      // Send back the user data
      const user = results[0];
      res.json({
        user: {
          username: user.username,
          birthday: user.birthday,
          location: { lat: user.location_lat, lon: user.location_lon },
          locationText: user.location_text,
          hobbies: user.hobbies.split(','),
        },
      });
    } else {
      // If no user found
      res.status(404).json({ message: 'User not found' });
    }
  });
};

// Function to handle registration
exports.register = (req, res) => {
  let { username, password, birthday, location, locationText, hobbies } =
    req.body;

  // Check if username exists
  let checkUserSql = 'SELECT username FROM users WHERE username = ?';
  pool.query(checkUserSql, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking user' });
    }
    if (result.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    // If username does not exist, hash the password and insert the new user
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      let sql =
        'INSERT INTO users (username, password, birthday, location_lat, location_lon, location_text, hobbies) VALUES (?, ?, ?, ?, ?, ?, ?)';
      pool.query(
        sql,
        [
          username,
          hash,
          birthday,
          location.lat,
          location.lon,
          locationText,
          hobbies.join(','),
        ],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          const token = jwt.sign(
            {
              userId: result.insertId, // Assuming 'result.insertId' is the user ID from the database insertion
              username: username,
            },
            'secret-key',
            {
              expiresIn: '1d',
            }
          );
          res.cookie('token', token, { httpOnly: true, secure: false });
          res.status(201).json({ message: 'User created' });
        }
      );
    });
  });
};

// Function to handle login
exports.login = (req, res) => {
  const { username, password } = req.body;

  // SQL query to find user by username
  const sql = 'SELECT * FROM users WHERE username = ?';
  pool.query(sql, [username], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Database error during the login process' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .json({ error: 'Error during password comparison' });
      }
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: 'Invalid username or password' });
      }

      // If credentials are correct, sign a new token and return user info
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        'secret-key',
        { expiresIn: '1d' }
      );

      res.cookie('token', token, { httpOnly: true, secure: false }); // Modify 'secure' based on your protocol (HTTPS)
      res.status(200).json({
        message: 'Login successful',
        user: {
          username: user.username,
          birthday: user.birthday,
          location: { lat: user.location_lat, lon: user.location_lon },
          locationText: user.location_text,
          hobbies: user.hobbies.split(','),
        },
      });
    });
  });
};

exports.logout = (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.updateDetails = (req, res) => {
  const { userId } = req.user; // Extract userId from the request user object added by authenticateToken
  const { birthday, location, locationText, hobbies } = req.body;

  // SQL query to update user details
  let sql =
    'UPDATE users SET birthday = ?, location_lat = ?, location_lon = ?, location_text = ?, hobbies = ? WHERE id = ?';

  // Execute the update query with the provided data
  pool.query(
    sql,
    [
      birthday,
      location.lat,
      location.lon,
      locationText,
      hobbies.join(','), // Convert hobbies array back to string
      userId,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: 'Database error during updating user details',
          details: err,
        });
      }
      if (result.affectedRows === 0) {
        // No rows updated, which means the user does not exist
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User details updated successfully' });
    }
  );
};
