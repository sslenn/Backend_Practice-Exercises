# W2 Practice — Native HTTP and Manual Routing
## Complete Answers & Explanations

---

## Lab 2.1 — The "Ping" Server

### Completed Code

```js
// Lab2.1: server.js
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('A request was received!');
  res.end('Pong');
});

server.listen(3000, () => {
  console.log('Warm-up 1 running on http://localhost:3000');
});
```

### What to observe
- Run with `node server.js`.
- Open `http://localhost:3000` in the browser — the page shows **Pong**.
- Every time you refresh, the terminal prints `A request was received!` because `http.createServer()` fires the callback on every incoming request.

---

## Lab 2.2 — The Modern Toolkit (Apidog Setup)

No code changes needed. Steps to follow:

1. Download the Apidog desktop client from **apidog.com/download**.
2. Open Apidog (Guest mode is fine).
3. Click **+** → set method to **GET** → enter `http://localhost:3000` → click **Send**.
4. In the **Body** tab at the bottom you should see the text **Pong**.

> **Why use Apidog instead of a browser?**  
> Browsers always send GET requests and hide many details. Apidog lets you choose any HTTP method (GET, POST, PUT, DELETE), set custom headers, and inspect the full raw response — all essentials when building APIs.

---

## Lab 2.3 — Inspecting the Guest (The req Object)

### Completed Code

```js
// Lab2.3: server.js
const http = require('http');

const server = http.createServer((req, res) => {
  // Log the URL and HTTP method of every incoming request
  console.log('req.url    :', req.url);
  console.log('req.method :', req.method);

  res.end('Check your terminal to see the request details.');
});

server.listen(3000);
```

### Task answers

**What does `req.url` show when you visit `/hello-world`?**

The terminal prints:
```
req.url    : /hello-world
req.method : GET
```

`req.url` contains everything after the hostname — the path, and query string if present (e.g. `/hello-world?foo=bar`). It does **not** include the protocol or domain. This is what you will use later to decide which "page" or resource to serve.

---

## Lab 2.4 — Setting the Vibe (Status Codes)

### Completed Code

```js
// Lab2.4: server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 404;   // changed from 200
  res.end('Status Code is set to 404');
});

server.listen(3000);
```

### Task answers

**What color is the status code in the Network tab?**

After changing to `404`, the status code appears in **red** (or orange/amber depending on the browser theme) in the DevTools Network tab. A `200` code appears in green/black. This color coding helps developers quickly spot errors.

**Common status codes to know:**

| Code | Meaning |
|------|---------|
| 200 | OK — request succeeded |
| 301 | Moved Permanently — redirect |
| 400 | Bad Request — client sent bad data |
| 404 | Not Found — resource doesn't exist |
| 500 | Internal Server Error — server crashed |

---

## Lab 2.5 — Text vs. HTML (Response Headers)

### Completed Code

```js
// Lab2.5: server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html'); // changed from 'text/plain'
  res.write('<h1>Hello!</h1><p>Is this rendered as HTML?</p>');
  res.end();
});

server.listen(3000);
```

### Task answers

**With `text/plain`:** The browser displays the raw string `<h1>Hello!</h1><p>Is this rendered as HTML?</p>` — it shows the angle brackets literally.

**With `text/html`:** The browser interprets the tags and renders a large bold heading ("Hello!") followed by a paragraph. The `Content-Type` header tells the browser **how to interpret** the bytes it receives, not what the bytes actually contain.

---

## Lab 2.6 — The Live Clock (Dynamic Content)

### Completed Code

```js
// Lab2.6: server.js
const http = require('http');

const server = http.createServer((req, res) => {
  const currentTime = new Date().toLocaleTimeString(); // runs fresh each request

  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Server Time</h1>');
  res.write(`<p>The current time is: ${currentTime}</p>`);
  res.end();
});

server.listen(3000);
```

### Reflection answer

**Why does the time change even though the code didn't change?**

Because `new Date()` is a JavaScript expression that executes **at the moment each request arrives**. Node.js runs your callback function **freshly every time a request comes in**. This is the fundamental difference between a *dynamic server* (which runs code to build the response) and a *static file* (which just reads a pre-written file from disk — so its content never changes unless you edit the file manually).

---

## Lab 2.7 — ANALYZE (Bug Fix)

### The Bug

```js
return res.endd(); // ❌ Typo — 'endd' is not a function
```

### Q1 — What error do you see, and what line causes it?

When you access `http://localhost:3000` the terminal shows:

```
TypeError: res.endd is not a function
```

It is caused by line `return res.endd();`. JavaScript cannot find a method called `endd` on the response object (the correct method is `res.end()`), so it throws a `TypeError` and the request handler crashes — leaving the browser waiting with no response until it times out.

### Q2 — What is the purpose of `res.write()` and how is it different from `res.end()`?

| Method | Purpose |
|--------|---------|
| `res.write(data)` | Sends a **chunk** of the response body. Can be called multiple times to stream data piece by piece. Does **not** close the connection. |
| `res.end([data])` | Optionally sends a final chunk of data, then **signals that the response is complete** and closes the connection. Must be called exactly once per request. |

Think of `res.write()` as writing into a pipe and `res.end()` as sealing it. The browser only renders the page once the pipe is sealed.

### Q3 — What happens if `res.end()` is never called?

The browser keeps the connection open indefinitely, waiting for more data. Eventually the browser shows a "page not loading" / timeout error. On the server side, the request and response objects stay in memory and are never garbage-collected, causing a **memory leak** in long-running servers.

### Q4 — Why use `http.createServer()` instead of calling a function directly?

`http.createServer()` creates an **event-driven listener** that stays alive and fires your callback for *every* incoming TCP connection automatically. If you just called a function directly it would run once and exit — no server would be listening for connections. The Node.js event loop keeps the process running so multiple clients can connect at any time.

### Q5 — How can the server be made more resilient during development?

Several strategies:
- **Wrap handler code in try/catch** so a single bad request doesn't crash the whole server.
- **Add an `'uncaughtException'` handler** at the process level to log unexpected errors gracefully.
- **Use a process manager** like `nodemon` (for auto-restart on file changes) or `pm2` (for production restart on crash).
- **Validate all inputs** before calling methods on them.

### Fixed Code

```js
// Lab2.7: server.js — Fixed
const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello, World!');
  return res.end(); // ✅ Fixed: was res.endd()
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## Lab 2.8 — MANIPULATE (Manual Routing with Switch)

### Task 1 + Task 2 — Combined (if/else → switch)

```js
// Lab2.8: server.js — Based on START CODE EX-2
const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(`Received ${method} request for ${url}`);

  // Only handle GET requests through the switch
  if (method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('405 Method Not Allowed');
  }

  switch (url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(`
        <html>
          <head><title>Home</title></head>
          <body>
            <h1>Welcome to the Home Page</h1>
            <p>This is a simple Node.js server.</p>
          </body>
        </html>
      `);

    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('About us: at CADT, we love node.js!');

    case '/contact-us':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('You can reach us via email...');

    case '/products':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('Buy one get one...');

    case '/projects':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('Here are our awesome projects');

    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```

### Testing with curl

```bash
curl http://localhost:3000/about
# → About us: at CADT, we love node.js!

curl http://localhost:3000/contact-us
# → You can reach us via email...

curl http://localhost:3000/products
# → Buy one get one...

curl http://localhost:3000/projects
# → Here are our awesome projects
```

### Reflective Question Answers

**1. What happens when you visit a URL that doesn't match any defined route?**

The `default` case in the `switch` statement executes, sending a `404 Not Found` response with status code 404.

**2. Why do we check both `req.url` and `req.method`?**

A URL like `/contact` can be reached with different HTTP methods — `GET` to *show* a page and `POST` to *submit* data. If you only checked the URL, a POST to `/about` would get the same response as a GET, which is wrong. The method determines the *action* while the URL determines the *resource*.

**3. What MIME type (`Content-Type`) do you set when returning HTML instead of plain text?**

`text/html` — e.g. `res.writeHead(200, { 'Content-Type': 'text/html' })`. Without it, the browser shows the raw HTML tags as text instead of rendering them.

**4. How might this routing logic become harder to manage as routes grow?**

Every new route adds another `case` block. If you have 50 routes, the switch becomes hundreds of lines long with no organization, no parameter support (e.g. `/user/123`), no middleware, and repetitive header-setting code on every branch. It is hard to test and maintain.

**5. What benefits might a framework offer to simplify this logic?**

A framework like **Express.js** provides:
- `app.get('/about', handler)` — one clean line per route.
- Route parameters like `/user/:id` parsed automatically.
- Middleware (logging, auth, body parsing) applied globally or per route.
- Built-in error handling.
- Organized router files so routes can be split across multiple files.

---

## Lab 2.9 — CREATE (POST Form with File Writing)

### Completed Code (with Bonus)

```js
// Lab2.9: server.js — Based on START CODE EX-3
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(`Received ${method} request for ${url}`);

  // GET / — home page
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to the Home Page');
  }

  // GET /contact — show the form
  if (url === '/contact' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(`
      <html>
        <head><title>Contact</title></head>
        <body>
          <h2>Contact Form</h2>
          <form method="POST" action="/contact">
            <label>Name: <input type="text" name="name" placeholder="Your name" required /></label><br/><br/>
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
  }

  // POST /contact — receive and save form data
  if (url === '/contact' && method === 'POST') {
    let body = '';

    // 1. Buffer incoming data chunks
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // 2. When all data has arrived, process it
    req.on('end', () => {
      const name = new URLSearchParams(body).get('name');
      console.log('Submitted name:', name);

      // BONUS: validate the name field is not empty
      if (!name || name.trim() === '') {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        return res.end(`
          <html><body>
            <h2>Error: Name cannot be empty.</h2>
            <a href="/contact">Go back</a>
          </body></html>
        `);
      }

      // BONUS: save as JSON format instead of plain text
      const entry = JSON.stringify({
        name: name.trim(),
        submittedAt: new Date().toISOString()
      });

      // 3. Append to submissions.txt (one JSON object per line)
      fs.appendFile('submissions.txt', entry + '\n', (err) => {
        if (err) {
          console.error('Failed to save submission:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Internal Server Error: could not save submission.');
        }

        // 4. BONUS: Send back an HTML confirmation page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <head><title>Thank You</title></head>
            <body>
              <h2>Thank you, ${name.trim()}!</h2>
              <p>Your submission has been recorded.</p>
              <a href="/contact">Submit another</a>
            </body>
          </html>
        `);
      });
    });

    return; // prevent falling through to the 404 handler
  }

  // Default — 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  return res.end('404 Not Found');
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```

### Discussion Question Answers

**1. Why do we listen for `data` and `end` events when handling POST?**

HTTP request bodies arrive as a **stream** — the data may come in multiple small packets (called "chunks"), especially for large forms or file uploads. The `data` event fires each time a chunk arrives; we concatenate them into a string. The `end` event fires when the **entire body has been received**. Only then is it safe to parse and use the data. Reading the body synchronously is not possible because streams are asynchronous.

**2. What would happen if we didn't buffer the body correctly?**

If we tried to use `body` before the `end` event fires, it would be incomplete (only the first chunk). For large payloads it would be missing data; for small payloads it might work by coincidence because the whole body fits in one chunk — but this is unreliable. The result would be a partially parsed or empty form submission.

**3. What is the format of form submissions when using the default browser form POST?**

The browser encodes the body as **URL-encoded** format:
```
name=John+Doe&email=john%40example.com
```
The `Content-Type` header is set to `application/x-www-form-urlencoded`. Spaces become `+` and special characters are percent-encoded (e.g. `@` → `%40`). `URLSearchParams` decodes this automatically.

**4. Why do we use `fs.appendFile` instead of `fs.writeFile`?**

`fs.writeFile` **overwrites** the entire file every time — so only the latest submission would be saved. `fs.appendFile` **adds** to the end of the file, preserving all previous submissions. Since we want a log of every form submission, append is the correct choice.

**5. How could this be improved or made more secure?**

- **Sanitize input** — strip HTML tags or special characters from `name` to prevent XSS or injection attacks.
- **Limit body size** — malicious clients could send a gigabyte of data; add a check like `if (body.length > 1e6) { /* reject */ }`.
- **Use HTTPS** — form data is sent in plaintext over HTTP; HTTPS encrypts it.
- **CSRF protection** — add a hidden token to the form and verify it on the server.
- **Use a database** instead of a flat text file for proper querying, indexing, and concurrent write safety.
- **Validate all fields** — check email format, name length limits, etc.

### Bonus Challenges — Done ✅

- **Empty name validation** — checked with `if (!name || name.trim() === '')` before saving.
- **HTML confirmation page** — server returns a styled `<html>` thank-you page on success.
- **JSON format** — each submission is saved as `{"name":"...","submittedAt":"..."}` followed by a newline, making it easy to parse later.

---

## Quick Reference — Key Concepts

| Concept | Summary |
|---------|---------|
| `http.createServer(cb)` | Creates an HTTP server; `cb` fires on every request |
| `req.url` | The URL path (e.g. `/about`) |
| `req.method` | The HTTP verb (GET, POST, etc.) |
| `res.statusCode` | Sets the response status code |
| `res.setHeader(k, v)` | Sets a response header before sending body |
| `res.write(data)` | Sends a chunk of the body (can call multiple times) |
| `res.end([data])` | Sends final chunk and closes the response |
| `req.on('data', cb)` | Receives a chunk of the request body |
| `req.on('end', cb)` | All request body chunks have arrived |
| `fs.appendFile(f, d, cb)` | Appends data to a file without overwriting |
| `Content-Type: text/plain` | Browser shows raw text |
| `Content-Type: text/html` | Browser renders HTML |
