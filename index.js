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

// Menyajikan file statis dari folder 'views'
app.use(express.static("views"));  // Menyajikan file statis dari folder views

// Menambahkan route untuk mengakses index.html di folder views
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './views' });  // Pastikan file index.html ada di folder views
});

app.use('/api', apirouter);

app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT, 'green'));
});

module.exports = app;
