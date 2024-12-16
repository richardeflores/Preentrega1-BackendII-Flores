import { Router } from "express";
import productModel from "../dao/models/product.model.js";
import passport from "passport";
import cartService from "../services/cart.service.js";
import productService from "../services/product.service.js";
import { authMiddleware, onlyAdmin, onlyUser } from "../middleware/auth.js";

// instalacion router para las rutas
const router = Router();

router.get("/", async (req, res) => {
	res.redirect("/login");
});

//      USER

//Ruta principal donde se vera representado el front
router.get("/products", authMiddleware, onlyUser, async (req, res) => {
	let page = req.query.page || 1;
	let limit = 3;

	try {
		const listProducts = await productModel.paginate({}, { limit, page });

		// Puedo recuperar el doc y pasarlo a products
		const listProductsFinal = listProducts.docs.map((products) => {
			const showProducts = products.toObject();
			return showProducts;
		});

		res.render("index", {
			userName: req.user.userName,
			email: req.user.email,
			cartID: req.user.cartID,
			products: listProductsFinal,
			hasPrevPage: listProducts.prevPage,
			hasNextPage: listProducts.nextPage,
			prevPage: listProducts.prevPage,
			nextPage: listProducts.nextPage,
			currentPage: listProducts.page,
			totalPages: listProducts.totalPages,
		});
	} catch (error) {
		res.status(500).send("error en el servidor");
	}
});

//      ADMIN

router.get("/adminpage", authMiddleware, onlyAdmin, async (req, res) => {
	res.render("mainpage", {
		userName: req.user.userName,
	});
});

// mostrar los productos en timepo rea
// con boton de agregar y eliminar

router.get("/realtimeproducts", authMiddleware, onlyAdmin, async (req, res) => {
	res.render("realtimeproducts");
});

//   CART- COMPRA
router.get("/cart/:cid", authMiddleware, async (req, res) => {
	const cartID = req.params.cid;

	try {
		if (!cartID) {
			return res.status(404).json({ message: "Error al recibir el id" });
		}
		const cart = await cartService.getCartById(cartID);
		if (!cart) {
			return res.status(404).json({ message: "Error al encontrar el carrito" });
		}
		if (cart.products.length === 0) {
			return res.redirect("/products");
		}
		const productsInCart = await Promise.all(
			cart.products.map(async (item) => {
				const productDetails = await productService.getProductById(
					item.product.toObject()._id
				);
				return {
					product: productDetails.toObject(),
					quantity: item.quantity,
					price: productDetails.price,
				};
			})
		);

		const total = productsInCart.reduce((acc, item) => {
			return acc + item.price * item.quantity;
		}, 0);

		res.render("cart", {
			cartID: cartID,
			products: productsInCart,
			total: total,
		});
	} catch (error) {
		res.status(500).send("Error en el servidor: " + error);
	}
});

// inicio de usuario

router.get("/register", async (req, res) => {
	res.render("register");
});
router.get("/login", async (req, res) => {
	res.render("login");
});

export default router;
