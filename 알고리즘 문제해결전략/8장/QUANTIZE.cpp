#include <iostream>
#include <cstring>
#include <algorithm>
#include <vector>
#include <limits>
#include <math.h>

using namespace std;

int solution(int, int);
int N, S;
vector<int> arr(100, 1001);
int cache[100][10];

int main() {
	int c;
	cin >> c;

	for (int i = 0; i < c; i++) {
		cin >> N >> S;
		for (int j = 0; j < N; j++) {
			cin >> arr[j];
		}
		sort(arr.begin(), arr.begin()+N);
		memset(cache, -1, sizeof(cache));
		cout << solution(0, S) << endl;
	}
	return 0;
}

int solution(int idx, int num) {
	if ( N - idx <= num ) return 0;
	if (num == 1) {
		int sum = 0;
		int error = 0;
		for (int i = idx; i < N; i++) sum += arr[i];
		int mid = sum / (double)(N - idx) + 0.5;
		for (int i = idx; i < N; i++) error += (arr[i] - mid) * (arr[i] - mid);
		return error;
	}

	if (cache[idx][num] != -1) return cache[idx][num];
	int& ret = cache[idx][num] = numeric_limits<int>::max();
	int sum = 0;
	for (int i = idx + 1; i < N; i++) {
		sum += arr[i-1];
		int mid = sum / (double)(i - idx) + 0.5;
		int error = 0;
		for (int j = idx; j < i; j++) {
			error += (arr[j] - mid)*(arr[j] - mid);
		}
		ret = min(ret, error + solution(i, num - 1));
	}
	return ret;
}