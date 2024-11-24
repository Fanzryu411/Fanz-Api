const path = require('path');
const express = require('express');
const router = express.Router();

// Middleware untuk melayani file statis dari folder "public"
router.use(express.static(path.join(process.cwd(), 'public')));

// Rute untuk file HTML
router.get('/', (req, res) => {
    const filePath = path.join(process.cwd(), 'views', 'index.html');
    res.sendFile(filePath);
});

// Rute untuk konfigurasi JSON
router.get('/config', (req, res) => {
    const config = {
        status: true,
        result: {
            prefix: '/',
            namabot: 'Fanz-AI',
            namaowner: 'FanzOffc',
            instagram: '-',
            youtube: '-',
        },
    };

    res.json(config);
});

module.exports = router;
