const fs = require('fs');
const split = require('split');
const file = __dirname + '/01a_data.txt';
const fd = fs.openSync('/dev/stdin', 'rs'); // keyboard input

let total = 0;
let freqObj = {};

const freqTotal = freqAdj => {
  total += +freqAdj;
  freqObj[total] ? (freqObj[total] = freqObj[total] + 1) : (freqObj[total] = 1);
  if (freqObj[total] == 2) {
    console.timeEnd('loop');
    console.log('FIRST TO TWO', total);
    // press enter to continue, ctrl-c to stop
    fs.readSync(fd, new Buffer(1), 0, 1);
  }
};

const readFileLoop = () => {
  fs.createReadStream(file)
    .pipe(split())
    .on('data', freqTotal)
    .on('end', readFileLoop);
};

console.time('loop');
readFileLoop();
