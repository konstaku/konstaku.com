const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();
const html = fs.readFileSync('index.html', 'utf8');

const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/konstaku.com/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/konstaku.com/fullchain.pem'),
};

app.get('/', (req, res) => {
	res.send(html);
});

app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    console.log('Inbound http connection, redirecting to https...');
    res.redirect('https://' + req.headers.host + req.url);
  }
});

http.createServer((req, res) => {
	res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
	res.end();
}).listen(80);

const server = https.createServer(options, app).listen(443, '142.93.102.96', () => {
	console.log('Server running on port 443');
});

server.on('error', err => {
	console.error('Failed to start server', err);
});
