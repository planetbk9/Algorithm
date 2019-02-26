#include <iostream>
#include <cstring>
#include <algorithm>

using namespace std;
int N;
int s[501];
int cache[501];
int lis(int);

int main() {
	int c;
	cin >> c;

	s[0] = -1;
	for (int i = 0; i < c; i++) {
		cin >> N;
		for (int j = 1; j < N+1; j++) {
			cin >> s[j];
		}
		memset(cache, -1, sizeof(cache));
		cout << lis(-1)-1 << endl;
	}
	return 0;
}

int lis(int start) {
	if (start >= N) return 0;
	if (start == N - 1) return 1;

	if (cache[start+1] != -1) return cache[start+1];
	int& ret = cache[start+1];
	ret = 1;
	for (int i = start+1; i < N; i++) {
		if (s[start+1] < s[i+1]) ret = max(ret, 1 + lis(i));
	}

	return ret;
}