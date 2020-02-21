// Task: http://boundvariable.org/task.shtml
// Max UM program length: UINT_MAX

#include "stdio.h"
#include "arpa/inet.h"

int bitPrint (unsigned num)
{
  unsigned int size = sizeof(unsigned int);
  unsigned int maxPow = 1 << (size*8-1);
  int i=0;
  for(; i<size*8; ++i){
      // print last bit and shift left
      printf("%u",num & maxPow ? 1 : 0);
      num = num << 1;
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

int spinCycle(unsigned int *array, unsigned len)
{
    // init
    unsigned registers[8] = {0};
    unsigned value;
    int operator, regA, regB, regC;

    for (unsigned i = 0; i < len; i++)
    {
        #ifdef DEBUG
            printf("4 bytes, l'l endian: "); bitPrint(array[i]);
        #endif

        unsigned int instruction = htonl(array[i]); // 4 bytes to big endian

        getOperator(instruction, &operator, &regA, &regB, &regC, &value);

        #ifdef DEBUG
            printf("4 bytes, big endian: "); bitPrint(instruction);
            if (operator == 13)
                printf("%d. op: %d, C: %d, Val: %d (%c)\n", i, operator, regC, value, value);
            else
                printf("%d. op: %d, A: %d, B: %d, C: %d\n", i, operator, regA, regB, regC);               
        #endif

        if (operator == 7 )
            printf("%d. op: %d, A: %d, B: %d, C: %d\n", i, operator, regA, regB, regC);               
        
    };
};

int main (void) {

    // note: no error handling for file ops
    FILE* fp = fopen("um.um", "rb");
    fseek(fp, 0L, SEEK_END);
    long fsize = ftell(fp);
    rewind(fp);
    
    // read the file into an array
    unsigned zeroArray[fsize];
    fread(zeroArray, sizeof(zeroArray[0]), fsize/sizeof(zeroArray[0]), fp);
    fclose(fp);

    // loop through the instructions
    spinCycle (zeroArray, fsize/sizeof(zeroArray[0]));

    return 0;
};