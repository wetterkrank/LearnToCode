# Task: https://projecteuler.net/problem=59

ASCII = range(32, 122 + 1)
COMMON_WORD = 'the'

def next_pwd(pwd, start_pwd, stop_pwd):
    carry_over = False
    for i, v in enumerate(pwd):
        if carry_over:
            pwd[i-1] = start_pwd[i-1]
        if v < stop_pwd[i]:
            pwd[i] += 1
            break
        else:
            carry_over = True
            continue
    return pwd

def make_full_key(pwd, key_length):
    key = []
    i = 0
    while i < key_length:
        for c in pwd:
            key.append(c)
            i += 1
            if i >= key_length: 
                break
    return key

def to_string(ascii_list):
    line = ''
    for x in ascii_list:
        line = line + chr(x)
    return line

def to_list(line):
    return [ord(ch) for ch in line]

def bruteforce(cipher_file, pwd_from, pwd_to):
    pwd_from = to_list(pwd_from)
    pwd_to = to_list(pwd_to)

    with open(cipher_file) as f:
        cipher = [int(x) for x in f.read().split(',')]

    cipher_length = len(cipher)
    pwd = pwd_from.copy()
    combinations = (pwd_to[0]-pwd_from[0])**len(pwd_from)

    for _ in range(combinations-1):
        key = make_full_key(pwd, cipher_length)
        candidate = list(map(lambda c, k: c ^ k, cipher, key))
        if min(candidate) in ASCII and max(candidate) in ASCII:
            if to_string(candidate).find(COMMON_WORD) >= 0:
                # print("Deciphered text:")
                # print(to_string(candidate))
                return sum(candidate)
        pwd = next_pwd(pwd, pwd_from, pwd_to)

if __name__ == '__main__':
    assert to_list('abc') == [97, 98, 99]
    assert to_string([97, 98, 99]) == 'abc'
    assert make_full_key([1, 2, 3], 8) == [1, 2, 3, 1, 2, 3, 1, 2]
    assert next_pwd([122, 97, 97], to_list('aaa'), to_list('zzz')) == [97, 98, 97]

    print(bruteforce('p059_cipher.txt', 'aaa', 'zzz'))
