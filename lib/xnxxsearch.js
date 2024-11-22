const fetch = require("node-fetch");
const cheerio = require("cheerio");

async function xnxxSearch(query) {
    return new Promise((resolve, reject) => {
        const baseUrl = "https://www.xnxx.com";
        const randomPage = Math.floor(3 * Math.random()) + 1;

        fetch(`${baseUrl}/search/${query}/${randomPage}`, { method: "get" })
            .then((res) => res.text())
            .then((html) => {
                const $ = cheerio.load(html);
                const results = [];

                // Scraping data
                $("div.mozaique").each(function () {
                    $(this)
                        .find("div.thumb")
                        .each(function () {
                            const link = baseUrl + $(this).find("a").attr("href").replace("/THUMBNUM/", "/");
                            const title = $(this).find("a").attr("title");
                            const info = $(this).siblings(".thumb-under").find("p.metadata").text();

                            results.push({
                                title,
                                link,
                            });
                        });
                });

                resolve({ status: true, result: results });
            })
            .catch((err) => {
                reject({ status: false, message: "Scraping failed", error: err });
            });
    });
}

module.exports = xnxxSearch;
