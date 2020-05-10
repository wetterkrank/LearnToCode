let fizzCounter = 0;
let buzzCounter = 0;
for (let i = 1; i <= 100; i++) {

    fizzCounter++;
    buzzCounter++;

    if ((fizzCounter == 3) && (buzzCounter == 5)) 
    {
        console.log('FizzBuzz');
        fizzCounter = 0;
        buzzCounter = 0;
    }
    else if (fizzCounter == 3)
    {
        console.log('Fizz');
        fizzCounter = 0;
    }
    else if (buzzCounter == 5)
    {
        console.log('Buzz');
        buzzCounter = 0;
    }
    else console.log(i);
}