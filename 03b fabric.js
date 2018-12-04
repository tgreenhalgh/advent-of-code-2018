/*
A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies
 a rectangle 3 inches from the left edge
 2 inches from the top edge
 5 inches wide
 4 inches tall.
*/

const fs = require('fs');
const file = __dirname + '/03 data.txt';
const BOARD_SIZE = 1000;
let arrObj = {};
let totalArr = [];
let claim = 0;

console.time('fabric');
let board = Array.from(Array(BOARD_SIZE), _ => Array(BOARD_SIZE).fill(0));
let count = 0;

const data = fs.readFileSync(file, 'utf-8').split('\n');
// const data = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2']; // 4

const parseData = str => {
  let id = str.split('@')[0];
  id = +id.slice(1);
  let afterAt = str.split('@')[1];
  let beforeColon = afterAt.split(':')[0];
  let xStart = +beforeColon.split(',')[0];
  let yStart = +beforeColon.split(',')[1];
  let afterColon = afterAt.split(':')[1];
  let xSize = +afterColon.split('x')[0];
  let ySize = +afterColon.split('x')[1];
  let total = xSize * ySize;

  return [xStart, yStart, xSize, ySize, id, total];
};

for (let i = 0; i < data.length; i++) {
  let arr = parseData(data[i]);
  for (let y1 = arr[1]; y1 < arr[1] + arr[3]; y1++) {
    for (let x1 = arr[0]; x1 < arr[0] + arr[2]; x1++) {
      if (board[y1][x1] == 0) board[y1][x1] = arr[4];
      else board[y1][x1] = 'X';
    }
  }
  totalArr.push(arr[5]);
}

for (let y = 0; y < BOARD_SIZE; y++) {
  for (let x = 0; x < BOARD_SIZE; x++) {
    claim = board[y][x];
    arrObj[claim] ? (arrObj[claim] = arrObj[claim] + 1) : (arrObj[claim] = 1);
  }
}

console.log('Two or more claims', arrObj.X);

for (let i = 0; i < totalArr.length; i++) {
  if (totalArr[i] == arrObj[i + 1]) {
    console.log("The pattern that isn't covered at all is is", i + 1);
    break;
  }
}

console.timeEnd('fabric');
