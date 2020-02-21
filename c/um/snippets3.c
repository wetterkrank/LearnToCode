// "array of arrays" with dynamic memory allocation study

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {

    srand(time(NULL));

    unsigned ArrayCount = 3;

    unsigned *ArrayIndex = calloc(ArrayCount,sizeof(unsigned));
    if (ArrayIndex == NULL) return 1;

    unsigned **Arrays = calloc(ArrayCount,sizeof(unsigned));
    if (Arrays == NULL) return 1;

    for (int i=0; i<ArrayCount; i++)
    {
        ArrayIndex[i] = (rand()%10)+1;
        Arrays[i] = calloc(ArrayIndex[i],sizeof(unsigned));
    }

    for (int i=0; i<ArrayCount; i++)
    {
        for (int j=0; j<ArrayIndex[i]; j++)
        {
            printf("%d", Arrays[i][j]);
        }
        printf("\n");
    }

    return 0;
}