# Task: https://projecteuler.net/problem=3

import math
PRIMES_TO_1000 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]

# Sifting for primes; this needs a speed-up
def find_primes(max):

    i = 7
    primes_and_filters = {2: 8, 3: 9, 5: 10, 7: 14}

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

# Trial division method
def find_prime_factors(num):
    primes = find_primes(math.floor(math.sqrt(num)))
    factors = []
    for prime in primes:
        if num % prime == 0:
            factors.append(prime)
    return factors


if __name__ == '__main__':

    # A couple of tests first
    assert find_primes(1000) == PRIMES_TO_1000, 'Primes up to 1000 should test out'
    assert find_prime_factors(13195) == [5, 7, 13, 29], 'The prime factors of 13195 are 5, 7, 13 and 29'

    print(find_prime_factors(600851475143))