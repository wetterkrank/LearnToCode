// Task: http://boundvariable.org/task.shtml
// Max program length: UINT_MAX

#include "stdio.h"
#include "stdlib.h"
#include "arpa/inet.h"
//////WE WANT TO MERGE!!!!
int bitPrint (unsigned num)
{
  unsigned int size = sizeof(unsigned int);
  unsigned int maxPow = 1<<(size*8-1);
  int pos=0;
  for(;pos<size*8;++pos){
      // print last bit and shift left
      printf("%u",num&maxPow ? 1 : 0);
      num = num<<1;
  }
  printf("\n");
}

int getOperator(unsigned instruction, int* op, int* A, int* B, int* C, unsigned* V)
// reads specified bits of the instruction
{
    *op = (instruction & 0xf0000000) >> 28; // bits 28-32
    if (*op != 13) {
        *C = (instruction & 7); // bits 1-3
        *B = (instruction & 56) >> 3; // bits 4-6
        *A = (instruction & 448) >> 6; // bits 7-9
    }
    else {
        *A = (instruction & 234881024) >> 25; // bits 26-28 (mask 2^25+2^26+2^27)
        *V = (instruction & 33554431); // bits 1-25
    };
    return 0;
};

void amendArrayListSize(unsigned *arrCount, unsigned **arrList, unsigned id, unsigned newSize)
{
    (*arrList)[id] = newSize;
    printf("List size for array %d set to %d\n", id, newSize);
};

void expandArrayList(unsigned *arrCount, unsigned **arrList)
// add 1 new record to the list, increase arrayCount by 1
{
    // printf("Expanding the list; arrCount: %d\n", *arrCount);
    unsigned newListLen = *arrCount + 1;

    if (*arrCount == 0)
    {
        // calloc to init the array list
        *arrList = calloc(newListLen, sizeof(unsigned));
        if (*arrList == NULL) exit(2);
        // printf("New array list init done\n");
    }
    else
    {
        // realloc to add 1 position and init values
        *arrList = realloc(*arrList, newListLen*sizeof(unsigned));
        if (*arrList == NULL) exit(2);
    }

    *arrCount = *arrCount + 1;
    // printf("List expanded; new arrCount: %d\n", *arrCount);
};

int addArray(unsigned *arrCount, unsigned **arrList, unsigned ***arr, unsigned newArrSize)
{
    // printf("\nAdding an array; arrCount: %d, newArrSize: %d\n", *arrCount, newArrSize);

    (*arr)[*arrCount] = calloc(newArrSize, sizeof(unsigned)); //todo: look for reusable slots and arr resize
    if ((*arr)[*arrCount] == NULL) exit(2); // for simplicity exiting right away

    expandArrayList(arrCount, arrList);
    unsigned newArrIndex = *arrCount - 1;
    (*arrList)[newArrIndex] = newArrSize;
    // printf("New array size in the list: %d\n", (*arrList)[newArrIndex]);

    return newArrIndex; // todo: reuse old slots
};

int dropArray(unsigned *arrCount, unsigned **arrList, unsigned ***arr, unsigned id)
{
    printf("Removing array; arrCount: %d, id to remove: %d\n", *arrCount, id);

    free((*arr)[id]);
    amendArrayListSize (arrCount, arrList, id, 0);
};


int main (void) {

    // get UM file size; note: no error handling for file ops
    FILE* fp = fopen("sandmark.umz", "rb");
    fseek(fp, 0L, SEEK_END);
    unsigned fsize = ftell(fp);
    rewind(fp);

    // init controls
    unsigned arrCount = 0; // number of arrays we have
    unsigned *arrList; // to keep the array lengths
    unsigned **arr; // a kind of jagged array of arrays
    arr = calloc(arrCount,sizeof(unsigned));
    if (arr == NULL) exit(1);
    unsigned newArrayNum = addArray(&arrCount, &arrList, &arr, fsize/sizeof(unsigned)); // no check for proper file size
    unsigned *regs; // 8 registers
    regs = calloc(8, sizeof(unsigned));
    if (regs == NULL) exit(1);
    unsigned progID = 0; // which array to execute now
    unsigned pos = 0; // instruction to execute

    // read the file into the 0 array
    fread(arr[0], sizeof(unsigned), fsize/sizeof(unsigned), fp);
    fclose(fp);

    do
    {
        // printf("Array id: %d, length: %d, start pos: %d\n", progID, arrList[progID], pos);
        // getchar();

        unsigned value;
        int operator, A, B, C;

        // loop through the instructions
        for (; pos < arrList[progID]; pos++)
        {
            #ifdef DEBUG
                printf("4 bytes, l'l endian: "); bitPrint(arr[progID][pos]);
            #endif

            unsigned int instruction = htonl(arr[progID][pos]); // 4 bytes to big endian
            getOperator(instruction, &operator, &A, &B, &C, &value);

            //#ifdef DEBUG
                //printf("4 bytes, big endian: "); bitPrint(instruction);
                if (operator == 13) printf("%d. op: %d, Val %d -> reg %d\n", pos, operator, value, A);
                else printf("%d. op: %d, reg %d: %d, reg %d: %d, reg %d: %d\n", pos, operator, A, regs[A], B, regs[B], C, regs[C]);               
            //#endif

            switch (operator) 
            {
                case 0:
                    if (regs[A] != 0) regs[B] = regs[C];
                    break;
                case 1:
                    // looks like we need to convert stuff to big endian here
                    // printf("Getting the cell %d from array %d, value: 0x%x\n", regs[C], regs[B], htonl(arr[regs[B]][regs[C]]));
                    regs[A] = htonl(arr[regs[B]][regs[C]]);
                    break;
                case 2:
                    // and to little endian here, before writing to array
                    arr[regs[A]][regs[B]] = ntohl(regs[C]);
                    break;
                case 3:
                    regs[A] = (regs[B] + regs[C]) & 0xFFFFFFF; // % 2^32, % 0x100000000 -- to prevent overflow?
                    break;
                case 4:
                    regs[A] = (regs[B] * regs[C]) & 0xFFFFFFF;
                    break;
                case 5:
                    // printf("Dividing %d by %d...\n", regs[B], regs[C]);
                    regs[A] = regs[B] / regs[C];
                    break;
                case 6:
                    regs[A] = ~regs[B] | ~regs[C];
                    printf("NAND: ~%d | ~%d = %d -> reg %d\n", regs[B], regs[C], regs[A], A);

                    break;
                case 7:
                    exit(0);
                case 8:
                    regs[B] = addArray(&arrCount, &arrList, &arr, regs[C]); 
                    break;
                case 9:
                    dropArray(&arrCount, &arrList, &arr, regs[C]);
                    break;
                case 10:
                    printf("%c", regs[C]);
                    break;
                case 11:
                    break;
                case 12:
                    // printf("%d: Execute array %d, position %d\n", pos, regs[B], regs[C]);
                    progID = regs[B];
                    pos = regs[C];
                    break;
                case 13:
                    regs[A] = value;
                    break;
            };

            if (operator == 12) break; // restart the spin with the set progID and pos

        }; // execution loop
    }
    while (pos < arrList[progID]); // run another program until we reach the end

    return 0;
};
