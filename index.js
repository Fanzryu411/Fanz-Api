const express = require('express');
const cors = require('cors');
const secure = require('ssl-express-www');
const { color } = require('./lib/color.js');

const mainrouter = require('./routes/main');
const apirouter = require('./routes/api');

const app = express();

// Vercel uses "trust proxy" for SSL forwarding
app.enable('trust proxy');

// Format JSON responses with pretty print
app.set("json spaces", 2);

// Middlewares
app.use(cors());
app.use(secure);  // Force HTTPS
app.use(express.static("public"));

// Routes
app.use('/', mainrouter);
app.use('/api', apirouter);

// Export handler to be used by Vercel
module.exports = (req, res) => {
  app(req, res);
};
