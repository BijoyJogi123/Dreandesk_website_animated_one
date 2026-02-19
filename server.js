// Simple Node.js server with 404 handling
const http = require('http');
const fs = require('fs');
const path = require('path');

// Support both port 8000 and 8080
const PORT = process.env.PORT || 8000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Parse URL and remove query strings
    let filePath = '.' + req.url.split('?')[0];
    if (filePath === './') {
        filePath = './index.html';
    }

    // Get file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found - serve 404 page
                fs.readFile('./404.html', (error404, content404) => {
                    if (error404) {
                        // If 404.html doesn't exist, show basic error
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 - Page Not Found</h1><p>The 404.html file is missing.</p>', 'utf-8');
                    } else {
                        // Serve custom 404 page
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content404, 'utf-8');
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            // Success - serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('========================================');
    console.log('   DreamDesk Local Development Server');
    console.log('========================================');
    console.log(`\n✓ Server running at: http://localhost:${PORT}/`);
    console.log(`✓ 404 page configured and ready`);
    console.log(`\nTest URLs:`);
    console.log(`  - Homepage: http://localhost:${PORT}/`);
    console.log(`  - Test 404: http://localhost:${PORT}/test-404.html`);
    console.log(`  - Non-existent: http://localhost:${PORT}/nonexistent-page`);
    console.log(`  - Special chars: http://localhost:${PORT}/jjasd;jasd`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
});
