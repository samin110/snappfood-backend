const router = require("express").Router();
const Products = require("../models/Products");

router.post("/products", async (req, res) => {
  const product = new Products({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  });
  try {
    const saveProduct = await product.save();
    res.json(saveProduct);
  } catch (error) {
    res.json(error);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
