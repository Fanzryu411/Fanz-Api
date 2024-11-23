import cors from 'cors';
import sslRedirect from 'ssl-express-www';
import path from 'path';
import { color } from '../lib/color.js';  // Pastikan path-nya sesuai
import mainrouter from '../routes/main';
import apirouter from '../routes/api';

export default function handler(req, res) {
  // Enable trust proxy and set JSON formatting
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;

  // Implement CORS
  cors()(req, res, () => {});

  // Force SSL redirection (secure)
  sslRedirect()(req, res, () => {});

  // Static files serving (public folder)
  if (req.method === 'GET' && req.url.startsWith('/public/')) {
    const filePath = path.join(process.cwd(), 'public', req.url.split('/public/')[1]);
    res.sendFile(filePath);
    return;
  }

  // Route handling
  if (req.url === '/' && req.method === 'GET') {
    mainrouter(req, res);
  } else if (req.url.startsWith('/api') && req.method === 'GET') {
    apirouter(req, res);
  } else {
    res.status(404).json({ error: 'Not Found' });
  }

  console.log(color("Server running on port " + process.env.PORT || 3000, 'green'));
}
