const express = require('express');
const app = express();
const PORT = 8080;

app.listen(PORT, () => {
   console.log('Server is up and running');
});

app.get('/', (req, res) => {
   console.log('We are handling / ');
   res.send('Hello World');
});
