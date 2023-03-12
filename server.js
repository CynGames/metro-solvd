const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');
    }
});

// Start the server
server.listen(3000);

