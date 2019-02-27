#include <iostream>
#include <cstring>

using namespace std;

int n;
const int MOD = 10000000;
int poly(int, int);
int cache[101][101];

int main() {
	int c;
	cin >> c;

	memset(cache, -1, sizeof(cache));
	for (int i = 0; i < c; i++) {
		cin >> n;
		int result = 0;
		for (int j = 1; j <= n; j++) {
			result += poly(n, j);
			result %= MOD;
		}
		cout << result << endl;
	}
	return 0;
}

int poly(int num, int top) {
	if (top <= 0 || top > num) return 0;
	if (top == num) return 1;

	if (cache[num][top] != -1) return cache[num][top];
	int& ret = cache[num][top];

	ret = 0;
	for (int i = 1; i <= num-top; i++) {
		ret += poly(num - top, i)*(top + i -1);
		ret %= MOD;
	}
	
	return ret;
}