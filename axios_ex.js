const axios = require('axios');

axios.get('/api/todos')
    .then(response => console.log(response))
    .catch(error => console.log(error));