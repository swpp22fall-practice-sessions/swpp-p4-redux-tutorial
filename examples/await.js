const sayHelloAwait = () => {
  const number = Math.random();
  return new Promise((resolve, reject) => {
    if (number > 0.5) {
      resolve("Hello");
    } else {
      reject("Bye");
    }
  });
};

const main = async () => {
  const result = await sayHelloAwait();
  console.log(result);
};

main();
