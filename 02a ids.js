const fs = require('fs');
const split = require('split');
const file = __dirname + '/02 data.txt';

let twoCount = 0;
let foundTwo = false;
let threeCount = 0;
let foundThree = false;
let counter = {};

const ids = id => {
  for (let i = 0; i < id.length; i++) {
    counter[id[i]]
      ? (counter[id[i]] = counter[id[i]] + 1)
      : (counter[id[i]] = 1);
  }
  for (let i = 0; i < id.length; i++) {
    if (counter[id[i]] == 2 && !foundTwo) {
      twoCount++;
      foundTwo = true;
    }
    if (counter[id[i]] == 3 && !foundThree) {
      threeCount++;
      foundThree = true;
    }
  }

  // reset the variables
  counter = {};
  foundTwo = false;
  foundThree = false;
};

const allDone = () => console.log('Checksum:', twoCount * threeCount);

fs.createReadStream(file)
  .pipe(split())
  .on('data', ids)
  .on('end', allDone);
