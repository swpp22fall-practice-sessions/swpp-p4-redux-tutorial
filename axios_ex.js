// const axios = require('axios');

// axios.get('http://localhost:8000/api/todo/')
//     .then(response => console.log(response))
//     .catch(error => console.log(error))

const sayHello = () => {
    const number = Math.random();
    return (new Promise((resolve, reject) => {
        if (number>0.5) {resolve("Hello");}
        else {reject("Bye.");}
    }));
};

// sayHello()
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

const main = async () => {
    const result = await sayHello();
    console.log(result);
}

main();