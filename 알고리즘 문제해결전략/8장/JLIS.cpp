#include <iostream>
#include <cstring>
#include <algorithm>

using namespace std;

int n, m;
int A[100];
int B[100];
int cache[101][101][2];

int jlis(int, int, int);

int main() {
	int c;
	cin >> c;

	for (int i = 0; i < c; i++) {
		memset(cache, -1, sizeof(cache));
		cin >> n >> m;
		for (int j = 0; j < n; j++) {
			cin >> A[j];
		}
		for (int j = 0; j < m; j++) {
			cin >> B[j];
		}

		int maxNum = 0;
		for (int a = 0; a < n; a++) {
			for (int b = 0; b < m; b++) {
				for (int line = 0; line < 2; line++) {
					maxNum = max(maxNum, jlis(a, b, line));
				}
			}
		}

		cout << maxNum << endl;
	}
	return 0;
}

int jlis(int a, int b, int line) {
	if (a >= n || b >= m) return 0;
	if (a == n - 1 && b == m - 1) {
		return 1;
	}
	if (cache[a][b][line] != -1) return cache[a][b][line];

	int& ret = cache[a][b][line];
	ret = 1;

	if (line == 0) {
		for (int i = a + 1; i < n; i++) {
			if (a == -1 || A[a] < A[i]) ret = max(ret, 1 + jlis(i, b, 0));
		}
		for (int i = b; i < m; i++) {
			if (a == -1 || A[a] < B[i]) ret = max(ret, 1 + jlis(a, i, 1));
		}
	}
	else {
		for (int i = a; i < n; i++) {
			if (b == -1 || B[b] < A[i]) ret = max(ret, 1 + jlis(i, b, 0));
		}
		for (int i = b + 1; i < m; i++) {
			if (b == -1 || B[b] < B[i]) ret = max(ret, 1 + jlis(a, i, 1));
		}
	}
	
	return ret;
}