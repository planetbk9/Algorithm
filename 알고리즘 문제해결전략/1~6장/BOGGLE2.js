var input = [];
const fs = require('fs');
require('readline')
//fs.createReadStream('./input.txt')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  }).on('close', function () {
    const cycle = +input[0];
    input = input.slice(1);
    for (let i = 0; i < cycle; i++) {
      const board = input.slice(0, 5);
      const test = +input[5];
      const words = input.slice(6, 6 + test);
      for (let j = 0; j < test; j++) {
        const result = getResult(words[j], board).arr.length !== 0 ? 'YES' : 'NO';
        console.log(words[j], result);
      }

      input = input.slice(6 + test);
    }
  });

function getResult(str, board) {
  if (str.length === 1) {
    let ret = {
      str: str,
      arr: []
    };
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (str === board[i][j]) {
          ret.arr.push({
            left: {
              row: i,
              col: j
            },
            right: {
              row: i,
              col: j
            }
          });
        }
      }
    }
    return ret;
  }
  const half = Math.round(str.length / 2);
  let lh = getResult(str.slice(0, half), board);
  let rh = getResult(str.slice(half), board);

  let newRet = {
    str: str,
    arr: [],
  };
  for(let i=0; i<lh.arr.length; i++) {
    for(let j=0; j<rh.arr.length; j++) {
      const rowDist = Math.abs(rh.arr[j].left.row - lh.arr[i].right.row);
      const colDist = Math.abs(rh.arr[j].left.col - lh.arr[i].right.col);
      if((rowDist === 1 && colDist === 0) || (rowDist === 0 && colDist === 1) || (rowDist === 1 && colDist === 1)) {
        newRet.arr.push({
          left: {
            row: lh.arr[i].left.row,
            col: lh.arr[i].left.col
          },
          right: {
            row: rh.arr[j].right.row,
            col: rh.arr[j].right.col
          }
        });
      }
    }
  }

  return newRet;
}