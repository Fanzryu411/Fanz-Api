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

// Mengubah middleware express.static untuk melayani file statis dari folder 'api'
app.use(express.static("api"));  // Menyajikan file statis dari folder api

// Menambahkan route untuk mengakses index.html di folder api
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './api' });  // Pastikan file index.html ada di folder api
});

app.use('/api', apirouter);

app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT, 'green'));
});

module.exports = app
