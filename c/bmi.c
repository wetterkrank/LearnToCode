#include "stdio.h"
#include "math.h"

float calcBMI(int h, int w) {
    return (w/powf((float)h/100,2));
};

int main() {

    int height, weight;

    printf("Enter your height in cm: ");
    scanf("%d", &height);

    printf("Enter your weight in kg: ");
    scanf("%d", &weight);

    float BMI = calcBMI(height,weight);
    printf("BMI: %.1f \n", BMI);

    if (BMI >= 25) {
        printf("Your BMI is too high (over 25) \n");
    } else if (BMI >= 18.5 && BMI < 25) {
        printf("Your BMI is within normal limits (18.5 - 25)\n");
    } else if (BMI < 18.5) {
        printf("Your BMI is too low (under 18.5) \n");
    };

};