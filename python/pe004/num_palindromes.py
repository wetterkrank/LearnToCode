# A palindromic number reads the same both ways.
# The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
# Find the largest palindrome made from the product of two 3-digit numbers.

max_p = 0
max_i = 0
max_j = 0

for i in range(100, 1000):
    for j in range(i, 1000):
        if str(i*j) == str(i*j)[::-1]:
            # print(i*j)
            if i*j > max_p:
                max_p = i*j
                max_i = i
                max_j = j

print(max_p, '('+str(max_i)+'*'+str(max_j)+')')
