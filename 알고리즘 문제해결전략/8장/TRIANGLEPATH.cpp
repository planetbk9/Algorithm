#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

int n;
int triangle[100][100];
int cache[100][100];
int maxSum(int, int);

int main() {
	int c;
	cin >> c;

	for (int i = 0; i < c; i++) {
		cin >> n;
		memset(cache, -1, sizeof(cache));

		for (int j = 0; j < n; j++) {
			for (int k = 0; k <= j; k++) {
				cin >> triangle[j][k];
			}
		}

		cout << maxSum(0, 0) << endl;
	}
	return 0;
}

int maxSum(int y, int x) {
	if (y == n || x > y) return 0;

	if (cache[y][x] != -1) return cache[y][x];
	int& ret = cache[y][x];

	return ret = triangle[y][x] + max(maxSum(y+1, x), maxSum(y+1, x+1));
}