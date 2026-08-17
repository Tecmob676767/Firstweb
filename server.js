const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

function contentType(file) {
  const ext = path.extname(file).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=UTF-8';
    case '.css': return 'text/css; charset=UTF-8';
    case '.js': return 'application/javascript; charset=UTF-8';
    case '.json': return 'application/json; charset=UTF-8';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.gif': return 'image/gif';
    default: return 'text/plain; charset=UTF-8';
  }
}

const server = http.createServer((req, res) => {
  try {
    const safeUrl = decodeURIComponent(req.url.split('?')[0]) || '/';
    let filePath = path.join(publicDir, safeUrl);
    if (filePath.endsWith(path.sep)) filePath = path.join(filePath, 'index.html');
    // Prevent directory traversal
    const normalized = path.normalize(filePath);
    if (!normalized.startsWith(publicDir)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    fs.stat(normalized, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ct = contentType(normalized);
      res.writeHead(200, { 'Content-Type': ct });
      fs.createReadStream(normalized).pipe(res);
    });
  } catch (e) {
    res.writeHead(500);
    res.end('Server error');
  }
});

server.listen(port, () => {
  console.log(`First web static host running at http://localhost:${port}`);
});
