const Math = require('./index');

test("Sum: returns 3 for 1, 2", () => {
    expect(Math.sum(1, 2)).toBe(3);
});

test("Sub: returns 2 for 5, 3", () => {
    expect(Math.sub(5, 3)).toBe(2);
});