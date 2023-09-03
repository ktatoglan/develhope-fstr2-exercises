function printAsyncName(callback, name) {
  setTimeout(() => {
    callback();
    setTimeout(() => {
      console.log(name);
    }, 2000);
  }, 1000);
}

// Example usage:
function sayHello() {
  console.log("Hello");
}

printAsyncName(sayHello, "John");
