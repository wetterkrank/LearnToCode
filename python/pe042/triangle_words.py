# Task: https://projecteuler.net/problem=42

def value(string):
    val = 0
    for ch in string:
        val += ord(ch)-64
    return val

def triangle(num):
    return int(0.5*num*(num+1))

with open('p042_words.txt') as f:
    WORDS = f.read().replace('"', '').split(',')
VALUES = {word:value(word) for word in WORDS}
# print(VALUES)

MAX_VAL = max(VALUES.values())
# print(MAX_VAL)

i = 1
TRIANGLES = []
while triangle(i) <= MAX_VAL:
    TRIANGLES.append(triangle(i))
    i = i+1
# print(TRIANGLES)

count = 0
for word in VALUES:
    if VALUES[word] in TRIANGLES:
        count = count + 1
print(count)