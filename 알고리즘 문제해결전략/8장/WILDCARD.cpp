#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <cstring>
using namespace std;

bool solution(int, int);
string wildcard;
string file;
int cache[100][100];

int main() {
	int c;
	cin >> c;

	for (int i = 0; i < c; i++) {
		int N;
		cin >> wildcard >> N;
		vector<string> result;
		for (int j = 0; j < N; j++) {
			cin >> file;
			memset(cache, -1, sizeof(cache));
			if (solution(0, 0)) result.push_back(file);
		}
		sort(result.begin(), result.end());
		for (int j = 0; j < result.size(); j++)
			cout << result[j] << endl;
	}
	return 0;
}

bool solution(int wIdx, int fIdx) {
	int wLen = wildcard.length();
	int fLen = file.length();
	if (wIdx == wLen - 1 && wildcard[wIdx] == '*') return 1;
	if (wIdx == wLen && fIdx == fLen) return 1;
	if (wIdx >= wLen || fIdx >= fLen) return 0;

	if (cache[wIdx][fIdx] != -1) return cache[wIdx][fIdx];
	int& ret = cache[wIdx][fIdx];
	if (wildcard[wIdx] == '?') ret = solution(wIdx+1, fIdx+1);
	else if (wildcard[wIdx] == '*') {
		ret = solution(wIdx+1, fIdx);
		if (ret == 0) solution(wIdx + 1, fIdx + 1);
		for (int i = fIdx+1; i < fLen; i++) {
			if (ret == 1) break;
			ret = solution(wIdx, i);
		}
	}
	else if (wildcard[wIdx] == file[fIdx]) ret = solution(wIdx+1, fIdx+1);
	else ret = 0;

	return ret;
}