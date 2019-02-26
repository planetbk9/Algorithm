var input = [];
var data;
var cache = [];

require('readline')
.createInterface(process.stdin, process.stdout)
.on('line', function(line) {
  input.push(line.trim());
}).on('close', function() {
  var c = +input[0];

  for(var i=1; i<=c; i++) {
    data = [].map.call(input[i], elem => +elem);
    for(var j=0; j<10000; j++) cache[j] = -1;
    console.log(easy(0));
  }
});

function easy(start) {
  if(start === data.length) return 0;
  if(start > data.length) return Infinity;
  if(cache[start] !== -1) return cache[start];

  let ret = Infinity;
  for(var i=3; i<=5; i++) {
    if(start + i > data.length) break;
    const score = getScore(data.slice(start, start + i));
    ret = Math.min(ret, score + easy(start + i));
  }
  return cache[start] = ret;
}

function getScore(str) {
  let pass = false;
  for(var i=0; i<str.length-1; i++) {
    if(str[i] === str[i+1]) pass = true;
    else {
      pass = false;
      break;
    }
  }
  if(pass) return 1;

  for(var i=0; i<str.length-1; i++) {
    if(str[i] === str[i+1]-1) pass = true;
    else {
      pass = false;
      break;
    }
  }
  if(pass) return 2;
  for(var i=0; i<str.length-1; i++) {
    if(str[i] === str[i+1]+1) pass = true;
    else {
      pass = false;
      break;
    }
  }
  if(pass) return 2;
  
  for(var i=0; i<str.length-2; i++) {
    if(str[i] === str[i+2]) pass = true;
    else {
      pass = false;
      break;
    }
  }
  if(pass) return 4;
  
  let dif = str[1] - str[0];
  for(var i=0; i<str.length-1; i++) {
    if(str[i] + dif === str[i+1]) pass = true;
    else {
      pass = false;
      break;
    }
  }
  if(pass) return 5;
  
  return 10;
}