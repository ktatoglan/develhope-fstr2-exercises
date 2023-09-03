function repeatHello(callback) {
  const intervalId = setInterval(callback, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 5000);
}

const helloCallback = () => {
  console.log("Hello");
};

repeatHello(helloCallback);
