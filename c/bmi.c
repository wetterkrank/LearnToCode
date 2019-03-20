#include "stdio.h"

float calcBMI(float h, float w) {
    return (w/(h*h)*10000);
};

int main() {

    float height, weight;

    printf("Enter your height in cm: ");
    scanf("%f", &height);

    printf("Enter your weight in kg: ");
    scanf("%f", &weight);

    float BMI = calcBMI(height, weight);
    printf("BMI: %.1f \n", BMI);

    if (BMI >= 25) {
        printf("Your BMI is too high (over 25)\n");
    } else if (BMI >= 18.5 && BMI < 25) {
        printf("Your BMI is within normal limits (18.5 - 25)\n");
    } else {
        printf("Your BMI is too low (under 18.5)\n");
    };

};