const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    try {
      const storeProducts = await productService.getProducts()
      res.status(200).json(storeProducts);
    } catch (error) {
      console.error(error)
      res.status(500).end()
    }
  });

  router.get('/products/:id', async (req, res, next) => {
    try {
      const productId = req.params.id
      const storeProduct = await productService.getProduct(productId)
      res.status(200).json(storeProduct);
    } catch (error) {
      res.status(500).end()
    }
  });

  router.post('/products', async (req, res, next) => {
    try {
      const {
        title,
        image,
        price,
        description
      } = req.body
      const productCreated = await productService.createProduct({
        title,
        image,
        price,
        description
      })
      res.status(200).json(productCreated)
    } catch (error) {
      res.status(500).end()
    }
    res.status(200).end()
  });

  router.put('/products/:id', async (req, res, next) => {
    try {
      const productId = req.params.id
      const productData = req.body
      const productUpdatedId = await productService.updateProduct(productId, productData)
      res.status(200).json(productUpdatedId);
    } catch (error) {
      res.status(500).end()
    }
  });

  router.delete('/products/:id', async (req, res, next) => {
    try {
      const productId = req.params.id
      const productDeleted = await productService.deleteProduct(productId)
      res.status(200).json(productDeleted);
    } catch (error) {
      res.status(500).end()
    }
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;