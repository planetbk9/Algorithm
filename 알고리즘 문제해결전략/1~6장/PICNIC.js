var input = [];
var n;
var m;
var pair = [];
const fs = require('fs');
require('readline')
// fs.createReadStream('./input.txt')
// process.stdin
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  }).on('close', function () {
    const cycle = +input[0];
    input = input.slice(1);
    for(let i=0; i<cycle; i++) {
      n = input[0].split(/\s/)[0];
      m = input[0].split(/\s/)[1];
      let friends = input[1].split(/\s/);
      pair = [];
      for(let j=0; j<m; j++) {
        pair.push([+friends[j*2], +friends[j*2+1]]);
      }
      input = input.slice(2);
      const students = new Set();
      for(let k=0; k<n; k++) {
        students.add(k);
      }
      console.log(getCombination(students, 0));
    }
  });

function getCombination(students, index) {
  if(students.size === 0) return 1;
  var result = 0;

  for(var i=index; i<pair.length; i++) {
    if(students.has(pair[i][0]) && students.has(pair[i][1])) {
      students.delete(pair[i][0]);
      students.delete(pair[i][1]);
      result = result + getCombination(students, i+1);
      students.add(pair[i][0]);
      students.add(pair[i][1]);
    }
  }

  return result;
}