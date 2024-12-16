import { Router } from "express";
import productController from "../controllers/product.controller.js";

// instalacion router para las rutas
const router = Router();

/// Metodos GET

// Get inicial
router.get("/", productController.getProducts);

// GET por id
router.get("/:id", productController.getProductById);

// Metodos POST
router.post("/", productController.createProduct);

/// Actualizar por id
router.put("/:id", productController.updateProduct);

/// ELIMINAR
router.delete("/del/:id", productController.deleteProductById);

export default router;
