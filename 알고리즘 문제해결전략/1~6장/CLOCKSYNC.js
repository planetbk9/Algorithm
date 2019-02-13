var input = [];
var num;
const fs = require('fs');
require('readline')
  // fs.createReadStream('./input.txt')
  // process.stdin
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  }).on('close', function () {
    num = +input[0];

    for(var i=1; i <= num; i++) {
      var clock = input[i].split(/\s/).map(time => +time);
      var visited = {};
      for(var j=0; j<SWITCH.length; j++) visited[j] = 0;
      const result = minCount(clock, visited, 0);
      console.log(result === Infinity ? -1 : result);
    }
  });

const SWITCH= [
  [0, 1, 2],
  [3, 7, 9, 11],
  [4, 10, 14, 15],
  [0, 4, 5, 6, 7],
  [6, 7, 8, 10, 12],
  [0, 2, 14, 15],
  [3, 14, 15],
  [4, 5, 7, 14, 15],
  [1, 2, 3, 4, 5],
  [3, 4, 5, 9, 13]
];

function minCount(clock, visited, toVisit) {
  var result = 0;
  
  if(isDone(clock)) {
    for(var i=0; i<SWITCH.length; i++) {
      result += visited[i];
    }
    return result;
  }
  
  var isFull = true;
  for(var j=0; j<SWITCH.length; j++) {
    if(visited[j] < 3) {
      isFull = false;
      break;
    };
  }

  if(isFull) {
    return Infinity;
  }
  result = Infinity;

  for(var i=toVisit; i < SWITCH.length; i++) {
    if(visited[i] >= 3) continue;

    visited[i]++;
    for(var j=0; j<SWITCH[i].length; j++) {
      var newTime = (clock[SWITCH[i][j]] + 3) % 12;
      clock[SWITCH[i][j]] = newTime === 0 ? 12 : newTime;
    }
    result = Math.min(result, minCount(clock, visited, i));
    visited[i]--;
    for(var j=0; j<SWITCH[i].length; j++) {
      var before = (clock[SWITCH[i][j]] - 3);
      clock[SWITCH[i][j]] = before === 0 ? 12 : before;
    }
  }

  return result;
}

function isDone(clock) {
  for(var i=0; i<clock.length; i++) {
    if(clock[i] !== 12) return false;
  }
  return true;
}