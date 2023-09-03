class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Developer extends Person {
  constructor(firstName, lastName, role) {
    super(firstName, lastName); // Call the constructor of the parent class (Person)
    this.role = role;
  }
}

const developer = new Developer("Mario", "Rossi", "Front-end");
console.log(
  developer.firstName + " " + developer.lastName + " " + developer.role
);
