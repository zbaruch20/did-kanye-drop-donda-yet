// Node modules
let fs = require('fs');
let express = require('express');
let path = require('path');

let sassService = require('./public/services/sass-service');
let apiService = require('./public/services/spotify-api-service');

// Fields
const index_html_path = 'public/views/index.html';

// Set up middleware
let app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Render sass/scss
sassService.renderSass();

// Set up root GET
app.get('/', (req, res) => {
    // Default headers
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    // Loads index.html and writes it to response
    fs.readFile(index_html_path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('HTML file not found.');
        } else {
            res.write(data);

            // Get DONDA status
            apiService.checkDondaReleased();
        }
        res.end();
    });
});

// Run server
app.listen(3000, () => {
    console.log('UP');
});
