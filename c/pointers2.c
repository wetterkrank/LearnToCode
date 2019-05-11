// Task: write a compare function to be used in qsort; arguments can be of any type

#include "stdio.h"
#include "stdlib.h"

int reverse_sorter (const void *arg1, const void *arg2) {

    int* first = (int*)arg1;
    int* second = (int*)arg2;

    if (*first < *second) {
        return 1;
    } else if (*first > *second) {
        return -1;
    } else {
        return 0;
    };

};

void prIntArray (int array[], size_t size) {
    for (int i = 0; i < size; i++) {
        printf ("%d ",array[i]);
    };
    printf("\n");
};

int main() {

    int array[10] = {3,5,1,7,2,7,6,0,8,4};

    size_t size = sizeof(array)/sizeof(array[0]);

    qsort(&array, size, sizeof(array[0]), &reverse_sorter);
    prIntArray(array, size);

};
