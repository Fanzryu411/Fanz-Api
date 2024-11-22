const videy = {
  async convert(url) {
    const param = this.getName('id', url);
    if (!param) {
      return {
        status: false,
        code: 400,
        message: 'Parameter "id" tidak ditemukan dalam URL.',
      };
    }

    // Logika pengaturan fileType dan mimeType
    const fileType = param[8] === '2' ? '.mov' : '.mp4';
    const mimeType = param[8] === '2' ? 'video/quicktime' : 'video/mp4';
    const videoLink = `https://cdn.videy.co/${param}${fileType}`;

    return {
      status: true,
      code: 200,
      mimeType,
      link: videoLink,
    };
  },

  getName(key, url) {
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get(key);
  },
};

module.exports = videy;