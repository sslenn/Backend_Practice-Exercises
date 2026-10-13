// Lab2.5: Text vs. HTML (Response Headers)
const http = require('http');

const server = http.createServer((req, res) => {
  // TASK: switch between 'text/plain' and 'text/html' and observe
  res.setHeader('Content-Type', 'text/html'); // <-- changed from 'text/plain'
  res.write('<h1>Hello!</h1><p>Is this rendered as HTML?</p>');
  res.end();
});

server.listen(3000);
