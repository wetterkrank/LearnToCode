// The task: write a mergesort function that accepts the same parameters as qsort
// (array pointer, number of array elements, array element size, comparison function pointer)

#include "stdio.h"
#include "stdlib.h"

void outInt(const void *array, int len)
{
    int *arrayInt = (int *)array;
    for (int i = 0; i < len; i++)
    {
        printf("%d ", arrayInt[i]);
    };
    printf("\n");
};

void outChar(const void *array, int len)
{
    char *arrayChar = (char *)array;
    printf("%s\n", arrayChar);
}

int compareInt(const void *arg1, const void *arg2)
{

    int *first = (int *)arg1;
    int *second = (int *)arg2;

    //printf("Comparing %d and %d, result: ", *first, *second);

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

int compareChar(const void *arg1, const void *arg2)
{
    char *first = (char *)arg1;
    char *second = (char *)arg2;

    //printf("Comparing %c and %c, result: ", *first, *second);

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

}

// merges 2 sorted "halves" of a sub-array between low and high indexes
void merge(char *arr, int low, int high, const int el_size, int (*compare)(const void *, const void *))
{

    int len = high - low + 1; // number of elements (not bytes) in the temp array
    char arr2[el_size * len];

    int mid = (low + high + 1) / 2; // starting index of the 2nd half: (0,7) => 4

    int i = low;
    int j = mid;
    int pos; // pos in the main array

    //printf("Merge start, i: %d, j: %d, mid: %d\n", i, j, mid);

    for (pos = low; pos <= high; pos++)
    {
        if (j > high) // the 1st half has no more elements
        {
            for (int k = 0; k < el_size; k++)
            {
                arr2[(pos - low) * el_size + k] = arr[i * el_size + k];
            }
            i++;
        }
        else
        {
            if (i == mid) // the 2nd half has no more elements
            {
                for (int k = 0; k < el_size; k++) {
                    arr2[(pos - low) * el_size + k] = arr[j * el_size + k];
                }
                j++;
            }
            else
            {
                char cmp1[el_size];
                char cmp2[el_size];
                for (int k = 0; k < el_size; k++) {
                    cmp1[k] = arr[i * el_size + k];
                    cmp2[k] = arr[j * el_size + k];
                }

                int compareResult = compare(cmp1, cmp2);
                //printf("%d\n", compareResult);

                if (compareResult < 1)
                {
                    for (int k = 0; k < el_size; k++) {
                        arr2[(pos - low) * el_size + k] = arr[i * el_size + k];
                    }    
                    i++;
                }
                else
                {
                    for (int k = 0; k < el_size; k++) {
                        arr2[(pos - low) * el_size + k] = arr[j * el_size + k];
                    }
                    j++;
                }
            }
        }
    }

    for (pos = low; pos <= high; pos++) // copy the temp array onto the source one
    {
        for (int k = 0; k < el_size; k++) {
            arr[pos * el_size + k] = arr2[(pos - low) * el_size + k];
        }
    }

}

void sort(char *arr, int low, int high, int el_size, int (*compare)(const void *, const void *))
{

    int mid = (low + high + 1) / 2; // (1,2) => 2 i.e. starting index of the 2nd half
    //printf("Splitting, low: %d, high: %d, mid: %d\n", low, high, mid);

    if (high == low)
    {
        //printf("Split done, 1 element reached\n");
        return;
    }

    sort(arr, low, mid - 1, el_size, compare); // break down 1st half
    sort(arr, mid, high, el_size, compare);    // break down 2nd half

    merge(arr, low, high, el_size, compare); // when we have 2 sorted halves, merge them
}

void mergesort(void *arr, int len, int element_size, int (*compare)(const void *, const void *))
{

    // reinterpret the array as a byte string
    char *charr = (char *) arr;

    // define the starting indexes
    int low = 0;
    int high = len - 1;

    sort(charr, low, high, element_size, compare);

}

int main()
{
    // integers
    int arrayInt[9] = {3, 10, 9, 5, 4, 8, 6, 3, 1};
    int len = sizeof(arrayInt) / sizeof(arrayInt[0]);
    mergesort(arrayInt, len, sizeof(arrayInt[0]), compareInt);
    outInt(arrayInt, len);

    // chars
    char arrayChar[6] = "cbdaef";
    len = sizeof(arrayChar) / sizeof(arrayChar[0]);
    mergesort(arrayChar, len, sizeof(arrayChar[0]), compareChar);
    outChar(arrayChar, len);

}