function isPalindrome(str) {

    //debug: console.log(str, ' ', str.length);

    if (str.length > 1) {

        if (ignore.test(str.charAt(0))) {
            return (isPalindrome(str.substring(1)));
        };
        if (ignore.test(str.charAt(str.length - 1))) {
            return (isPalindrome(str.substring(0, str.length - 1)));
        };

        if (str[0].toLowerCase() == str[(str.length - 1)].toLowerCase()) {
            return (isPalindrome(str.substring(1, str.length - 1)));
        } else {
            return false;
        };

    } else {
        return true;
    };
};

var ignore = /[.,:;?!`'-()" ]/;

console.log("ab:", isPalindrome("ab"));
console.log("abcabc:", isPalindrome("abcabc"));
console.log("abccba:", isPalindrome("abccba"));
console.log("Madam, I'm Adam:", isPalindrome("Madam, I'm Adam"));
console.log("Лазер Боре хер обрезал:", isPalindrome("Лазер Боре хер обрезал"));