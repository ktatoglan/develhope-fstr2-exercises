function multiplyByTwo(number) {
  function inner() {
    return 2 * number;
  }

  return inner;
}

const result = multiplyByTwo(4)();
console.log(result); 
