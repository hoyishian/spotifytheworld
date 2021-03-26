

const express = require('express');

const app = express();

app.get('/', (require, response) => {
 response.send("Hello world");
})

app.listen(3002, () => {
 console.log("running on port 3002");
})