var input = [];
var num;
var H;
var W;
var board = [];
const fs = require('fs');
require('readline')
  // fs.createReadStream('./input.txt')
  // process.stdin
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  }).on('close', function () {
    num = +input[0];
    input = input.slice(1);

    for (var i = 0; i < num; i++) {
      H = +input[0].split(/\s/)[0];
      W = +input[0].split(/\s/)[1];
      input = input.slice(1);
      board = [];
      for (var j = 0; j < H; j++) {
        board.push(input[j].toString().split(''));
      }
      console.log(available(0, 0));
      input = input.slice(H);
    }
  });

const d = [[[0, 0], [0, 1], [1, 1]], [[0, 0], [1, 0], [1, 1]], [[0, 0], [1, 0], [0, 1]], [[0, 0], [1, -1], [1, 0]]];

function available(x, y) {
  if (isFull()) return 1;
  while (x <= H && y <= W && board[x][y] === '#') {
    if (y + 1 < W) y += 1;
    else if (x + 1 < H) {
      x += 1;
      y = 0;
    } else {
      return 0;
    }
  }
  var result = 0;

  for (var k = 0; k < d.length; k++) {
    if (isFit(x, y, d[k])) {
      insert(x, y, d[k]);
      result += available(x, y);
      undo(x, y, d[k]);
    }
  }

  return result;
}

function isFit(x, y, d) {
  for (var i = 0; i < d.length; i++) {
    if (x + d[i][0] >= H || y + d[i][1] >= W) return false;
    if (board[x + d[i][0]][y + d[i][1]] === '#') return false;
  }
  return true;
}

function insert(x, y, d) {
  for (var i = 0; i < d.length; i++) {
    board[x + d[i][0]][y + d[i][1]] = '#';
  }
}

function undo(x, y, d) {
  for (var i = 0; i < d.length; i++) {
    board[x + d[i][0]][y + d[i][1]] = '.';
  }
}

function isFull() {
  for (var i = 0; i < H; i++) {
    for (var j = 0; j < W; j++) {
      if (board[i][j] !== '#') return false;
    }
  }
  return true;
}