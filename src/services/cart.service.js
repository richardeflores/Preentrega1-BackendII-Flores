import cartRepository from "../repositories/cart.repository.js";

class CartService {
  async createCart() {
    return await cartRepository.createCart();
  }
  async getCartById(id) {
    return await cartRepository.getCartById(id);
  }
  async getProductFromCart(cid, pid) {
    const cart = await this.getCartById(cid);
    const product = cart.products.find((i) => i.product._id === pid);
    console.log("service " + cart.products);
    console.log("Product " + product);

    return product;
  }
  async updateCart(id, cartData) {
    return await cartRepository.updateCart(id, cartData);
  }
  async deleteById(id) {
    return await cartRepository.deleteById(id);
  }
}

export default new CartService();
