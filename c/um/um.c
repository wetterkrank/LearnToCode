// Task: http://boundvariable.org/task.shtml

#include "stdio.h"

void printUIntArr(const void *array, long len)
{
    unsigned *arrayInt = (unsigned *)array;
    for (long i = 0; i < len; i++)
    {
        printf("%d: %u \n", i, arrayInt[i]);
    };
    printf("\n");
};

void printChArr(const void *array, long len)
{
    char *arrayChar = (char *)array;
    for (long i = 0; i < len; i++)
    {
        printf("%d: %c \n", i, arrayChar[i]);
    };
}

int main (void) {

    // file ops: no error-checking
    FILE* fp = fopen("um.um", "rb");
    fseek(fp, 0L, SEEK_END);
    long fsize = ftell(fp);
    rewind(fp);

    printf("um.um size: %d\n",fsize);

    char umArray[fsize];
    fread(umArray, 1, fsize, fp);
    fclose(fp);

    // printChArr(umArray, fsize);
    printUIntArr(umArray, fsize/sizeof(unsigned));

};