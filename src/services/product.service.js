import productRepository from "../repositories/product.repository.js";

class ProductService {
  async createProduct(productData) {
    return await productRepository.createProduct(productData);
  }
  async getProductById(id) {
    return await productRepository.getProductById(id);
  }
  async getProducts(query) {
    return await productRepository.getProducts(query);
  }
  async updateProduct(id, productData) {
    return await productRepository.updateProduct(id, productData);
  }
  async deleteById(id) {
    return await productRepository.deleteById(id);
  }
}

export default new ProductService();
