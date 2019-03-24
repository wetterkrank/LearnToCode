function isPalindrome(str) {

    if (str.length > 1) {

        if (str[0] == str[(str.length - 1)]) {
            return (isPalindrome(str.substring(1, str.length - 1)));
        } else {
            return false;
        };

    } else {
        return true;
    };
};

console.log("abcdcba:", isPalindrome("abcdcba"));
console.log("aaaaa:", isPalindrome("aaaaaa"));
console.log("abccba:", isPalindrome("abccba"));
console.log("abcabc:", isPalindrome("abcabc"));
