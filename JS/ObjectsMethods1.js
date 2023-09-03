const person = {
  firstName: "Mario",
  lastName: "Rossi",
  age: 25,
};
const keys = Object.keys(person);
keys.forEach((key) => {
  console.log(`${key}: ${person[key]}`);
});
