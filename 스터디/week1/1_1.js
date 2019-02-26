// https://programmers.co.kr/learn/courses/30/lessons/42840?language=javascript

function solution(answers) {
  var answer = [];
  const su = [[1,2,3,4,5], [2,1,2,3,2,4,2,5], [3,3,1,1,2,2,4,4,5,5]];
  let grade = [0, 0, 0];
  let maxGrade = 0;
  
  for(var i=0; i<3; i++) {
      for(var j=0; j<answers.length; j++) {
          const index = j % su[i].length;
          if(su[i][index] === answers[j]) {
              maxGrade = Math.max(maxGrade, ++grade[i]);
          }
      }
  }
  
  for(var i=0; i<3; i++) {
      if(grade[i] === maxGrade) answer.push(i+1);
  }
  return answer;
}