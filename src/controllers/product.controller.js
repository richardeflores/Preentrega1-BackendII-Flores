import productService from "../services/product.service.js";

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      res.json({ products });
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
  async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await productService.getProductById(id);
      if (!product)
        return res.status(404).josn({ message: "Producto no encontrado" });

      res.json({ product });
    } catch (error) {
      res.status(500).json({ message: `Error en el server: ${error}` });
    }
  }
  async createProduct(req, res) {
    const { title, description, price, img, code, stock, category } =
      await req.body;

    try {
      if (
        !title ||
        !description ||
        !price ||
        !img ||
        !code ||
        !stock ||
        !category
      )
        return res.json({
          message: `Faltan datos:${JSON.stringify(req.body)}`,
        });
      const newProduct = await productService.createProduct(req.body);
      if (!newProduct) {
        return res
          .status(404)
          .json({ message: "error en la creacion de nuevo producto" });
      }
      res.json({ message: `Producto ${title} agregado correctamente` });
    } catch (error) {
      res.status(500).json({ message: `Error en el server: ${error}` });
    }
  }
  async updateProduct(req, res) {
    const { id } = req.params;
    try {
      const updateProduct = await productService.updateProduct(id, req.body);
      if (!updateProduct) return res.status(404).send("producto no encontrado");
      res.json({ message: "Producto modificado exitosamente!" });
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
  async deleteProductById(req, res) {
    const { id } = req.params;
    try {
      const deleteProduct = await productService.deleteById(id);
      if (!deleteProduct) return res.status(404).send("producto no encontrado");
      res.json({ message: "Producto eliminado exitosamente!" });
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
}

export default new ProductController();
