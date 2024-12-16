import ProductModel from "./models/product.model.js";

class ProductDao {
  async findById(id) {
    return await ProductModel.findById(id);
  }
  async find(query) {
    return await ProductModel.find(query);
  }
  async save(productData) {
    const producto = new ProductModel(productData);
    const newProduct = producto.save();

    return await newProduct;
  }
  async update(id, productData) {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      productData,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedProduct;
  }
  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default new ProductDao();
