const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); // Import morgan
const app = express();
const authRoutes = require('./api/routes/authRoutes');
const placesRoutes = require('./api/routes/placesRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(
  cors({
    origin: `http://localhost:3000`, // Allow only this origin to access
    credentials: true, // Allowing credentials
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // Log every request to the console with 'dev' format
app.use('/api', placesRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
