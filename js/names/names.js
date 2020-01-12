// Read names.txt and count lines, see readme.txt
// Not using callbacks though

const fs = require('fs');
const readline = require('readline');

// open the file
const file = fs.createReadStream('names.txt', {encoding: 'utf8'});
const rl = readline.createInterface ({
    input: file,
});

// counters
var lineCounter = 0;
var fiveCharCounter = 0;
var azOnlyCounter = 0;
var sequenceCounter = 0;

// on each read line event
rl.on('line', (line) => {
    lineCounter++;
    if (/^.{5}$/.test(line)) fiveCharCounter++;
    if (/^[a-z]*$/.test(line)) azOnlyCounter++;
    if (/^[A-Z][a-z]+[0-9!?.,;\-]+$/.test(line)) sequenceCounter++;
});

// when the end is reached (because line events are async)
rl.on('close', ()  => {
    console.log('Lines:', lineCounter);
    console.log('5-char logins:', fiveCharCounter);
    console.log('a-z only logins:', azOnlyCounter);
    console.log('complex logins:', sequenceCounter);
});
