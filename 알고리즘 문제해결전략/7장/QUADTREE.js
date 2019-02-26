var input = [];

const fs = require('fs');
require('readline')
// fs.createReadStream('./input.txt')
// process.stdin
.createInterface(process.stdin, process.stdout)
.on('line', function(line) {
  input.push(line.trim());
}).on('close', function() {
  const cycle = +input[0];
  for(var i=1; i<=cycle; i++) {
    console.log(quadtree([].map.call(input[i], elem => {return elem;})));
  }
});

function quadtree(input) {
  if(input.length === 0) return '';
  const quad = ['', '', '', ''];
  
  const first = input[0];
  input.splice(0, 1);
  if(first !== 'x') {
    return first
  }
  quad[0] = quadtree(input);
  quad[1] = quadtree(input);
  quad[2] = quadtree(input);
  quad[3] = quadtree(input);

  return 'x' + quad[2] + quad[3] + quad[0] + quad[1];
}