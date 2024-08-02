const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const productRoute = require('./routes/product.route.js');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
