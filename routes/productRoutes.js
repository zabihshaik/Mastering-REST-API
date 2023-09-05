const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Product = require("../models/productModel");

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

router.use(verifyJWT);

 // @desc   Get All Products API
// @method GET
// @route  /products

router.get("/", async (req, res) => {
   const products = await Product.find(); 
   res.send(products);
 });

// @desc   Get a Single Product
// @method GET
// @route  /products/:id

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (err) {
    res.status(404).send({ error: "Product not found" });
  }
});

// @desc   Create a new Product
// @method POST
// @route  /products

router.post("/", async (req, res) => {
  const user = req.user;
  console.log({ user });
  if (user && user.role === "ADMIN") {
    const product = req.body;
    const dbProduct = await Product.create(product);
    res.send(dbProduct);
  } else {
    res.status(401).send({ error: "Not authorized - test!" });
  }
});

// @desc   Update a Product
// @method PUT
// @route  /products/:id

// router.put("/:id", (req, res) => {
//    const product = req.body;
//    const id = req.params.id;
//    const dbProduct = products[parseInt(id) - 1];
//    products[parseInt(id) - 1] = Object.assign(dbProduct, product);
//    res.send(product);
//  });

// @desc   Delete a Product
// @method DELETE
// @route  /products/:id

// router.delete("/:id", (req, res) => {
//    const id = req.params.id;
//    products.splice(parseInt(id) - 1, 1);
//    res.send({ success: true });
//  });

 module.exports = router;