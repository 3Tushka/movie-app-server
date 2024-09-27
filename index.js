const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/models');

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to 3tushka movie application." });
});

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`\x1b[32mServer is running on port ${PORT}.\x1b[0m`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});

// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });