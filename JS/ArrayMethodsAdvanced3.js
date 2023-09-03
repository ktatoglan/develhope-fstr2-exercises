function calculateAverageAge(persons) {
  if (persons.length === 0) {
    return 0;
  }
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  return totalAge / persons.length;
}

const persons = [
  { name: "Paul", age: 16 },
  { name: "George", age: 17 },
  { name: "Lucas", age: 21 },
  { name: "Marco", age: 32 },
  { name: "Peter", age: 18 },
  { name: "Carl", age: 13 },
  { name: "Simon", age: 24 },
  { name: "Mark", age: 15 },
  { name: "Sandra", age: 34 },
  { name: "Alice", age: 28 },
];

const average = calculateAverageAge(persons);

console.log("All Persons:");
console.log(persons);

console.log("Average Age:");
console.log(average);
