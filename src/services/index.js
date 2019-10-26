const MongoLib = require('../lib/mongo')

class ProductService {
  constructor(){
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }
  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection)
    return products || [];
  }

  async getProduct(productId) {
    const product = await this.mongoDB.get(this.collection, productId)
    return product || [];
  }

  async createProduct(productData) {
    const product = await this.mongoDB.create(this.collection, productData)
    return product || [];
  }

  async updateProduct(productId, productData) {
    const product = await this.mongoDB.update(this.collection, productId, productData)
    return product || [];
  }

  async deleteProduct(productId) {
    await this.mongoDB.delete(this.collection, productId)
    return productId;
  }
}

module.exports = ProductService;
