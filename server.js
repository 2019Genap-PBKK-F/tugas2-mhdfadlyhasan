var http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Selamat Datang');
});

server.listen(8014, '10.199.14.46', () => {
});
