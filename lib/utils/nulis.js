const needle = require('needle')
const _ = require('lodash')
const fetch = require('node-fetch')

const Nulis = (text) => new Promise((resolve, reject) => {
    let url = 'http://salism3.pythonanywhere.com/write?text='
    
    // Check if text is provided
    if (typeof text === 'undefined') { 
        reject('masukan text nya kak.')
        return; // Exit if no text is provided
    }

    // Remove '#' characters from the text if they exist
    if (text.indexOf('#') > -1) { 
        text = text.replace(/\#/g, '') 
    }

    // Make the HTTP request
    needle(url + text, (err, resp, body) => {
        if (err) {
            reject('kayaknya error')
            return; // Exit if there's an error in the request
        }

        // Ensure the 'images' property exists in the response
        if (body && body.images && body.images.length > 0) {
            resolve(body.images[0])
        } else {
            reject('Gagal mendapatkan gambar')
        }
    })
})

// Example usage with process arguments
Nulis(process.argv.slice(2).join(' ')).then(data => {
    console.log(data)  // This will log the image URL or other relevant data
}).catch(err => {
    console.log(err)  // This will log the error message if something goes wrong
})

module.exports = Nulis
