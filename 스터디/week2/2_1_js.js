// https://www.acmicpc.net/problem/1780

var input = [];
var minus = 0;
var zero = 0;
var plus = 0;

require('readline')
.createInterface(process.stdin, {})
.on('line', function(line) {
  input.push(line.trim());
}).on('close', function() {
  var c = +input[0];
  var paper = [];
  input.splice(0, 1);
  for(var i=0; i<c; i++) {
    paper[i] = [].map.call(input[i].split(' '), function(elem) {
      return +elem;
    });
  }
  //solution(paper);
  console.log(minus);
  console.log(zero);
  console.log(plus);
});

function solution(paper) {
  var N = paper.length;
  var first = paper[0][0];
  var exit = true;
  for(var i=0; i<N; i++) {
    for(var j=0; j<N; j++) {
      if(paper[i][j] !== first) {
        exit = false;
        break;
      }
    }
    if(!exit) break;
  }
  if(exit) {
    return first < 0 ? minus++ : first > 0 ? plus++ : zero++;
  }

  var newPaper = [];

  for(var i=0; i<3; i++) {
    for(var j=0; j<3; j++) {
      for(var k=0; k<N/3; k++) {
        newPaper[k] = paper[i*N/3+k].slice(j*N/3, j*N/3+N/3);
      }
      solution(newPaper);
    }
  }
}