#include "stdio.h"

// take a pointer, extract value, return value * 2
int multiplyValueBy2(int *argPointer)
{
    return *argPointer * 2;
};

// take a pointer, rewrite value with value * 2, return nothing
void multiplyVarBy2(int *argPointer)
{
    *argPointer = *argPointer * 2;
};

int main()
{

    int a = 42;

    int b = multiplyValueBy2(&a);
    printf("%d\n", b);

    multiplyVarBy2(&a);
    printf("%d\n", a);
};
