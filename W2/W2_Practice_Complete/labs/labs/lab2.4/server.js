// Lab2.4: Setting the Vibe (Status Codes)
const http = require('http');

const server = http.createServer((req, res) => {
  // TASK: change 200 to 404 and observe the browser Network tab
  res.statusCode = 400;           // <-- changed from 200 to 404
  res.end('Status Code is set to 400');
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
