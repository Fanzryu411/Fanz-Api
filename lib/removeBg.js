const axios = require('axios');
const formData = require('form-data');

const apii = axios.create({
    baseURL: 'https://api4g.iloveimg.com'
});

// Mendapatkan taskId dari iloveimg
const getTaskId = async () => {
    const { data: html } = await axios.get('https://www.iloveimg.com/id/hapus-latar-belakang');
    apii.defaults.headers.post['authorization'] = `Bearer ${html.match(/ey[a-zA-Z0-9?%-_/]+/g)[1]}`;
    return html.match(/taskId = '(\w+)/)[1];
};

// Upload gambar ke server
const uploadImageToServer = async (imageBuffer) => {
    const taskId = await getTaskId();
    const fileName = Math.random().toString(36).slice(2) + '.jpg';
    const form = new formData();
    form.append('name', fileName);
    form.append('chunk', '0');
    form.append('chunks', '1');
    form.append('task', taskId);
    form.append('preview', '1');
    form.append('file', imageBuffer, fileName);

    const reqUpload = await apii.post('/v1/upload', form, {
        headers: form.getHeaders()
    }).catch(e => e.response);

    if (reqUpload.status !== 200) throw reqUpload.data || reqUpload.statusText;

    return { serverFilename: reqUpload.data.server_filename, taskId };
};

// Hapus latar belakang
const removeBg = async (imageBuffer, responseType = 'arraybuffer') => {
    const { serverFilename, taskId } = await uploadImageToServer(imageBuffer);

    const form = new formData();
    form.append('task', taskId);
    form.append('server_filename', serverFilename);

    const reqRmbg = await apii.post('/v1/removebackground', form, {
        headers: form.getHeaders(),
        responseType
    }).catch(e => e.response);

    if (reqRmbg.status !== 200 || !/image/.test(reqRmbg.headers['content-type']))
        throw new Error(reqRmbg.data?.error?.message || 'An error occurred');

    return reqRmbg.data;
};

module.exports = {
    removeBg
};
