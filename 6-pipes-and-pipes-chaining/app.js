import * as fs from 'fs';
import * as zlib from 'zlib';

const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip();

// const readStream = fs.createReadStream('./example.txt', 'utf8');
// const writeStream = fs.createWriteStream('example2.txt.gzip');
// readStream.pipe(gzip).pipe(writeStream);


const readStream = fs.createReadStream('./example2.txt.gzip');
const writeStream = fs.createWriteStream('uncompressed_example2.txt');
readStream.pipe(gunzip).pipe(writeStream);