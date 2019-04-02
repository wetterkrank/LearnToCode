#include "stdio.h"

int main()
{
    int arr[8] = {1, 1, 2, 3, 5, 8, 13, 21};

    size_t arrlen = sizeof(arr) / sizeof(int);
    int i = 0, sumW = 0, prodF = 1;

    while (i < arrlen)
    {
        sumW = sumW + arr[i];
        i = i + 1;
    };

    for (i = 0; i < arrlen; i = i + 2)
    {
        prodF = prodF * arr[i];
    };

    printf("WHILE loop; Array sum: %d\n", sumW);
    printf("FOR loop; Array product: %d\n", prodF);
};