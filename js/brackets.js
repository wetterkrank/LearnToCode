function balancedBrackets(str) {

    if (str.length == 0) {
        // success if nothing left
        return true;
    } else {        
        if (str.charAt(0) != '(' && str.charAt(0) != ')') {
            // if the 1st character is not a bracket, strip it
            return balancedBrackets(str.substring(1));
        } else {
            // if str starts with any bracket, look for the closing one
            let closingBrPos = str.indexOf(')', 0);
            if (closingBrPos < 1) {
                // if str starts with ), fail
                return false;
            } else {
                // drop one pair of brackets
                return (balancedBrackets(str.substring(1, closingBrPos) + str.substring(closingBrPos + 1)));
            };
        };
    };
};

console.log(balancedBrackets(''));
console.log(balancedBrackets(' '));
console.log(balancedBrackets('()'));
console.log(balancedBrackets(' ()'));
console.log(balancedBrackets('() '));
console.log(balancedBrackets(' () '));

console.log(balancedBrackets('('));
console.log(balancedBrackets(')'));
console.log(balancedBrackets(')('));
console.log(balancedBrackets('))'));
console.log(balancedBrackets('(('));
console.log(balancedBrackets('())(()'));