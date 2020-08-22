# Task: https://projecteuler.net/problem=2
# By considering the terms in the Fibonacci sequence whose values do not exceed four million, 
# find the sum of the even-valued terms.

# TODO: first generate the list, then reduce?

def fibonacci_evens_sum(top):
    n1 = 1
    n2 = 2
    evens_sum = 0

    while n2 <= top:
        # print (f'n1: {n1}, n2: {n2}, evens_sum: {evens_sum}')
        tmp = n2
        n2 += n1
        n1 = tmp
        if n1 % 2 == 0:
            evens_sum += n1
    return evens_sum


def fibonacci_evens_sum2(top, n1, n2, n_sum):
    # print (f'n1: {n1}, n2: {n2}, n_sum: {n_sum}')
    if n1 <= top:
        if n1 %2 == 0:
            n_sum += n1
        return fibonacci_evens_sum2(top, n2, n1+n2, n_sum)
    else:
        return n_sum


if __name__ == '__main__':

    assert fibonacci_evens_sum(4000000) == 4613732, 'the PE problem #2 answer is 4613732'
    assert fibonacci_evens_sum2(4000000, 1, 2, 0) == 4613732, 'the PE problem #2 answer is 4613732'

    print(fibonacci_evens_sum(4000000))
    print(fibonacci_evens_sum2(4000000, 1, 2, 0))