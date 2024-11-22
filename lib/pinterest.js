const fetch = require("node-fetch");
const cheerio = require("cheerio");

const URL_REGEX = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;

/**
 * Fungsi untuk mengambil gambar dari Pinterest atau URL lain
 * @param {string} query - Query pencarian atau URL
 * @param {number} numImages - Jumlah gambar yang ingin diambil
 * @returns {Promise<string[]>} - Array URL gambar
 */
async function ambilGambarPinterest(query, numImages = 1) {
    if (query.match(URL_REGEX)) {
        // Jika query adalah URL
        const res = await fetch("https://www.expertsphp.com/facebook-video-downloader.php", {
            method: "POST",
            body: new URLSearchParams({ url: query }),
        });
        const $ = cheerio.load(await res.text());
        const data = $("table.table.table-condensed.table-striped.table-bordered")
            .find("a")
            .attr("href");

        if (!data) throw new Error("Tidak bisa mengunduh postingan :/");
        return [data];
    } else {
        // Jika query adalah pencarian Pinterest
        const res = await fetch(
            `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`
        );
        const json = await res.json();
        const data = json.resource_response.data.results;

        if (!data.length) throw new Error(`Query "${query}" tidak ditemukan :/`);

        // Mengembalikan URL gambar sesuai jumlah yang diminta
        return data
            .slice(0, numImages)
            .map((item) => (item.images && item.images.orig ? item.images.orig.url : null))
            .filter((url) => url); // Menghapus nilai null
    }
}

module.exports = { ambilGambarPinterest };
