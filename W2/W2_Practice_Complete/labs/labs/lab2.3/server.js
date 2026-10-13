// Lab2.3: Inspecting the Guest (The req Object)
const http = require('http');

const server = http.createServer((req, res) => {
  // Log the URL and HTTP method of every incoming request
  console.log('req.url    :', req.url);
  console.log('req.method :', req.method);

  res.end('Check your terminal to see the request details.');
});

server.listen(3002, () => {
  console.log('Server listening on http://localhost:3002');
});
