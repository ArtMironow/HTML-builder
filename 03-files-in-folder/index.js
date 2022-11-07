const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, (err, files) => {
    files.forEach(file => {
        fs.stat(path.join(filePath, file), (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
            if(stats.isFile()){
                console.log('File name: ' + file + ', File extension: ' + path.extname(file) + ', File size: ' + stats.size);
            }
        });
    });
});