const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const writableStream = fs.createWriteStream(filePath);

let sentence;
console.log('Hi');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter a sentence: '
});

rl.prompt();
  
rl.on('line', (line) => {
    switch (line.trim()) {
        case 'exit':
            rl.close();
            break;
        default:
            sentence = line + '\n';
            writableStream.write(sentence);
            rl.prompt();
            break;
    }
}).on('close', () => {
    writableStream.end();
    writableStream.on('finish', () => {
        console.log(`All your sentences have been written to ${filePath}`);
    })
    setTimeout(() => {
        process.exit(0);
    }, 100);
});

writableStream.on('error', error => console.log('Error', error.message));