 
const axios = require('axios');
axios.get('http://127.0.0.1:8000/api/todos')
.then(response => console.log(response)) .catch(error => console.log(error));