require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const db = require('./src/models');

// Initialize the Express application
const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:5173"
};

// JWT middleware configuration
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Middleware setup
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to 3tushka movie application." });
});

app.post("/auth", checkJwt, (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
  console.log({ message: 'Token is valid!', token: token });
});

// Server and database initialization
const PORT = process.env.AUTH_PORT || 8080;
const isDevelopment = process.env.NODE_ENV === 'development';

db.sequelize.sync({ force: isDevelopment }).then(() => {
  app.listen(PORT, () => {
    console.log(`\x1b[32mServer is running on port ${PORT}.\x1b[0m`);
    if (isDevelopment) {
      console.log(`\x1b[32mDatabase schema updated.\x1b[0m`);
    }
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});