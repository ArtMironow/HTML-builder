const path = require('path');
const fs = require('fs');

const projectPath = path.join(__dirname, 'project-dist');
const fromAssets = path.join(__dirname, 'assets');
const toAssets = path.join(__dirname, 'project-dist//assets');

fs.mkdir(projectPath, (err, files) => {
    copyDir(fromAssets, toAssets);
});

function copyDir(fromAssets, toAssets) { 
    fs.rm(toAssets, { recursive: true, force: true }, err => {
        fs.mkdir(toAssets, (err, element) => {
            fs.readdir(fromAssets, (err, element) => {
                element.forEach(item => {
                    fs.stat(path.join(fromAssets, item), (err, stats) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        if (stats.isFile()) {
                            fs.copyFile(path.join(fromAssets, item), path.join(toAssets, item), () => {});
                        }
                        if (stats.isDirectory()) {
                            copyFolder(path.join(fromAssets, item), path.join(toAssets, item));
                        }
                    });
                });
            });
        });  
    });    
}

function copyFolder(from, to) {
    fs.mkdir(to, () => {
        fs.readdir(from, (err, element) => {
            element.forEach(item => {
                fs.stat(path.join(from, item), (err, stats) => {
                    if(stats.isFile()){
                        fs.copyFile(path.join(from, item), path.join(to, item), () => {});
                    }if(stats.isDirectory()){
                        copyFolder(path.join(from, item), path.join(to, item));
                    }
                });   
            });
        });        
    });   
}

const fromStyles = path.join(__dirname, 'styles');
const toStyles = path.join(__dirname, 'project-dist//style.css');

const writableStream = fs.createWriteStream(toStyles);

fs.readdir(fromStyles, (err, files) => {
    files.forEach(file => {
        fs.stat(path.join(fromStyles, file), (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
            if(stats.isFile() && path.extname(file) === '.css'){
                fs.readFile(path.join(fromStyles, file), 'utf-8', (err, data) => {
                    writableStream.write(data + '\n');
                });
            }
        });
    });
});

const htmlComponentsPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const resultHtml = path.join(__dirname, 'project-dist//index.html')
const writableStreamHtml = fs.createWriteStream(resultHtml);
var resStr ='';

fs.readFile(templatePath, 'utf-8', (err, data) =>{
    writableStreamHtml.write(data);
    fs.readFile(resultHtml, 'utf-8', (err, data) => {
        resStr = data;
        htmlCombiner(resStr);
    })
});
    
function htmlCombiner(resStr) {
    fs.readdir(htmlComponentsPath, (err, files) => {
        for(let i = 0; i < files.length; i++){
            let file = files[i];
            fs.readFile(path.join(htmlComponentsPath, file), 'utf-8', (err, data) => {
                let resFile = file.slice(0, file.indexOf('.'));
                console.log(resFile);
                resStr = resStr.replace('{{'+ resFile +'}}', data);
                fs.writeFile(resultHtml, resStr, () => {});
            });  
        }
    });   
}