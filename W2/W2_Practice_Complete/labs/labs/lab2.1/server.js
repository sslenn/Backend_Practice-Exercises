// Lab2.1: The "Ping" Server
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('A request was received!');
  res.end('Pong');
});

server.listen(3000, () => {
  console.log('Warm-up 1 running on http://localhost:3000');
});
