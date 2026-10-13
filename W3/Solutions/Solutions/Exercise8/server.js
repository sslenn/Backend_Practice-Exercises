// server.js — Exercise 08: The "Auto-File" Server (express.static)
// Goal: Understand how Express simplifies serving CSS, Images, or HTML
//       files without manual routing.

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ─────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/info', (req, res) => {
    res.json({ message: 'This is an API endpoint, separate from static files.' });
});

// ─────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} to see the static HTML page.`);
});
