// server.js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(`Received ${method} request for ${url}`);

  // Handle POST request for /contact
  if (url === "/contact" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const rawName = new URLSearchParams(body).get("name");
      const name = rawName ? rawName.trim() : "null";

      fs.appendFile("submissions.txt", name + "\n", (err) => {
        if (err) {
          console.error("Error saving name:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("Internal Server Error");
        }
        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end(`Thank you, ${name}! Your name has been saved.`);
      });
    });

    return;
  }

  // Only handle GET requests through the switch
  if (method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    return res.end("405 Method Not Allowed");
  }

  switch (url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(`
        <html>
          <head><title>Home</title></head>
          <body>
            <h1>Welcome to the Home Page</h1>
            <p>This is a simple Node.js server.</p>
          </body>
        </html>
      `);

    case "/about":
      res.writeHead(200, { "Content-Type": "text/plain" });
      return res.end("About us: at CADT, we love node.js!");

    case "/contact-us":
      res.writeHead(200, { "Content-Type": "text/plain" });
      return res.end("You can reach us via email...");

    case "/contact":
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(`
        <html>
          <head><title>Contact</title></head>
          <body>
            <h1>Contact Form</h1>
            <form action="/contact" method="POST">
              <label for="name">Enter your name:</label>
              <input type="text" id="name" name="name" />
              <button type="submit">Submit</button>
            </form>
          </body>
        </html>
      `);

    case "/products":
      res.writeHead(200, { "Content-Type": "text/plain" });
      return res.end("Buy one get one...");

    case "/projects":
      res.writeHead(200, { "Content-Type": "text/plain" });
      return res.end("Here are our awesome projects");

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
