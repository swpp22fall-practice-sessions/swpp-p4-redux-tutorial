// @ts-ignore
const sayHelloTS = () => {
  const number = Math.random();
  return new Promise<string>((resolve, reject) => {
    if (number > 0.5) {
      resolve("Hello");
    } else {
      reject("Bye");
    }
  });
};

sayHelloTS()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
