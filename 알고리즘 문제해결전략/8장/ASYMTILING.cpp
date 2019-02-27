#include <iostream>
#include <cstring>

using namespace std;

const int MOD = 1000000007;
int n;
int cache[101];
int tile(int);

int main() {
	int c;
	cin >> c;

	memset(cache, -1, sizeof(cache));
	for (int i = 0; i < c; i++) {
		cin >> n;
		int result;
		
		if (n == 1 || n == 2) result = 0;
		else if (n % 2 == 1) result = tile(n) - tile(n / 2);
		else result = tile(n) - tile(n / 2) - tile(n / 2 - 1);
		
		while (result < 0) result += MOD;
		cout << result << endl;
	}
	return 0;
}

int tile(int num) {
	if (num <= 0) return 0;
	if (num == 1) return 1;
	if (num == 2) return 2;

	if (cache[num] != -1) return cache[num];
	int& ret = cache[num];

	ret = 0;
	ret += tile(num - 1);
	ret %= MOD;
	ret += tile(num - 2);
	ret %= MOD;

	return ret;
}