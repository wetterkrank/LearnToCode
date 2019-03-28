function BB(str, sum = 0) {

  if (str.length == 0) {
    return (sum == 0);
  };

  if (str.charAt(0) == '(') { sum++; };
  if (str.charAt(0) == ')') { sum--; };

  if (sum < 0) {
    return false;
  };

  return BB(str.substring(1), sum);

};

console.log(BB('()'));
console.log(BB('(a)bc'));
console.log(BB(')('));
