let http = require('http');
let fs = require('fs');
let sass = require('sass');
let express = require('express');
let path = require('path')

// Fields
const sass_input_path = 'public/stylesheets/main.scss';
const css_output_path = 'public/stylesheets/main.css';
const index_html_path = 'public/views/index.html';

// Set up middleware
let app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Render sass/scss
sass.render(
    {
        file: sass_input_path,
        outFile: css_output_path
    },
    (err, res) => {
        if (err) {
            console.error('Error rendering SCSS:');
            console.error(err);
            return;
        } else {
            fs.writeFile(css_output_path, res.css, (fs_err) => {
                if (fs_err) {
                    console.error('Error writing to CSS file:');
                    console.error(fs_err);
                }
            });
        }
    }
);

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
		}
		res.end();
	});
});

// Run server
app.listen(3000, () => {
    console.log('UP')
})
