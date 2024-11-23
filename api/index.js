const express = require("express");
const path = require("path");
const app = express();

// Menyajikan file statis dari folder views
app.use(express.static(path.join(__dirname, "views")));

// Rute untuk mengarahkan ke index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Menjalankan server pada port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
