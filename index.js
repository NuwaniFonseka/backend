const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;


const prisma = new PrismaClient();


app.use(cors()); 
app.use(express.json());


app.get("/", (req, res) => {
  res.send("HELLO FROM NODE API");
});


// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a product by ID
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  const { name, quantity, price, image } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, quantity, price, image }
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, image } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, quantity, price, image }
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
