const express = require('express');
const fs = require('fs');

const app = express();
const html = fs.readFileSync('index.html', 'utf8');

app.get('/', (req, res) => {
	res.send(html);
});

app.listen(80, () => {
	console.log('Server started on port 80');
});

