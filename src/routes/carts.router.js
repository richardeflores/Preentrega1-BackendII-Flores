import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/auth.js";

// declaramos router para facilitar su uso
const router = Router();

/*  GET/:cid
 */
router.get("/:cid", authMiddleware, cartController.getCartById);

router.post("/", authMiddleware, cartController.createCart);

// post/:cid/products/:pid
router.post(
	"/:cid/product/:pid",
	authMiddleware,
	cartController.addProductToCart
);

/// ELIMINAR
router.delete("/del/:cid", authMiddleware, cartController.deleteCart);

router.delete("/empty/:cid", authMiddleware, cartController.emptyCart);

/// COMPRA
router.post("/:cid/purchase", authMiddleware, cartController.purchase);

router.delete(
	"/:cid/del/:pid",
	authMiddleware,
	cartController.delProductFromCart
);

export default router;
