function balancedBrackets(str, sum = 0) {

  if (str.length == 0) { return (sum == 0); }

  if (str.charAt(0) == '(') { sum++; }
  if (str.charAt(0) == ')') { sum--; }

  if (sum < 0) { return false; }

  return balancedBrackets(str.substring(1), sum);

}

console.log(balancedBrackets('()'));
console.log(balancedBrackets(')('));
console.log(balancedBrackets('(a)bc'));
