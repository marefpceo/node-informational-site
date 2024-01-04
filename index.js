const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

  const filepath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  const extname = path.extname(filepath);

  let contentType = 'text/html';

  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;  
    default :  
      break;
  }

  fs.readFile(filepath, (err, content) => {
    if(err) {
      fs.readFile(path.join(__dirname, '404.html'), () => {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end(content, 'utf8');
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));