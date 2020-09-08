const My = require('./mymodule');
const Math = require('./math')
const Faker = require('faker');


console.log(My);
console.log(My.Notreallyhidden)

console.log(Faker.name.findName());

console.log(Math.sum(1, 2));
console.log(Math.sub(5, 3));
