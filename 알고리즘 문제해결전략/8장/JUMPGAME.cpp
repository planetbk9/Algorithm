#include <iostream>
#include <cstring>

using namespace std;

int N;
int board[100][100];
int cache[100][100];
int solution(int, int);

int main() {
	int cases;
	cin >> cases;

	for (int i = 0; i < cases; i++) {
		cin >> N;
		memset(cache, -1, sizeof(cache));
		for (int j = 0; j < N; j++) {
			for (int k = 0; k < N; k++) {
				cin >> board[j][k];
			}
		}
		if (solution(0, 0) == 1) cout << "YES" << endl;
		else cout << "NO" << endl;
	}

	return 0;
}

int solution(int y, int x) {
	if (y >= N || x >= N) return 0;
	if (y == N - 1 && x == N - 1) return 1;
	
	int &ret = cache[y][x];
	if (ret != -1) return ret;
	int num = board[y][x];
	int result = solution(y+num, x);
	if (result == 0) result = solution(y, x + num);

	return ret = result;
}