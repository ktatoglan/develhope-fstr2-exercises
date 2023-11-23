function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

luckyDraw("Joe")
  .then((result) => {
    console.log("Joe:", result);
  })
  .catch((error) => {
    console.error("Joe:", error.message);
  })
  .then(() => {
    return luckyDraw("Caroline");
  })
  .then((result) => {
    console.log("Caroline:", result);
  })
  .catch((error) => {
    console.error("Caroline:", error.message);
  })
  .then(() => {
    return luckyDraw("Sabrina");
  })
  .then((result) => {
    console.log("Sabrina:", result);
  })
  .catch((error) => {
    console.error("Sabrina:", error.message);
  });
