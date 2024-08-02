const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const productRoutes = require('./routes/product.route.js');

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.get("/", (req, res) => {
  res.send("HELLO FROM NODE API");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
