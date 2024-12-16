import cartDao from "../dao/cart.dao.js";

class CartRepository {
  async createCart() {
    return await cartDao.save({ products: [] });
  }
  async getCartById(id) {
    return await cartDao.findById(id);
  }
  async updateCart(id, cartData) {
    return await cartDao.update(id, cartData);
  }
  async deleteById(id) {
    return await cartDao.delete(id);
  }
}

export default new CartRepository();
