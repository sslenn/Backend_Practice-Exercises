// Lab2.6: The Live Clock (Dynamic Content)
const http = require('http');

const server = http.createServer((req, res) => {
  // This line runs fresh on EVERY request — that's why the time updates!
  const currentTime = new Date().toLocaleTimeString();

  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Server Time</h1>');
  res.write(`<p>The current time is: ${currentTime}</p>`);
  res.end();
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
