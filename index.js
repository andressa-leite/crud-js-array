const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World"));

port = 3000;

app.listen(port, () => console.log(`running at ${port}`));

const products = [];

app.get("/products", (req, res) => {
  if (req.query.name) {
    const data = products.filter((product) => {
      if (product.name == req.query.name) {
        return true;
      }
    });
    return res.send(data);
  }
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const indexPosition = products.findIndex((product) => product.id == id);
  console.log(indexPosition);
  if (indexPosition < 0) {
    return res.status(404).send({ message: "Product not found" });
  }
  return res.send({ message: "string", data: products[indexPosition] });
});

app.post("/products", (req, res) => {
  try {
    const product = req.body;
    const { name, price, id } = product;
    if (!name || !price || !id) {
      res.send({ message: "Please submit all fields!" });
    } else {
      products.push(product);
      res.send({ message: "product created", data: product });
    }
  } catch {
    (err) => console.log(err.message);
  }
});

app.put("/products/:id", (req, res) => {
  const productUpdated = req.body;
  const id = req.params.id;
  const indexPosition = products.findIndex((product) => product.id == id);
  if (indexPosition >= 0) {
    products[indexPosition] = productUpdated;
    return res.json(products[indexPosition]);
  }
  return res.send({ message: "Product not found" });
});

app.patch("/products/:id", (req, res) => {
  const newItemModified = req.body;
  const id = req.params.id;
  const indexPosition = products.findIndex((product) => product.id == id);
  if (indexPosition >= 0) {
    //const productToBeModified = products[indexPosition]
    products[indexPosition] = { ...products[indexPosition], newItemModified };
    //Object.assign(productToBeModified, newItemModified) //mesma coisa da linha de cima
    return res.send(products[indexPosition]);
  }
  return res.send({ message: "Product not found" });
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const indexPosition = products.findIndex((product) => product.id == id);
  if (indexPosition >= 0) {
    products.splice(indexPosition, 1);
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});
