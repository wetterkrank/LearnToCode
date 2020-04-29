
// Task 1

var people = [{
    firstName: 'Dart',
    lastName: 'Veider',
    age: 70
}, {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
}, {
    firstName: 'Gandalf',
    lastName: 'Grey',
    age: 300
}, {
    firstName: 'Peter',
    lastName: 'Pan',
    age: 12
}, {
    firstName: 'Harry',
    lastName: 'Potter',
    age: 11
}
];
console.log(people);

// simple example of a callback
const print = (person, index) => {
    console.log(person, index);
}
people.forEach(print);

// now let's map
const makeFullName = person => {
    return `${person.firstName} ${person.lastName}`
}
let fullNames = people.map(makeFullName);
console.log(fullNames);


// Task 2, https://www.codewars.com/kata/5b16490986b6d336c900007d

//var scores ={"Java": 10, "Ruby": 80, "Python": 65};
//var scores ={"C++": 50, "ASM": 10, "Haskell": 20};
var scores ={"Hindi": 60, "Dutch" : 93, "Greek": 71}; 

console.log("Input:", scores);

// forEach method not available for this kind of object:
// scores.forEach(function(value, index, array) {
//     return value;
// })

// this gives an unexpected result:
console.log("Unexpected results:");
for (let [key, value] in scores) {
    console.log(key, value);
}

// now let's try the method we heard of:
console.log("Object keys only: ", Object.keys(scores));
// this is already something, but there must be a better way!

// ok, let's read https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
let myResults = [];
for (let language in scores) {
    if (scores[language] > 60) {
        //myResults[language] = scores[language]; // this results in a "0-length array", i.e. object
        //myResults.push(language, scores[language]); // returns an array of consecutive elements
        myResults.push([language, scores[language]]); // this gives you an array of arrays, kinda close
    }
}
console.log("Learning to iterate:", myResults);

// wow, found a cooler Object method doing the same (?):
myResults = Object.entries(scores);

// now let's try to filter by score
const goodScore = entry => {
    return (entry[1] >= 60);
}
myResults = myResults.filter(goodScore);
console.log(myResults);

// and now sort by score
const byScore = (a, b) => {
    return b[1] - a[1];
}
myResults = myResults.sort(byScore);
console.log(myResults);

// convert it back to its original form; voila!
myResults = JSON.stringify(Object.fromEntries(myResults));
console.log(myResults);

// now read the requirements carefully and backtrack a bit
myResults = [];
// convert into array and filter in one step:
for (let language in scores) {
    if (scores[language] >= 60) {
        myResults.push([language, scores[language]]);
    }
}
// sort and keep only language names:
myResults = myResults.sort(byScore);
const languageOnly = entry => {
    return entry[0];
}
myResults = myResults.map(languageOnly);
console.log(myResults);
