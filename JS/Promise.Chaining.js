const isLogged = true;

const firstPromise = new Promise((resolve, reject) => {
  if (isLogged) {
    const randomNumber = Math.random();
    resolve(randomNumber);
  } else {
    reject("User is not logged in");
  }
});

const secondPromise = (randomNumber) => {
  return new Promise((resolve, reject) => {
    if (randomNumber > 0.5) {
      const data = { name: "John", age: 24 };
      resolve(data);
    } else {
      reject("Random number is not greater than 0.5");
    }
  });
};

firstPromise
  .then((randomNumber) => secondPromise(randomNumber))
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
