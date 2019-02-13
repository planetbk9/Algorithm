var input = [];
const fs = require('fs');
require('readline')
// fs.createReadStream('./input.txt')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  }).on('close', function () {
    const cycle = +input[0];
    input = input.slice(1);
    for(let i=0; i<cycle; i++) {
      const board = input.slice(0, 5);
      const test = +input[5];
      const words = input.slice(6, 6 + test);
      for(let j=0; j<test; j++) {
        console.log(words[j], getResult(board, words[j], true));
      }

      input = input.slice(6 + test);
    }
  });

const trans = [
  [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
];

function getResult(board, word, start, row, col) {
  let result = 'NO';
  if(word.length === 0) return 'YES';
  if(start) {
    for(let i=0; i<5; i++) {
      for(let j=0; j<5; j++) {
        if(board[i][j] === word[0]) {
          result = getResult(board, word.slice(1), false, i, j);
          if(result === 'YES') return 'YES';
        }
      }
    }
  }else {
    for(let i=0; i<trans.length; i++) {
      const newRow = row + trans[i][0];
      const newCol = col + trans[i][1];
      if(newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5 && board[newRow][newCol] === word[0]) {
        result = getResult(board, word.slice(1), false, newRow, newCol);
        if(result === 'YES') return 'YES';
      }
    }
  }

  return result;
}