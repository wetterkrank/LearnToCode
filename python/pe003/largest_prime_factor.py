# Task: https://projecteuler.net/problem=3

import math

# Sifting for primes; this needs a speed-up
def find_primes(max):
    i = 2
    primes_and_filters = {2: 4}
    print(f'Finding primes up to {max}...')
    while i < max:
        i += 1
        not_prime = False
        for k, v in primes_and_filters.items():
            if i == v:
                not_prime = True
                # not very efficient here, 11 -> 121 -> 132 -> ...
                primes_and_filters[k] = v + k
        if (not not_prime):
            primes_and_filters[i] = i*i
        primes = list(primes_and_filters.keys())
    print(f'Found {len(primes)}')
    return primes

# Going through the pre-generated primes list
def find_prime_factors(num):
    primes = find_primes(int(math.sqrt(num)))
    factors = []
    for prime in primes:
        if num % prime == 0:
            factors.append(prime)
    return factors


if __name__ == '__main__':
    assert find_prime_factors(13195) == [5, 7, 13, 29], 'The prime factors of 13195 are 5, 7, 13 and 29'
    print(find_prime_factors(600851475143))