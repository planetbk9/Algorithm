// https://programmers.co.kr/learn/courses/30/lessons/43162?language=javascript

function solution(n, computers) {
  var ret = 0;
  var visited = [];
  for(var i=0; i<n; i++) visited.push(false);
  for(var i=0; i<n; i++) {
      if(!visited[i]) {
          dfs(n, computers, i, visited);
          ret++;
      }
  }
  
  return ret;
}

function dfs(n, computers, cur, visited) {
  visited[cur] = true;
  
  for(var j=0; j<n; j++) {
      if(computers[cur][j] === 1 && !visited[j] && cur !== j) {
          visited[j] = true;
          dfs(n, computers, j, visited);
      }
  }
}