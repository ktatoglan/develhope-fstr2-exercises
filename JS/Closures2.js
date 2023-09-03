function printName() {
  const helloName = "Hello John";

  function inner() {
    console.log(helloName);
  }

  return inner;
}

const sayHello = printName();
setTimeout(() => {
  sayHello();
}, 1000);
