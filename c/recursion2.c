#include "stdio.h"

char plural_ending(int n)
{
    if (n != 1)
    {
        return ('s');
    }
    else
    {
        return ('\0');
    };
};

int bottles(int i)
{
    if (i > 0)
    {
        printf("%d bottle%c of beer on the wall, %d bottle%c of beer.\n", i, plural_ending(i), i, plural_ending(i));
        printf("Take one down, pass it around, %d bottle%c of beer on the wall...\n", i - 1, plural_ending(i - 1));
        bottles(i - 1);
    }
    else
    {
        printf("No more bottles of beer on the wall, no more bottles of beer.\n");
        printf("We've taken them down and passed them around; now we're drunk and passed out!\n");
    };

    return 0;
};

int main()
{
    bottles(99);
};