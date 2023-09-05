require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

mongoose.connect(process.env.MONGO_URI).then(() => {
   console.log('MongoDB COnnected');
});

// middleware to parse the json body
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

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

