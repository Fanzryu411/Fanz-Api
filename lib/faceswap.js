const axios = require('axios');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const FormData = require('form-data');

const swapface = {
  create: async (target, source) => {
    let targetImg, sourceImg;

    const request = async (image, prefix) => {
      if (typeof image === 'string' && image.startsWith('http')) {
        const response = await axios.get(image, { responseType: 'arraybuffer' });
        return await sb2f(response.data, fn(`${prefix}.jpg`));
      } else if (Buffer.isBuffer(image)) {
        return await sb2f(image, fn(`${prefix}.jpg`));
      } else {
        return image;
      }
    };

    targetImg = await request(target, 'target');
    sourceImg = await request(source, 'source');

    const formData = new FormData();
    formData.append('target_image_file', fs.createReadStream(targetImg));
    formData.append('target_face_file', fs.createReadStream(sourceImg));

    const config = {
      headers: {
        'authority': 'aifaceswapper.io',
        'accept': '*/*',
        'content-type': 'multipart/form-data; boundary=' + formData.getBoundary(),
        'origin': 'https://aifaceswapper.io',
        'referer': 'https://aifaceswapper.io/id',
        'authorization': token(),
        'user-agent': 'Postify/1.0.0',
      },
    };

    try {
      const response = await axios.post(
        'https://aifaceswapper.io/api/nicefish/fs/singleface',
        formData,
        config
      );
      const requestId = response.data.data.request_id;

      let result;
      let status = 'waiting';
      while (status === 'waiting') {
        const resultx = await axios.get(
          `https://aifaceswapper.io/api/nicefish/fs/result?request_id=${requestId}`,
          config
        );
        status = resultx.data.data.status;
        process.stdout.write(`\r Status: ${status} `);

        if (status === 'waiting') {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          result = resultx.data;
          process.stdout.write('\n');
        }
      }

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      if (targetImg !== target) {
        fs.unlinkSync(targetImg);
      }
      if (sourceImg !== source) {
        fs.unlinkSync(sourceImg);
      }
    }
  },
};

async function sb2f(buffer, filename) {
  const filePath = path.join(__dirname, filename);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
}

function fn(extension) {
  const rb = crypto.randomBytes(8);
  const rs = rb.toString('hex');
  return `${rs}.${extension}`;
}

function token() {
  const ts = Date.now().toString(16).slice(0, 8);
  const pea = [1, 2, 3]
    .map(() => Math.random().toString(16).slice(2, 6))
    .join('-') + Math.random().toString(16).slice(2, 5);
  return `${ts}-${pea}`;
}

module.exports = { swapface };
