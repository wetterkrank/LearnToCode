// study of different recursion cases

function recursionA(i) {

    console.log(i);

    if (i > 0) {
        i = i - 1;
        return recursionA(i);
    }

    console.log('stop');

}

function recursionB(i) {

    console.log(i);

    if (i > 0) {
        i = i - 1;
        recursionB(i);
    }

    console.log('stop');

}

recursionA(5);
recursionB(5);
