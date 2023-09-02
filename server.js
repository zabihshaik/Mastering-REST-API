const express = require('express');
const app = express();
const PORT = 8080;

const products = [
   {
     name: "Apple",
     price: 100,
     description: "This is an apple",
     image:
       "https://images.unsplash.com/photo-1581093458791-9f3c0d1b1a1e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
     id: 1,
     category: "Fruits",
   },
   {
     name: "Banana",
     price: 200,
     description: "This is a banana",
     image:
       "https://images.unsplash.com/photo-1581093458791-9f3c0d1b1a1e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
     id: 2,
     category: "Fruits",
   },
 ];

// middleware to parse the json body
app.use(express.json());

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

// @desc   Get All Products API
// @method GET
// @route  /products

app.get("/products", (req, res) => {
   res.send(products);
 });

// @desc   Get a Single Product
// @method GET
// @route  /products/:id

app.get("/products/:id", (req, res) => {
   const id = req.params.id;
   const product = products.find((product) => product.id === parseInt(id));
   res.send(product);
 });

// @desc   Create a new Product
// @method POST
// @route  /products

 app.post("/products", (req, res) => {
   const product = req.body;
   product.id = products.length + 1;
   products.push(product);
   res.send(product);
 });

// @desc   Update a Product
// @method PUT
// @route  /products/:id

app.put("/products/:id", (req, res) => {
   const product = req.body;
   const id = req.params.id;
   const dbProduct = products[parseInt(id) - 1];
   products[parseInt(id) - 1] = Object.assign(dbProduct, product);
   res.send(product);
 });

// @desc   Delete a Product
// @method DELETE
// @route  /products/:id

app.delete("/products/:id", (req, res) => {
   const id = req.params.id;
   products.splice(parseInt(id) - 1, 1);
   res.send({ success: true });
 });
