#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

using namespace std;

vector<int> multiply(const vector<int>&, const vector<int>&);
void normalize(vector<int>&);
void addTo(vector<int>&, const vector<int>&, int);
void subFrom(vector<int>&, const vector<int>&);
vector<int> karatsuba(const vector<int>&, const vector<int>&);
int solution(string, string);

int main() {
	int cases;
	cin >> cases;
	
	for (int i = 0; i < cases; i++) {
		string member, fan;
		cin >> member;
		cin >> fan;
		cout << solution(member, fan) << endl;
	}
 }

int solution(string member, string fan) {
	int M = member.size();
	int F = fan.size();
	vector<int> m(M), f(F);
	for (int i = 0; i < member.length(); i++) {
		m[i] = member[i] == 'F' ? 0 : 1;
	}
	for (int i = 0; i < fan.length(); i++) {
		f[i] = fan[F-i-1] == 'F' ? 0 : 1;
	}

	vector<int> ret = karatsuba(f, m);
	int cnt = 0;
	for (int i = m.size()-1; i < f.size(); i++) {
		if (ret[i] == 0) cnt++;
	}

	return cnt;
}

vector<int> multiply(const vector<int>& a, const vector<int>& b) {
	vector<int> c(a.size() + b.size() - 1, 0);
	for (int i = 0; i < a.size(); i++) {
		for (int j = 0; j < b.size(); j++) {
			c[i + j] += a[i] * b[j];
		}
	}
	//normalize(c);
	return c;
}

void normalize(vector<int>& num) {
	num.push_back(0);
	int size = num.size();

	int borrow = 0;
	for (int i = 0; i < size-1; i++) {
		if (num[i] < 0) {
			int borrow = (abs(num[i]) + 9) / 10;
			num[i] += borrow*10;
			num[i + 1] -= borrow;
		}
		else {
			num[i + 1] += num[i] / 10;
			num[i] %= 10;
		}
	}
	while (num.size() > 1 && num.back() == 0) num.pop_back();
}

void addTo(vector<int>& a, const vector<int>& b, int k) {
	int cnt = b.size() + k - a.size();
	if (cnt > 0) {
		a.insert(a.end(), cnt, 0);
	}
	for (int i = 0; i < k + b.size(); i++) {
		if (i < k) a[i] += 0;
		else a[i] += b[i - k];
	}
	//normalize(a);
}

void subFrom(vector<int>& a, const vector<int>& b) {
	int cnt = b.size() - a.size();
	if (cnt > 0) a.insert(a.end(), cnt, 0);
	for (int i = 0; i < b.size(); i++) {
		a[i] -= b[i];
	}
	//normalize(a);
}

vector<int> karatsuba(const vector<int>& a, const vector<int>& b) {
	vector<int> ret;
	int an = a.size();
	int bn = b.size();

	if (an < bn) return karatsuba(b, a);
	if (an <= 50) return multiply(a, b);

	int half = max(an, bn) / 2;
	vector<int> a0(a.begin(), a.begin() + half);
	vector<int> a1(a.begin() + half, a.end());
	vector<int> b0(b.begin(), b.begin() + min(half, bn) );
	vector<int> b1(b.begin() + min(half, bn), b.end());

	vector<int> z0 = karatsuba(a0, b0);
	vector<int> z2 = karatsuba(a1, b1);

	addTo(a0, a1, 0);
	addTo(b0, b1, 0);
	vector<int> z1 = karatsuba(a0, b0);
	subFrom(z1, z0);
	subFrom(z1, z2);
	addTo(ret, z2, half*2);
	addTo(ret, z1, half);
	addTo(ret, z0, 0);

	return ret;
}