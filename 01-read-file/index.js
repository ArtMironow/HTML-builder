const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(filePath, 'utf-8');

stream.on('data', data => console.log(data));
stream.on('error', error => console.log('Error', error.message));