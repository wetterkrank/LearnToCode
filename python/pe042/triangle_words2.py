# Task: https://projecteuler.net/problem=42

import math

def value(string):
    val = 0
    for ch in string:
        val += ord(ch)-64
    return val

def is_triangle(num):
    D = 1 + 8*num
    if D >= 9:
        return bool(math.sqrt(D).is_integer())
    return False

with open('p042_words.txt') as f:
    WORDS = f.read().replace('"', '').split(',')
VALUES = {word:value(word) for word in WORDS}

count = 0
for word in VALUES:
    if is_triangle(VALUES[word]):
        count = count + 1
print(count)