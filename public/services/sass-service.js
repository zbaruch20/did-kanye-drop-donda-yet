// Renders scss from specified file by compiling to css

// Node modules
let fs = require('fs');
let sass = require('sass');

// File paths
const sass_input_path = 'public/stylesheets/main.scss';
const css_output_path = 'public/stylesheets/main.css';

exports.renderSass = () => {
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
}