import cartService from "../services/cart.service.js";
import productService from "../services/product.service.js";
import { mailer } from "../utils/mailer.js";
import ticketController from "./ticket.controller.js";

class CartController {
	async createCart(req, res) {
		try {
			const newCart = await cartService.createCart();

			if (!newCart)
				return res
					.status(400)
					.json({ message: "Error en la creacion del nuevo carrito" });

			return newCart;
		} catch (error) {
			res.status(500).send(`Error en el server: ${error}`);
		}
	}
	async getCartById(req, res) {
		const { cid } = req.params;
		try {
			const cart = await cartService.getCartById(cid);
			if (!cart)
				return res
					.status(404)
					.json({ message: "Error al encontrar el carrito" });

			return res.status(200).json({ cart });
		} catch (error) {
			res.status(500).send(`Error en el server: ${error}`);
		}
	}

	async addProductToCart(req, res) {
		const { cid, pid } = req.params;
		const { quantity = 1 } = req.body;
		try {
			const cart = await cartService.getCartById(cid);
			if (!cart)
				return res
					.status(404)
					.json({ message: "Error al encontrar el carrito" });

			const product = await productService.getProductById(pid);
			if (!product)
				return res
					.status(404)
					.json({ message: "Error al encontrar el producto" });

			const productInCart = cart.products.find(
				(item) => item.product._id.toString() === pid
			);
			if (productInCart) {
				if (quantity === product.stock) {
					return res.status(401).send("No hay mas stock");
				} else {
					productInCart.quantity += quantity;
				}
			} else {
				cart.products.push({ product: pid, quantity });
			}

			await cartService.updateCart(cid, cart);

			res.json({ message: "Success" });
		} catch (error) {
			res.status(500).send(`Error en el server: ${error}`);
		}
	}

	async emptyCart(req, res) {
		const { cid } = req.params;

		try {
			const cart = await cartService.getCartById(cid);
			if (!cart)
				return res
					.status(404)
					.json({ message: "Error al encontrar el carrito" });

			cart.products = [];
			await cartService.updateCart(cid, cart);
			console.log(cart);
			res.status(200).json({ message: "Success" });
		} catch (error) {
			res.status(500).send(`Error en el server: ${error}`);
		}
	}

	async deleteCart(req, res) {
		const { cid } = req.params;
		try {
			const deletedCart = await cartService.deleteById(cid);
			if (!deletedCart)
				return res
					.status(404)
					.json({ message: "Error al encontrar el carrito" });
			res.json({ message: "Success" });
		} catch (error) {
			res.status(500).send(`Error en el server: ${error}`);
		}
	}

	async delProductFromCart(req, res) {
		const { cid, pid } = req.params;
		try {
			const cart = await cartService.getCartById(cid);

			if (!cart || !cart.products || !Array.isArray(cart.products)) {
				return res.status(400).json({ error: "Problemas con el carrito" });
			}
			const productIndex = cart.products.findIndex(
				(i) => i.product._id.toString() === pid.toString()
			);
			const product = cart.products[productIndex];

			if (!product || !product.quantity) {
				return res.status(400).json({ error: "Problemas con el carrito" });
			}

			if (product.quantity <= 1) {
				cart.products.splice(productIndex, 1);
			} else {
				product.quantity--;
			}

			await cartService.updateCart(cid, cart);

			return res.status(200).json(product);
		} catch (error) {
			console.log("error, " + error);
		}
	}

	async purchase(req, res) {
		const { cid } = req.params;
		let isStockOk = true;

		try {
			//getcart
			const cart = await cartService.getCartById(cid);
			if (!cart)
				return res
					.status(404)
					.json({ message: "Error al encontrar el carrito" });

			//getproduct
			const productArray = await Promise.all(
				cart.products.map(async (item) => {
					const productDetail = await productService.getProductById(
						item.product._id
					);
					if (productDetail.stock < item.quantity) {
						// consulto stock
						isStockOk = false;
					}
					return {
						product: item.product._id,
						productDetail,
						quantity: item.quantity,
					};
				})
			);

			if (!productArray || productArray.length === 0) {
				return "carrito vacio o no encontrado";
			}
			//no. rechazo compra
			if (!isStockOk) {
				console.log("error");
				return res
					.status(409)
					.send(
						"Las cantidades solicitadas de al menos uno de los productos exceden al stock del mismo"
					);
			}

			//si. continuo
			const total = productArray.reduce((acc, item) => {
				return acc + item.productDetail.price * item.quantity;
			}, 0);

			// create ticket
			const { userID, email } = req.user;

			const ticketData = {
				products: productArray,
				amount: total,
				purchaser: userID,
			};

			const newTicket = await ticketController.createTicket(
				{ body: ticketData },
				res
			);

			if (!newTicket) return res.status(404).send("error al crear el ticket");

			// emptyCart
			cart.products = [];
			cartService.updateCart(cid, cart);

			// send mail

			const mailCompra = `<h1>Gracias por su compra!!<h1/> <br/> <p>Confirmamos a traves de este medio la compra realizada de $${total}, numero de ticket ${newTicket._id}</p>`;

			const mailVenta = `<h1>Te estan corrigiendo la entrega ten esperanzas!!<h1/> <br/> <p>El profe o tutor ${email}, numero de ticket ${newTicket._id}</p>`;

			await mailer(email, "Confirmacion de compra", mailCompra);
			await mailer(
				"lcdo.richardflores@gmail.com",
				"Confirmacion de compra",
				mailVenta
			);

			res.status(200).json({ message: "Success" });
		} catch (error) {
			console.error("error al conectar con el servidor " + error);
			res.status(500).send(`Error en el server: ${error}`);
		}
	}
}

export default new CartController();
