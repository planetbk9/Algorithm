#include <iostream>
#include <vector>

using namespace std;

int paper[2500][2500];
int N;
int negative = 0;
int zero = 0;
int positive = 0;

void solution(int, int, int);

int main(void) {
	cin >> N;

	for (int i = 0; i < N; i++) {
		for (int j = 0; j < N; j++) {
			cin >> paper[i][j];
		}
	}

	solution(0, 0, N);

	cout << negative << endl;
	cout << zero << endl;
	cout << positive << endl;

	return 0;
}

void solution(int x, int y, int size) {
	int first = paper[x][y];
	bool all = true;
	for (int i = x; i < x + size; i++) {
		for (int j = y; j < y + size; j++) {
			if (paper[i][j] != first) {
				all = false;
				break;
			}
		}
		if (!all) break;
	}

	if (all) {
		if (first < 0) negative++;
		else if (first > 0) positive++;
		else zero++;
		return;
	}

	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 3; j++) {
			solution(x + i * size / 3, y + j * size / 3, size / 3);
		}
	}
}