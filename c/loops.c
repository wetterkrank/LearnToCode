#include "stdio.h"

int main() {
    
    int arr[8] = {1,1,2,3,5,8,13,21};
    int i = 0, sumW = 0, prodF = 1;
    size_t arrlen = sizeof(arr) / sizeof(int);

    while(i<arrlen) {
        //Debug: printf("Debug; i: %d, arr[i]: %d, sum: %d\n", i, arr[i], sum);
        sumW = sumW + arr[i];
        i = i + 1;
    };

    printf("WHILE loop; Array sum: %d\n", sumW);

    for (i = 0; i < arrlen; i = i + 2) {
        prodF = prodF * arr[i];
    };

    printf("FOR loop; Array product: %d\n", prodF);

};