#include <stdio.h>
#include <stdint.h>
#include <limits.h>
#include <arpa/inet.h>
#include <errno.h>
#include <math.h>

// Some useful links
// http://progslides.github.io/ws15/bitmask/bitmask.html

// variant 1, from https://jameshfisher.com/2017/02/23/printing-bits/

void print_byte_as_bits(char val) {
  for (int i = 7; 0 <= i; i--) {
    printf("%c", (val & (1 << i)) ? '1' : '0');
  }
}

void print_bits(char * ty, char * val, unsigned char * bytes, size_t num_bytes) {
  printf("(%*s) %*s = [ ", 15, ty, 16, val);
  for (size_t i = 0; i < num_bytes; i++) {
    print_byte_as_bits(bytes[i]);
    printf(" ");
  }
  printf("]\n");
}

#define SHOW(T,V) do { T x = V; print_bits(#T, #V, (unsigned char*) &x, sizeof(x)); } while(0)

// variant 2, recursive

void bin(unsigned num)
{
    if (num > 1)
        bin (num/2);

    printf("%d", num%2);
}

// variant 3, with bitshift, from StackOverflow

void bitPrint(unsigned num)
{
  unsigned int size = sizeof(unsigned int);
  unsigned int maxPow = 1<<(size*8-1);
  int i=0;
  for(;i<size*8;++i){
      // print last bit and shift left.
      printf("%u",num&maxPow ? 1 : 0);
      num = num<<1;
  }
  printf("\n");
}

// variant 4, naive, msb first

void myBitPrint(unsigned num)
{
    for (int bit=31; bit>=0; bit--)
    {
        unsigned divider = pow (2, bit);
        unsigned bitstate = num / divider;
        
        if (bitstate > 0) 
        {
          printf("1");
          num = num - divider;
        }
        else
          printf("0");
    }
    printf("\n");
}

int main() {

    printf("\nvar 1\n");
    SHOW(int, 0);
    SHOW(int, 1);
    SHOW(int, 17);
    SHOW(int, -17);
    SHOW(int, 256);
    SHOW(unsigned int, 17);
    SHOW(unsigned int, -17);  // no compiler error!
    SHOW(unsigned int, UINT_MAX);
    SHOW(unsigned int, UINT_MAX+1);
    SHOW(uint32_t, 17);
    SHOW(uint32_t, htonl(17));
    SHOW(unsigned int, 1 << 1);
    SHOW(unsigned int, 1 << 2);
    SHOW(unsigned int, 1 << 4);
    SHOW(unsigned int, 1 << 8);
    SHOW(unsigned int, 1 << 16);
    SHOW(unsigned int,0xdc0074);
    SHOW(unsigned int,htonl(0xdc0074));

    printf("\nvar 2 \n");
    printf("        17: "); bitPrint(17);
    printf("      0xf1: "); bitPrint(0xf1);
    printf("       240: "); bitPrint(240);
    printf("0xdc000074: "); bitPrint(0xdc000074);

    printf("\nvar 3 \n");
    printf("        17: "); bin(17); printf("\n");
    printf("      0xf1: "); bin(0xf1); printf("\n");
    printf("       240: "); bin(240); printf("\n");
    printf("0xdc000074: "); bin(0xdc000074); printf("\n");

    printf("\nvar Naive\n");
    printf("0xdc0074:   "); myBitPrint(0xdc0074);

    printf("\nmasks for 0xdc000074\n\n");
    printf("       1-3: "); bitPrint(0xdc000074 & 7); // bits 1-3
    printf("  4-5 >> 3: "); bitPrint((0xdc000074 & 56) >> 3); // bits 4-6
    printf("  7-9 >> 6: "); bitPrint((0xdc000074 & 448) >> 6); // bits 7-9
    
    printf("26-28 >>25: "); bitPrint ((0xdc000074 & 234881024) >> 25); // bits 26-28, mask 2^25+2^26+2^27
    printf(" mask 1-25: "); bitPrint (33554431); // bits 1-25
    printf("      1-25: "); bitPrint (0xdc000074 & 33554431); // bits 1-25

  return 0;
}