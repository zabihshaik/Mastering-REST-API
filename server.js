require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

const productRouter = require("./routes/product");

// middleware to parse the json body
app.use(express.json());
app.use(productRouter);

const logger = (req, res, next) => {
   console.log(`Received ${req.method} request on ${req.url}`);
   next();
 };
 
app.use(logger);

app.listen(PORT, () => {
   console.log('Server is up and running');
});

app.get('/', (req, res) => {
   console.log('We are handling / ');
   res.send('Hello world from express');
});

