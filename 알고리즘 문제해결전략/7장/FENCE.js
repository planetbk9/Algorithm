var input = [];
var N;
var fence = [];

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  }).on('close', function () {
    var c = +input[0];
    for (var i = 0; i < c; i++) {
      N = +input[i * 2 + 1];
      fence = input[i * 2 + 2].split(' ');
      fence = fence.map(elem => +elem);
      console.log(maxArea(0, N - 1));
    }
  });

function maxArea(left, right) {
  if (right === left) return fence[left];

  let lIndex = left + Math.floor((right - left) / 2);
  let rIndex = lIndex + 1;
  const lArea = maxArea(left, lIndex);
  const rArea = maxArea(rIndex, right);

  let minHeight = Math.min(fence[lIndex], fence[rIndex]);
  let cArea = minHeight * 2;

  while (lIndex > left || rIndex < right) {
    if (lIndex > left && (rIndex >= right || fence[lIndex-1] > fence[rIndex+1])) {
      minHeight = Math.min(fence[--lIndex], minHeight);
      cArea = Math.max(cArea, minHeight * (rIndex - lIndex + 1));
    } else {
      minHeight = Math.min(fence[++rIndex], minHeight);
      cArea = Math.max(cArea, minHeight * (rIndex - lIndex + 1));
    }
  }
  return Math.max(lArea, rArea, cArea);
}