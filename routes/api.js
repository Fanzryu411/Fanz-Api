__path = process.cwd()

var express = require('express');
var db = require(__path + '/database/db');
try {
var fanz = db.get("fanz");
} catch (e) {
	console.log('')
}

var creatorList = ['@FanzOffc'];
var creator = creatorList[Math.floor(Math.random() * creatorList.length)];

var ytdl = require('ytdl-core');
var ytpl = require('ytpl');
var secure = require('ssl-express-www');
var cors = require('cors');
var scrapeYt = require("scrape-yt");
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
//var TikTokScraper = require('tiktok-scraper');
const { tikdown } = require("nayan-media-downloader");
const { removeBg } = require('../lib/removeBg');
const { Doodstream } = require('../lib/doodstream');
const { swapface } = require('../lib/faceswap');
const { xnxxdownload } = require('../lib/xnxxdl');
const xnxxSearch = require("../lib/xnxxsearch");
const { searchYouTube, downloadAudio, downloadVideo } = require("../lib/play");
const videy = require('../lib/videy');
const { ambilGambarPinterest } = require("../lib/pinterest");
const { pinterest2 } = require('../lib/pinterest2');
const gemini = require('../lib/gemini');
const axios = require('axios');
var router  = express.Router();

var { color, bgcolor } = require(__path + '/lib/color.js');
var options = require(__path + '/lib/options.js');
var {
	Nulis,
	Vokal,
	Base
} = require('./../lib');
var cookie = "HSID=A7EDzLn3kae2B1Njb;SSID=AheuwUjMojTWvA5GN;APISID=cgfXh13rQbb4zbLP/AlvlPJ2xBJBsykmS_;SAPISID=m82rJG4AC9nxQ5uG/A1FotfA_gi9pvo91C;__Secure-3PAPISID=m82rJG4AC9nxQ5uG/A1FotfA_gi9pvo91C;VISITOR_INFO1_LIVE=RgZLnZtCoPU;LOGIN_INFO=AFmmF2swRQIhAOXIXsKVou2azuz-kTsCKpbM9szRExAMUD-OwHYiuB6eAiAyPm4Ag3O9rbma7umBK-AG1zoGqyJinh4ia03csp5Nkw:QUQ3MjNmeXJ0UHFRS3dzaTNGRmlWR2FfMDRxa2NRYTFiN3lfTEdOVTc4QUlwbUI4S2dlVngxSG10N3ZqcHZwTHBKano5SkN2dDlPSkhRMUtReE42TkhYeUVWS3kyUE1jY2I1QzA1MDZBaktwd1llWU9lOWE4NWhoZV92aDkxeE9vMTNlcG1uMU9rYjhOaDZWdno2ZzN3TXl5TVNhSjNBRnJaMExrQXpoa2xzRVUteFNWZDI5S0Fn;PREF=app=desktop&f4=4000000&al=id;SID=2wezCMTUkWN3YS1VmS_DXaEU84J0pZIQdemM8Zry-uzWm8y1njBpLTOpxSfN-EaYCRSiDg.;YSC=HCowA1fmvzo;__Secure-3PSID=2wezCMTUkWN3YS1VmS_DXaEU84J0pZIQdemM8Zry-uzWm8y1dajgWzlBh9TgKapGOwuXfA.;SIDCC=AJi4QfFK0ri9fSfMjMQ4tOJNp6vOb9emETXB_nf2S05mvr2jBlmeEvlSsQSzPMuJl_V0wcbL1r8;__Secure-3PSIDCC=AJi4QfGeWHx-c4uTpU1rXCciO1p0s2fJWU07KrkZhWyD1Tqi8LyR-kHuBwHY9mViVYu1fRh2PA";

loghandler = {
    notparam: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter apikey',
        getApikey: 'gak punya apikey? chat gw aja yaaa di wa.me/62858123730111 , key nya gratis kok gan, jadi santuyy ajaa'
    },
    notkey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter key'
    },
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter url'
    },
    notkata: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter kata'
    },
    nottext: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text'
    },
    nottext2: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text2'
    },
    nottext3: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text3'
    },
    nottheme: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter theme'
    },
    notusername: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter username'
    },
    notvalue: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter value'
    },
    notheme: {
    	status: false,
        creator: `${creator}`,
        code: 406,
        message: 'theme tidak tersedia silahkan masukkan texmaker/list atau baca documentasi'
     },
    invalidKey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'apikey invalid, gak punya apikey? chat gw aja yaaa di wa.me/62858123730111 , key nya gratis kok gan, jadi santuyy ajaa'
    },
    invalidlink: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin link anda tidak valid.'
    },
    invalidkata: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin kata tidak ada dalam api.'
    },
    notAddApiKey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter status, apikeyInput, email, nomorhp, name, age, country, exp'
    },
    error: {
        status: false,
        creator: `${creator}`,
        message: 'mungkin sedang dilakukan perbaikan'
    }
}

var len = 15
        var arr = '123456789abcdefghijklmnopqrstuvwxyz'
        var random = '';

        for (var i = len; i > 0; i--) {
            random += arr[Math.floor(Math.random() * arr.length)];
        }

        var lenn = 5
        var randomlagi = '';

        for (var i = lenn; i > 0; i--) {
            randomlagi += arr[Math.floor(Math.random() * arr.length)];
        }

        var randomTextNumber = random+randomlagi+'---------FanzOffc'+'FANZ--AI';
        
 
 async function cekApiKey(api) {
 	ap = await fanz.findOne({apikey:api})
 return ap;
 }
router.get('/find', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.notparam)
    if (apikey != 'FanzOffc') return res.json(loghandler.invalidKey)

    try {
        fanz.find()
            .then(result => {
                res.json({
                    status: true,
                    creator: `${creator}`,
                    result
                })
        })
    } catch (e) {
        console.log(e)
        res.json(loghandler.error)
    }
})

router.get('/cekapikey', async (req, res, next) => {
	var apikeyInput = req.query.apikey
	if(!apikeyInput) return res.json(loghandler.notparam)
	a = await cekApiKey(apikeyInput)
	if (a) {
	json = JSON.stringify({
		status: true,
		creator: creator,
		result: {
            status:a.status,
			id: a._id,
			apikey: a.apikey,
			more_info: {
				email: a.email,
				nomor_hp: a.nomor_hp,
				name: a.name,
				age: a.age,
				country: a.country,
				exp:a.exp,
			},
		},
		message: `jangan lupa follow ${creator}`
	})
} else {
	json = JSON.stringify({
		status: false
	})
}
res.send(JSON.parse(json))
})

router.get('/addapikey', (req, res, next) => {
    var apikey = req.query.apikey,
        status = req.query.status,
        apikeyInput  = req.query.apikeyInput,
        email = req.query.email,
        nomorhp = req.query.nomorhp
        name = req.query.name,
        age = req.query.age,
        country = req.query.country;
        exp = req.query.exp;

    if (!apikey) return res.json(loghandler.notparam)
    if (!(status && apikeyInput && email && nomorhp && name && age && country && exp)) return res.json(loghandler.notAddApiKey)
    if (apikey != 'FanzOffc') return res.json(loghandler.invalidKey)

    try {
        fanz.insert({
        	status: status,
            apikey: apikeyInput,
            email: email,
            nomor_hp: nomorhp,
            name: name,
            age: age,
            country: country,
            exp: exp
        })
        .then(() => {
              res.json({
                  status: true,
                  creator: `${creator}`,
                  result: 'berhasil menambah data, status : ' + status + ', apikey : ' + apikeyInput + ', email : ' + email + ', nomor_hp : ' + nomorhp + ', name :  ' + name + ', age : ' + age + ', country : ' + country + ', exp : ' + exp
              })
        })
    } catch (e) {
        console.log(e)
        res.json(loghandler.error)
    }
})

router.get('/remove', (req, res, next) => {
    var apikey = req.query.apikey,
        status = req.query.status,
        apikeyInput  = req.query.apikeyInput,
        email = req.query.email,
        nomorhp = req.query.nomorhp
        name = req.query.name,
        age = req.query.age,
        country = req.query.country;
        exp = req.query.exp;

    if (!apikey) return res.json(loghandler.notparam)
    if (!(status && apikeyInput && email && nomorhp && name && age && country && exp)) return res.json(loghandler.notAddApiKey)
    if (apikey != 'FanzOffc') return res.json(loghandler.invalidKey)

    try {
        fanz.remove({
            status: status,
            apikey: apikeyInput,
            email: email,
            nomor_hp: nomorhp,
            name: name,
            age: age,
            country: country,
            exp: exp
        })
        .then(() => {
             res.json({
                  status: true,
                  creator: `${creator}`,
                  result: 'berhasil menghapus data, status : ' + status + ', apikey : ' + apikeyInput + ', email : ' + email + ', nomor_hp : ' + nomorhp + ', name :  ' + name + ', age : ' + age + ', country : ' + country + ', exp : ' + exp
              })
        })
    } catch (e) {
        console.log(e)
        res.json(loghandler.error)
    }
})

// Route for fetching TikTok video details without watermark
/*/router.get('/tiktod', async (req, res, next) => {
    var apikeyInput = req.query.apikey,
        url = req.query.url;

    if (!apikeyInput) return res.json(loghandler.notparam);
    if (apikeyInput !== 'FanzOffc') return res.json(loghandler.invalidKey);
    if (!url) return res.json(loghandler.noturl);

    try {
        // Fetch TikTok video data using tikdown
        let result = await tikdown(url);

        // Destructure the required data
        let { view, comment, play, share, duration, title, video, audio } = result.data;

        // Send the video URL and metadata in the response
        res.json({
            status: true,
            creator: `${creator}`,
            message: "Video fetched successfully",
            data: {
                title,
                view,
                comment,
                play,
                share,
                duration,
                video_url: video,
                audio_url: audio
            }
        });

        // You can also use a messaging library to send the message with the video if needed
        // conn.sendMessage(m.chat, { video: { url: video }, caption: title }, { quoted: m });

    } catch (err) {
        console.error(err);
        res.json(loghandler.invalidlink);
    }
});*/

// Route to stalk TikTok user profile
/*/router.get('/tiktod/stalk', async (req, res, next) => {
    var apikeyInput = req.query.apikey,
        username = req.query.username;

    if (!apikeyInput) return res.json(loghandler.notparam);
    if (apikeyInput !== 'FanzOffc') return res.json(loghandler.invalidKey);
    if (!username) return res.json(loghandler.notusername);

    try {
        // Fetch user profile data using tikdown
        let user = await tikdown(username);

        // Return the user profile data
        res.json({
            status: true,
            creator: `${creator}`,
            result: user.data
        });
    } catch (err) {
        console.error(err);
        res.json({
            status: false,
            creator: `${creator}`,
            message: "Error, mungkin username anda tidak valid"
        });
    }
});*/

router.get("/gemini", async (req, res) => {
  const { apikey, query } = req.query;

  // Validasi parameter
  if (!apikey) return res.json(loghandler.notparam);
  if (apikey !== "FanzOffc") return res.json(loghandler.invalidKey);
  if (!query) return res.json({ status: false, creator, message: "Masukkan parameter query." });

  try {
    const options = {
      messages: [{ role: "user", content: query }],
    };
    const response = await gemini(options);

    if (response.success) {
      return res.json({
        status: true,
        creator: `${creator}`,
        message: response.answer,
      });
    } else {
      return res.json({
        status: false,
        creator: `${creator}`,
        message: "Gagal mendapatkan respons.",
        errors: response.errors,
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      creator: `${creator}`,
      message: "Terjadi kesalahan.",
      error: error.message,
    });
  }
});

router.get("/pinterest2", async (req, res) => {
  const { apikey, query, numImages } = req.query;

  // Validasi parameter
  if (!apikey) return res.json(loghandler.notparam);
  if (apikey !== "FanzOffc") return res.json(loghandler.invalidKey);
  if (!query) return res.json({ status: false, message: "Masukkan parameter query." });
  if (!numImages || isNaN(numImages) || numImages <= 0) {
    return res.json({ status: false, message: "Masukkan parameter numImages yang valid (angka > 0)." });
  }

  try {
    // Mengambil gambar berdasarkan query dan jumlah gambar yang diminta
    const imagesResult = await pinterest2(query);

    // Membatasi jumlah gambar yang dikembalikan sesuai dengan parameter numImages
    const limitedImages = imagesResult.result.slice(0, parseInt(numImages));

    // Mengembalikan respons sesuai format yang diminta, termasuk jumlah gambar
    res.json({
      status: true,
      creator: creator,
      numImages: limitedImages.length, // Menambahkan jumlah gambar yang diambil
      result: limitedImages,
    });
  } catch (error) {
    // Jika terjadi error, memberikan pesan error dan status false
    res.json({
      status: false,
      creator: creator,
      message: error.message,
    });
  }
});

router.get("/pinterest", async (req, res) => {
    const { apikey, query, numImages } = req.query;

    // Validasi parameter
    if (!apikey) return res.json(loghandler.notparam);
    if (apikey !== "FanzOffc") return res.json(loghandler.invalidKey);
    if (!query) return res.json({ status: false, creator, message: "Masukkan parameter query." });
    if (!numImages || isNaN(numImages) || numImages <= 0) {
        return res.json({ status: false, creator, message: "Masukkan parameter numImages yang valid (angka > 0)." });
    }

    try {
        // Mengambil gambar berdasarkan query dan jumlah gambar yang diminta
        const images = await ambilGambarPinterest(query, parseInt(numImages));

        // Mengembalikan respons sesuai format yang diminta, termasuk jumlah gambar
        res.json({
            status: true,
            creator: creator,
            numImages: images.length, // Menambahkan jumlah gambar yang diambil
            result: images,
        });
    } catch (error) {
        // Jika terjadi error, memberikan pesan error dan status false
        res.json({
            status: false,
            creator: creator,
            message: error.message,
        });
    }
});

router.get('/videy', async (req, res) => {
  const apikeyInput = req.query.apikey;
  const url = req.query.url;

  // Validasi parameter
  if (!apikeyInput) return res.json(loghandler.notparam);
    if (apikeyInput !== 'FanzOffc') return res.json(loghandler.invalidKey);
    if (!url) return res.json(loghandler.noturl);

  try {
    // Gunakan fungsi scraper
    const result = await videy.convert(url);

    // Jika status sukses, pastikan data disusun dengan benar
    if (result.status) {
      return res.json({
        status: true,
        creator: `${creator}`,
        code: result.code,
        data: {
          mimeType: result.mimeType, // Properti mimeType
          link: result.link, // Properti link
        },
      });
    }

    // Respons error jika result.status === false
    res.json({
      status: false,
      creator: `${creator}`,
      code: result.code,
      message: result.message,
    });
  } catch (err) {
        console.error(err);
        res.json(loghandler.invalidlink);
    }
});

router.get("/play", async (req, res) => {
    const { apikey, query } = req.query;

    // Validasi parameter
    if (!apikey) return res.json(loghandler.notparam);
    if (apikey !== "FanzOffc") return res.json(loghandler.invalidKey);
    if (!query) return res.json({ status: false, creator, message: "Masukkan parameter query." });

    try {
        // Panggil fungsi pencarian dari modul scrape.js
        let video = await searchYouTube(query);
        let { title, thumbnail, videoId } = video;
        let url = "https://youtu.be/" + videoId;

        // Panggil fungsi untuk mengunduh audio dan video
        let audioData = await downloadAudio(url);
        let videoUrl = await downloadVideo(url);

        // Kirim respons
        res.json({
            status: true,
            creator,
            result: {
                title,
                url,
                audio: {
                    url: audioData.audio,
                    fileName: `${audioData.title}.mp3`,
                },
                video: {
                    url: videoUrl,
                    fileName: `${title}.mp4`,
                },
                thumbnail: `data:image/jpeg;base64,${audioData.thumbnail}`,
            },
        });
    } catch (err) {
        console.error(err);
        res.json(loghandler.error)
    }
});

router.get('/xnxxdl', async (req, res) => {
  const apikeyInput = req.query.apikey;
  const url = req.query.url;
  
  if (!apikeyInput) return res.json(loghandler.notparam);
    if (apikeyInput !== 'FanzOffc') return res.json(loghandler.invalidKey);
    if (!url) return res.json(loghandler.noturl);
    
    try {
    const result = await xnxxdownload(url);
    res.json({
      status: true,
      creator: creator,
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      creator: creator,
      message: error.result || 'Terjadi kesalahan.',
    });
  }
});

router.get("/xnxxsearch", async (req, res) => {
    const { apikey, query } = req.query;

    // Validasi parameter
    if (!apikey) return res.json(loghandler.notparam);
    if (apikey !== "FanzOffc") return res.json(loghandler.invalidKey);
    if (!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

    try {
        const result = await xnxxSearch(query);
        res.json({
            status: true,
            creator: creator,
            data: result,
        });
    } catch (error) {
        res.json({
            status: false,
            creator: creator,
            message: error.message || "Terjadi kesalahan.",
        });
    }
});

// Definisikan route untuk faceswap
router.get('/faceswap', async (req, res) => {
  const apikeyInput = req.query.apikey;
  const target = req.query.target;
  const source = req.query.source;

  // Validasi parameter
  if (!apikeyInput) return res.json(loghandler.notparam);
  if (apikeyInput !== 'FanzOffc') return res.json(loghandler.invalidKey);
  if (!target) return res.json({ status: false, message: 'Target image URL is required' });
  if (!source) return res.json({ status: false, message: 'Source image URL is required' });

  try {
    // Panggil fungsi face swap
    const result = await swapface.create(target, source);

    if (result && result.data) {
      const { user_id, result_img_url, status } = result.data;
      return res.json({
        status: true,
        creator: 'FanzOffc',
        user_id,
        result_img_url
      });
    } else {
      return res.json({ status: false, message: 'Failed to process face swap or invalid response' });
    }
  } catch (error) {
    return res.json({ status: false, message: 'Error during face swap', error: error.message });
  }
});

router.get('/doods', async (req, res) => {
    try {
        const apikeyInput = req.query.apikey;
        const url = req.query.url;

        // Validasi parameter
        if (!apikeyInput) return res.json(loghandler.notparam);
        if (apikeyInput !== 'FanzOffc') return res.json(loghandler.invalidKey);
        if (!url) return res.json(loghandler.noturl);

        // Proses dengan fungsi Doodstream
        const result = await Doodstream(url);

        if (result.error) {
            return res.json({
                status: false,
                message: result.error,
            });
        }

        // Respon dengan hasil scraping
        res.json({
            status: true,
            message: "Berhasil mengambil data.",
            data: {
                title: result.title,
                duration: result.duration,
                size: result.size,
                uploadDate: result.uploadDate,
                directLink: result.directLink || null,
            },
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: false,
            message: "Terjadi kesalahan pada server.",
        });
    }
});

router.get('/removebg', async (req, res) => {
    var apikeyInput = req.query.apikey,
        url = req.query.url;

    if (!apikeyInput) return res.json(loghandler.notparam);
    if (apikeyInput !== 'FanzOffc') return res.json(loghandler.invalidKey);
    if (!url) return res.json(loghandler.noturl);

    try {
        // Download gambar dari URL
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary'); // Konversi gambar ke buffer

        // Proses penghapusan background
        const resultImage = await removeBg(buffer); // Sesuaikan implementasi `removeBg`

        res.json({
            status: true,
            creator: `${creator}`,
            result: {
                image: `data:image/png;base64,${resultImage.toString('base64')}`
            }
        });
    } catch (err) {
        console.error(err.message);
        res.json({
            status: false,
            creator: `${creator}`,
            message: 'Terjadi kesalahan: ' + err.message
        });
    }
});

router.get('/randomquote', (req, res, next) => {
    var apikey = req.query.apikey

    if (!apikey) return res.json(loghandler.notparam)
    if (apikey != 'FanzOffc') return res.json(loghandler.invalidKey)

    fetch(encodeURI(`https://mhankbarbar.tech/api/randomquotes`))
        .then(response => response.json())
        .then(data => {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result : {
                     author : `${data.author}`,
                     quotes : `${data.quotes}`,
                 },
                 message : `jangan lupa follow ${creator}`
             })
         })
         .catch(e => {})
})

router.get('/infonpm', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            query = req.query.query,
            host = req.hostname
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'FanzOffc') return res.json(loghandler.invalidKey)
    if (!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://registry.npmjs.org/${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result,
                 message : `jangan lupa follow ${creator}`
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/short/tiny', async (req, res, next) => {
    var apikeyInput = req.query.apikey,
        url = req.query.url

	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'FanzOffc') return res.json(loghandler.invalidKey)
     if (!url) return res.json(loghandler.noturl)

     request(`https://tinyurl.com/api-create.php?url=${url}`, function (error, response, body) {
         try {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result : {
                     link : `${body}`,
                 },
                 message : `jangan lupa follow ${creator}`
             })
         } catch (e) {
             console.log('Error :', color(e,'red'))
             res.json(loghandler.invalidlink)
         }
     })
})

router.get('/base', async (req, res, next) => {
	var type = req.query.type,
		encode = req.query.encode,
		decode = req.query.decode,
		apikeyInput = req.query.apikey;
		if (!apikeyInput) return res.json(loghandler.notparam)
		if (apikeyInput != 'FanzOffc') return res.json(loghandler.invalidKey)
		if (!type) return res.json({status: false, creator, code: 404, message: 'masukan parameter type, type yang tersedia : base64 , base32'})
		if (type == 'base64' && encode){
				Base("b64enc", encode)
				.then(result => {
					res.json({
						status:true,
						creator: `${creator}`,
						result
					})
				})
			} else if (type == 'base64' && decode){
				Base("b64dec", decode)
				.then(result => {
					res.json({
						status: true,
						creator: `${creator}`,
						result
					})
				})
			} else if (type == 'base32' && encode){
				Base('b32enc', encode)
				.then(result => {
					res.json({
						status:true,
						creator: `${creator}`,
						result
					})
				})
			} else if (type == 'base32' && decode){
				Base('b32dec', decode)
				.then(result => {
					res.json({
						status:true,
						creator: `${creator}`,
						result
					})
				})
			} else if(!(encode || decode)){
				res.json({
					status:false,
					creator: `${creator}`,
					message: "tambahkan parameter encode/decode"
				})
			} else {
				res.json(loghandler.error)
			}
})

router.get('/nulis', async (req, res, next) => {
	var text = req.query.text,
		 apikeyInput = req.query.apikey;
	if(!apikeyInput) return res.json(loghandler.notparam)
     if(apikeyInput != 'FanzOffc') return res.json(loghandler.invalidKey)
	 if(!text) return res.json(loghandler.nottext)
		Nulis(text)
		 .then(hasil => {
			fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=28dd175b555860ab2b5cdfedf125fe38&image=${hasil}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            creator : `${creator}`,
                                            message : `jangan lupa follow ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url akan hilang setelah 2 menit'
                                            }
                                        })
                                })
            })
           .catch(err => {
		  res.json(loghandler.error)
		   })
})

router.get('/textmaker', async (req, res, next) => {
        var theme = req.query.theme,
             text = req.query.text,
             text2 = req.query.text2,
             text3 = req.query.text3,
             apikeyInput = req.query.apikey;
        
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'FanzOffc') return res.json(loghandler.invalidKey)
        if (!theme) return res.json(loghandler.nottheme)
        if (theme != 'glitch' && theme != 'google-suggestion') return res.json(loghandler.notheme)
        if (!text) return res.json(loghandler.nottext)

        if (theme == 'glitch') {
        	if (!text2) return res.json(loghandler.nottext2)
            try {
            request.post({
                url: "https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&text_2=${text2}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=28dd175b555860ab2b5cdfedf125fe38&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            creator : `${creator}`,
                                            message : `jangan lupa follow ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url akan hilang setelah 2 menit'
                                            }
                                        })
                                })
                        })
                    }
                })
                } catch (e) {
                	console.log(e);
                res.json(loghandler.error)
                }
        } else if (theme == 'google-suggestion') {
        	if (!text2) return res.json(loghandler.nottext2)
        if (!text3) return res.json(loghandler.nottext3)
            request.post({
                url: "https://photooxy.com/other-design/make-google-suggestion-photos-238.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&text_2=${text2}&text_3=${text3}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=28dd175b555860ab2b5cdfedf125fe38&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            creator : `${creator}`,
                                            message : `jangan lupa follow ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url akan hilang setelah 2 menit'
                                            }
                                        })
                                })
                        })
                    }
                }) 
        } else {
            res.json(loghandler.error)
        }
})

router.get('/textmaker/game', async (req, res, next) => {
        var theme = req.query.theme,
             text = req.query.text,
             text2 = req.query.text2,
             text3 = req.query.text3,
             apikeyInput = req.query.apikey;
        
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'FanzOffc') return res.json(loghandler.invalidKey)
        if (!theme) return res.json(loghandler.nottheme)
        if (theme != 'pubg' && theme != 'battlefield') return res.json(loghandler.notheme)
        if (!text) return res.json(loghandler.nottext)

        if (theme == 'pubg') {
        	if (!text2) return res.json(loghandler.nottext2)
            try {
            request.post({
                url: "https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&text_2=${text2}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=28dd175b555860ab2b5cdfedf125fe38&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            creator : `${creator}`,
                                            message : `jangan lupa follow ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url akan hilang setelah 2 menit'
                                            }
                                        })
                                })
                        })
                    }
                })
                } catch (e) {
                	console.log(e);
                res.json(loghandler.error)
                }
        } else if (theme == 'battlefield') {
        	if (!text2) return res.json(loghandler.nottext2)
            request.post({
                url: "https://photooxy.com/fps-game-effect/create-battlefield-4-rising-effect-152.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&text_2=${text2}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=28dd175b555860ab2b5cdfedf125fe38&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            creator : `${creator}`,
                                            message : `jangan lupa follow ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url akan hilang setelah 2 menit'
                                            }
                                        })
                                })
                        })
                    }
                }) 
        } else {
            res.json(loghandler.error)
        }
})

router.get('/textmaker/senja', async (req, res, next) => {
        var theme = req.query.theme,
             text = req.query.text,
             text2 = req.query.text2,
             text3 = req.query.text3,
             apikeyInput = req.query.apikey;
        
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'FanzOffc') return res.json(loghandler.invalidKey)
        if (!theme) return res.json(loghandler.nottheme)
        if (theme != 'coffee-cup' && theme != 'coffee-cup2') return res.json(loghandler.notheme)
        if (!text) return res.json(loghandler.nottext)

        if (theme == 'coffee-cup') {
            try {
            request.post({
                url: "https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=28dd175b555860ab2b5cdfedf125fe38&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            creator : `${creator}`,
                                            message : `jangan lupa follow ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url akan hilang setelah 2 menit'
                                            }
                                        })
                                })
                        })
                    }
                })
                } catch (e) {
                	console.log(e);
                res.json(loghandler.error)
                }
        } else if (theme == 'coffee-cup2') {
            request.post({
                url: "https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=28dd175b555860ab2b5cdfedf125fe38&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            creator : `${creator}`,
                                            message : `jangan lupa follow ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url akan hilang setelah 2 menit'
                                            }
                                        })
                                })
                        })
                    }
                }) 
        } else {
            res.json(loghandler.error)
        }
})

module.exports = router
