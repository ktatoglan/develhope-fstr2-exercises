function sumUntil(maxValue) {
    let a = 0;
    for (let index = 0; index <= maxValue; index++) {
        a+=index;  
    }
    return a;
  }
  
  console.log(sumUntil(5));