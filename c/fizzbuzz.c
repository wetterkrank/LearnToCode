#include <stdio.h>

void main() {
    int i;
    for (i=1; i<=100; i++) {
        int fizz = 0;
        int buzz = 0;
        if (i % 3 == 0) { fizz = 1; printf("Fizz"); }
        if (i % 5 == 0) { buzz = 1; printf("Buzz"); }
        if (!fizz & !buzz) printf("%d", i);
        printf("\n");
    }
}