import fs from 'fs';      // import the file-system module

function logger(req, res, next) {
  const time = new Date().toISOString();
  const logLine = `[${time}] ${req.method} ${req.url}\n`;

  // Append the log line to logs/access.log
  fs.appendFileSync('logs/access.log', logLine, (err) => {
    if (err) console.error('Failed to write log:', err);
  });

  next();   // pass control to the next middleware/route
}

export default logger;