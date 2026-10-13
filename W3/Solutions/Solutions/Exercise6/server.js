// server.js — Exercise 06: Preparing for POST Data
// Goal: Configure Express to understand incoming JSON data.

import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/echo', (req, res) => {
    const body = req.body; // Populated by express.json() middleware
    res.status(200).json({
        message: 'Here is what you sent:',
        received: body,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


