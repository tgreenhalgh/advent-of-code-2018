const fs = require('fs');
const file = __dirname + '/02 data.txt';

let first, second;
let count = 0;
let answer = '';

console.time('loop');
const data = fs.readFileSync(file, 'utf-8').split('\n');

// grab first item
for (let i = 0; i < data.length; i++) {
  first = data[i];
  // grab next item
  for (j = i + 1; j < data.length; j++) {
    second = data[j];
    // compate the two
    for (k = 0; k < first.length; k++) {
      if (first[k] !== second[k]) count++;
      // no need to keep checking if more than one
      if (count > 1) break;
    }
    // found it! done
    if (count === 1) {
      for (let m = 0; m < first.length; m++) {
        if (first[m] === second[m]) answer += first[m];
      }
      console.log(answer);
      break;
    }
    count = 0;
  }
}
console.timeEnd('loop');
