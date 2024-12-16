import productDao from "../dao/product.dao.js";

class ProductRepository {
  async createProduct(productData) {
    return await productDao.save(productData);
  }
  async getProductById(id) {
    return await productDao.findById(id);
  }
  async getProducts(query) {
    return await productDao.find(query);
  }
  async updateProduct(id, productData) {
    const updatedProduct = await productDao.update(id, productData);
    return await productDao.save(updatedProduct);
  }
  async deleteById(id) {
    return await productDao.delete(id);
  }
}

export default new ProductRepository();
