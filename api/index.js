var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000;
var { color } = require('./lib/color.js');

var mainrouter = require('./routes/main'),
    apirouter = require('./routes/api');

var app = express();
app.enable('trust proxy');
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(express.static("public"));

// Menambahkan router
app.use('/', mainrouter);
app.use('/api', apirouter);

// Mengekspor aplikasi untuk dijalankan sebagai fungsi serverless di Vercel
module.exports = (req, res) => {
    app(req, res);  // Menjalankan aplikasi Express dengan req dan res yang diteruskan
};
