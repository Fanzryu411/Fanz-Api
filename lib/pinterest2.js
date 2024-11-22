const gis = require('g-i-s'); // Sesuaikan dengan library yang digunakan untuk pencarian gambar

// Fungsi untuk mengambil gambar dari Pinterest
async function pinterest2(query) {
  return new Promise((resolve, reject) => {
    let err = { status: 404, message: "Terjadi kesalahan" };
    gis({ searchTerm: query + " site:id.pinterest.com" }, (er, res) => {
      if (er) return reject(err); // Menggunakan reject di sini
      let hasil = {
        status: 200,
        creator: "chibot",
        result: [],
      };
      res.forEach((x) => hasil.result.push(x.url)); // Menambahkan URL gambar ke hasil
      resolve(hasil); // Menyelesaikan promise dengan hasil gambar
    });
  });
}

module.exports = {
  pinterest2
};
