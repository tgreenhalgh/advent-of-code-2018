var fs = require('fs');
var split = require('split');
var file = __dirname + '/01a_data.txt';

let total = 0;

const freqTotal = freqAdj => {
  total += +freqAdj;
};

const allDone = () => console.log('FINISHED:', total);

fs.createReadStream(file)
  .pipe(split())
  .on('data', freqTotal)
  .on('end', allDone);
