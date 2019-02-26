// https://programmers.co.kr/learn/courses/30/lessons/43165?language=javascript

function solution(numbers, target) {
  var answer = 0;
  answer += getNum(numbers[0], numbers.slice(1), target);
  answer += getNum(-numbers[0], numbers.slice(1), target);
  return answer;
}

function getNum(num, arr, target) {
  var result = 0;
  if(arr.length === 0) {
      if(num === target) return 1;
      else return 0;
  }
  
  result += getNum(num+arr[0], arr.slice(1), target);
  result += getNum(num-arr[0], arr.slice(1), target);
  
  return result;
}