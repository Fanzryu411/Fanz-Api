const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Fungsi untuk melakukan scraping data video dari URL.
 * @param {string} url - URL video yang akan di-scrape.
 * @returns {Promise<object>} - Objek hasil scraping.
 */
async function xnxxdownload(url) {
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'get' })
      .then((response) => response.text())
      .then((html) => {
        const $ = cheerio.load(html, { xmlMode: false });

        const title = $('meta[property="og:title"]').attr('content');
        const duration = $('meta[property="og:duration"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');
        const videoType = $('meta[property="og:video:type"]').attr('content');
        const videoWidth = $('meta[property="og:video:width"]').attr('content');
        const videoHeight = $('meta[property="og:video:height"]').attr('content');
        const info = $('span.metadata').text().trim();
        const scriptContent = $('#video-player-bg > script:nth-child(6)').html();

        const files = {
          low: (scriptContent.match("html5player.setVideoUrlLow\\('(.*?)'\\);") || [])[1],
          high: scriptContent.match("html5player.setVideoUrlHigh\\('(.*?)'\\);")[1],
          HLS: scriptContent.match("html5player.setVideoHLS\\('(.*?)'\\);")[1],
          thumb: scriptContent.match("html5player.setThumbUrl\\('(.*?)'\\);")[1],
          thumb69: scriptContent.match("html5player.setThumbUrl169\\('(.*?)'\\);")[1],
          thumbSlide: scriptContent.match("html5player.setThumbSlide\\('(.*?)'\\);")[1],
          thumbSlideBig: scriptContent.match("html5player.setThumbSlideBig\\('(.*?)'\\);")[1],
        };

        resolve({
          status: true,
          title,
          URL: url,
          duration,
          image,
          videoType,
          videoWidth,
          videoHeight,
          info,
          files,
        });
      })
      .catch((error) => reject({ status: false, result: error.message }));
  });
}

module.exports = { xnxxdownload };
