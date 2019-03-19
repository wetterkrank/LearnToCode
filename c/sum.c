#include "stdio.h"

int sum2args(int arg1, int arg2) {
    return(arg1+arg2);
};

int main() {

    int a1 = 200;
    int a2 = 300;

    printf("%d \n", sum2args(a1,a2));
};