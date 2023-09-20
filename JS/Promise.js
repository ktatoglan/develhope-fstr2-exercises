const number = 15;

const myPromise = new Promise((resolve, reject) => {
  if (number > 10) {
    resolve(`Number ${number} is greater than 10.`);
  } else {
    reject(`Number ${number} is not greater than or equal to 10.`);
  }
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
