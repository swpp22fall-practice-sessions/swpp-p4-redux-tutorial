const sayHello = () => {
  const number = Math.random();
  return new Promise((resolve, reject) => {
    if (number > 0.5) {
      resolve("Hello");
    } else {
      reject("Bye");
    }
  });
};

sayHello()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
