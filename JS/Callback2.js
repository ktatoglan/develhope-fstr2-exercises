function repeatHello(callback) {
  setInterval(callback, 1000);
}

const helloCallback = () => {
  console.log("Hello");
};

repeatHello(helloCallback);
