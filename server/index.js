const express = require('express');
const cors = require('cors');
const { v4: generateId } = require('uuid');
const server = express();

server.use(cors());
server.use(express.json());

server.use((req, res, next) => {
  const logTime = new Date().toISOString();
  console.log(`[${logTime}] ${req.method} -> ${req.originalUrl}`);
  next();
});

const storedLinks = {};
const visitLogs = {};

server.post('/shorturls', (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const code = shortcode || generateId().slice(0, 6);
  const createdOn = new Date();
  const expiresAt = new Date(createdOn.getTime() + validity * 60000);

  storedLinks[code] = { targetUrl: url, expiresAt, createdOn };
  visitLogs[code] = [];

  return res.status(201).json({
    shortLink: `http://localhost:5000/${code}`,
    expiry: expiresAt.toISOString(),
  });
});

server.get('/shorturls/:code', (req, res) => {
  const code = req.params.code;
  const record = storedLinks[code];

  if (!record) {
    return res.status(404).json({ error: 'Shortcode does not exist' });
  }

  // ✅ Auto-increment on stats fetch
  visitLogs[code].push({
    time: new Date().toISOString(),
    referrer: req.get('Referrer') || 'Direct',
    ip: req.ip || 'Unknown',
  });

  return res.json({
    totalVisits: visitLogs[code].length,
    originalUrl: record.targetUrl,
    createdAt: record.createdOn.toISOString(),
    expiry: record.expiresAt.toISOString(),
    logs: visitLogs[code],
  });
});

server.get('/:code', (req, res) => {
  const code = req.params.code;
  const record = storedLinks[code];

  if (!record) return res.status(404).send('Shortcode not found');
  if (new Date() > new Date(record.expiresAt)) return res.status(410).send('This link has expired');

  visitLogs[code].push({
    time: new Date().toISOString(),
    referrer: req.get('Referrer') || 'Direct',
    ip: req.ip || 'Unknown',
  });

  return res.redirect(record.targetUrl);
});

server.listen(5000, () => {
  console.log('🚀 Server is active at http://localhost:5000');
});
