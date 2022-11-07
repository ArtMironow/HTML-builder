const path = require('path');
const fs = require('fs');

const from = path.join(__dirname, 'files');
const to = path.join(__dirname, 'files-copy');

function copyDir(from, to){ 
    fs.rm(to, { recursive: true, force: true }, err => {
        fs.mkdir(to, (err, files) => {
            fs.readdir(from, (err, files) => {
                files.forEach(file => {
                    fs.stat(path.join(from, file), (err, stats) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        if(stats.isFile()){
                            fs.copyFile(path.join(from, file), to + '\\' + file, () => {});
                        }
                    });
                });
            });
        });  
    });    
}

copyDir(from, to);