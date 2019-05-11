// The task: write a mergesort function that accepts the same parameters as qsort
// (array pointer, array length, array element size, comparison function pointer)

#include "stdio.h"
#include "stdlib.h"

void prIntArray(int array[], int low, int high)
{
    for (int i = low; i <= high; i++)
    {
        printf("%d ", array[i]);
    };
    printf("\n");
};

int compareInt(const void *arg1, const void *arg2)
{

    int *first = (int *)arg1;
    int *second = (int *)arg2;

    if (*first > *second)
    {
        return 1;
    }
    else if (*first < *second)
    {
        return -1;
    }
    else
    {
        return 0;
    };
};

// merges 2 sorted "halves" of a sub-array between low and high
void merge(int *arr, int low, int high, int (*compare)(const void *, const void *))
{

    int len = high - low + 1;              // length of the temp array
    int *arr2 = malloc(sizeof(int) * len); // temp array

    int mid = (low + high + 1) / 2; // starting index of the 2nd half: (0,7) => 4

    int i = low;
    int j = mid;
    int pos; // pos in the main array

    printf("Merge start, i: %d, j: %d, mid: %d\n", i, j, mid);
    prIntArray(arr, low, high);

    for (pos = low; pos <= high; pos++)
    {
        if (j > high)
        { // the 1st half is through
            arr2[pos - low] = arr[i];
            printf("pos: %d, i: %d, j: %d, >%d\n", pos, i, j, arr2[pos - low]);
            i++;
        }
        else
        {
            if (i == mid)
            { // the 2nd half is through
                arr2[pos - low] = arr[j];
                printf("pos: %d, i: %d, j: %d, >%d\n", pos, i, j, arr2[pos - low]);
                j++;
            }
            else
            {
                int compareResult = compare(&arr[i], &arr[j]);
                printf("COMPARE %d and %d: %d\n", arr[i], arr[j], compareResult);
                if (compareResult < 1)
                {
                    arr2[pos - low] = arr[i];
                    printf("pos: %d, i: %d, j: %d, >%d\n", pos, i, j, arr2[pos - low]);
                    i++;
                }
                else
                {
                    arr2[pos - low] = arr[j];
                    printf("pos: %d, i: %d, j: %d, >%d\n", pos, i, j, arr2[pos - low]);
                    j++;
                }
            }
        }
    }

    for (pos = low; pos <= high; pos++) // copy the temp array into the global one
    {
        arr[pos] = arr2[pos - low];
    }

    free(arr2);
}

void sort(int *arr, int low, int high, int (*compare)(const void *, const void *))
{

    static int i;
    i++;
    printf("\ni: %d\n", i);

    int mid = (low + high + 1) / 2; // (1,2) => 2 i.e. starting index of the 2nd half
    printf("low: %d, high: %d, mid: %d\n", low, high, mid);

    if (high == low)
    {
        printf("1 cell reached\n");
        return;
    }

    sort(arr, low, mid - 1, compare); // break down 1st half
    sort(arr, mid, high, compare);    // break down 2nd half

    merge(arr, low, high, compare); // when we have 2 sorted halves, merge them
}

void mergesort(int *arr, int len, int element_size, int (*compare)(const void *, const void *))
{

    // define the starting indexes
    int low = 0;
    int high = len - 1;

    printf("low: %d, high: %d\n", low, high);

    sort(arr, low, high, compare);
}

int main()
{

    int array[9] = {3, 10, 9, 5, 4, 8, 6, 3, 1};
    //int array[1] = {1};
    //int array[2] = {2, 1};
    //int array[3] = {3, 2, 1};

    size_t len = sizeof(array) / sizeof(array[0]);

    mergesort(&array[0], len, sizeof(array[0]), compareInt);

    //sort (c, 0, 2);
    //merge (a, 0, 7);
    //merge (b, 0, 1);
    //merge (c, 0, 2);

    prIntArray(&array[0], 0, len - 1); // print array from pos 0 to last
    //prIntArray(array, 0, 1); // print array b[2]
    //prIntArray(array, 0, 2);
}