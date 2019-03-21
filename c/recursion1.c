#include "stdio.h"

int verse () {
    printf("у попа была собака, он её любил\nона съела кусок мяса, он её убил\n");
    printf("в землю закопал\nи надпись написал, что ");
    verse();
};

int main () {
    verse();
};