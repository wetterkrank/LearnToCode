# Task: https://projecteuler.net/problem=3

import math

def find_factors(factors):
    for i in range (2, int(math.sqrt(factors[0])) + 1):
        if factors[0] % i == 0:
            factors.append(i)
            factors[0] = int(factors[0]/i)
            find_factors(factors)
            break
    return

if __name__ == '__main__':
    factors = [600851475143]
    find_factors(factors)
    print(factors[0])
