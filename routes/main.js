const path = require('path');
const express = require('express');
const router = express.Router();

// Middleware untuk melayani file statis dari folder "public"
router.use(express.static(path.join(process.cwd(), 'public')));

// Rute untuk file HTML
router.get('/', (req, res) => {
    const filePath = path.join(process.cwd(), 'views', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error loading index.html:', err.message);
            res.status(500).send('Internal Server Error');
        }
    });
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

// Middleware untuk menangani rute yang tidak ada
router.use((req, res) => {
    res.status(404).json({
        status: false,
        message: 'Endpoint not found',
    });
});

module.exports = router;
