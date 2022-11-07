const path = require('path');
const fs = require('fs');

const from = path.join(__dirname, 'styles');
const to = path.join(__dirname, 'project-dist//bundle.css');

const writableStream = fs.createWriteStream(to);

fs.readdir(from, (err, files) => {
    files.forEach(file => {
        fs.stat(path.join(from, file), (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
            if(stats.isFile() && path.extname(file) === '.css'){
                fs.readFile(path.join(from, file), 'utf-8', (err, data) => {
                    writableStream.write(data + '\n');
                });
            }
        });
    });
});