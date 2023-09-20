class UserNotLoggedInError extends Error {
  constructor() {
    super("User is not logged in");
    this.name = "UserNotLoggedInError";
  }
}

class RandomNumberTooLowError extends Error {
  constructor() {
    super("Random number is not greater than 0.5");
    this.name = "RandomNumberTooLowError";
  }
}

const isLogged = true;

const firstPromise = new Promise((resolve, reject) => {
  if (isLogged) {
    const randomNumber = Math.random();
    resolve(randomNumber);
  } else {
    reject(new UserNotLoggedInError());
  }
});

const secondPromise = (randomNumber) => {
  return new Promise((resolve, reject) => {
    if (randomNumber > 0.5) {
      resolve({ name: "John", age: 24 });
    } else {
      reject(new RandomNumberTooLowError());
    }
  });
};

firstPromise
  .then((randomNumber) => secondPromise(randomNumber))
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    if (
      error instanceof UserNotLoggedInError ||
      error instanceof RandomNumberTooLowError
    ) {
      console.error(error.message);
    } else {
      console.error("An unexpected error occurred.");
    }
  })
  .finally(() => {
    console.log(
      "Promise has been resolved or rejected, regardless of the outcome."
    );
  });
