var input = [];
const fs = require('fs');
require('readline')
// fs.createReadStream('./input.txt')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  }).on('close', function () {
    const testCase = +input[0];
    input = input.slice(1);

    for (let index = 0; index < testCase; index++) {
      let result = Infinity;
      const N = +input[0].split(/\s/)[0];
      const L = +input[0].split(/\s/)[1];
      const priceArr = input[1].split(/\s/);

      for (let i = 0; i < N - L + 1; i++) {
        let cand = 0;
        for(let j=i; j<i+L; j++) cand += +priceArr[j];
        result = Math.min(result, cand/L);

        for(let j=i+L; j < N; j++) {
          cand += +priceArr[j];
          result = Math.min(result, cand/(j-i+1));
        }
      }
      console.log(result);
      input = input.slice(2);
    }
  });