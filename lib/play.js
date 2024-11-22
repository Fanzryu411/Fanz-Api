const { ytmp3, ytmp4 } = require("ruhend-scraper");
const fetch = require("node-fetch");
const ytSearch = require("yt-search");

// Fungsi untuk mencari video YouTube berdasarkan query
const searchYouTube = async (query) => {
    try {
        let results = await ytSearch(query);
        if (!results || results.videos.length === 0) {
            throw new Error("Video tidak ditemukan.");
        }
        return results.videos[0];
    } catch (error) {
        console.error("Error mencari video:", error.message);
        throw new Error("Gagal mencari video YouTube.");
    }
};

// Fungsi untuk mengunduh audio dari YouTube
const downloadAudio = async (url) => {
    try {
        let { audio, title, thumbnail } = await ytmp3(url);
        if (!audio || !title || !thumbnail) {
            throw new Error("Data audio tidak valid.");
        }
        let thumbBuffer = await (await fetch(thumbnail)).buffer();
        return { audio, title, thumbnail: thumbBuffer.toString("base64") };
    } catch (error) {
        console.error("Error mengunduh audio:", error.message);
        throw new Error("Gagal mengunduh audio.");
    }
};

// Fungsi untuk mengunduh video dari YouTube
const downloadVideo = async (url) => {
    try {
        let { video } = await ytmp4(url);
        if (!video) {
            throw new Error("Data video tidak valid.");
        }
        return video;
    } catch (error) {
        console.error("Error mengunduh video:", error.message);
        throw new Error("Gagal mengunduh video.");
    }
};

// Ekspor modul
module.exports = { searchYouTube, downloadAudio, downloadVideo };
