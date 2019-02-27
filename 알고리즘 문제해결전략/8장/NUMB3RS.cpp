#include <iostream>
#include <cstring>

using namespace std;

int n, d, p, t, q;
int arr[50][50];
int num[50];
double cache[100][50];
double solution(int, int);

int main() {
	int c;
	cin >> c;

	for (int i = 0; i < c; i++) {
		cin >> n >> d >> p;
		memset(num, 0, sizeof(num));
		for (int j = 0; j < 100; j++) {
			for (int k = 0; k < 50; k++) {
				cache[j][k] = -1;
			}
		}
		for (int j = 0; j < n; j++) {
			for (int k = 0; k < n; k++) {
				cin >> arr[j][k];
				if (arr[j][k] == 1) num[j]++;
			}
		}
		cin >> t;
		for (int j = 0; j < t; j++) {
			cin >> q;
			cout.precision(20);
			cout << solution(d, q) << " ";
		}
		cout << endl;
	}

	return 0;
}

double solution(int day, int town) {
	if (day == 1) {
		if (arr[town][p] == 1) return 1 / (double)num[p];
		else return 0;
	}

	if (cache[day][town] != -1) return cache[day][town];
	double& ret = cache[day][town];

	ret = 0;
	for (int i = 0; i < n; i++) {
		if (arr[town][i] == 1) {
			ret += solution(day - 1, i)/num[i];
		}
	}

	return ret;
}