//externos
import jwt from "jsonwebtoken";
//internos
import UserDTO from "../dto/user.dto.js";
import UserService from "../services/user.service.js";
import cartController from "./cart.controller.js";

const normalice = (word) => {
	const lower = word.trim().toLowerCase();
	const firsLetterUpper = lower[0].toUpperCase() + lower.slice(1);

	return firsLetterUpper;
};

class UserController {
	async register(req, res) {
		const { first_name, last_name, userName, email, birth, password } =
			req.body;
		try {
			const nuevoCarrito = await cartController.createCart();
			if (!nuevoCarrito)
				res
					.status(404)
					.json({ message: "Error en la creacion del nuevo carrito" });

			const nuevoUsuario = await UserService.registerUser({
				first_name: normalice(first_name),
				last_name: normalice(last_name),
				userName: userName.toLowerCase().trim(),
				email: email.toLowerCase().trim(),
				birth,
				password,
				role: "user",
				cartID: nuevoCarrito._id,
			});
			// generar el nuevo token jwt
			const token = jwt.sign(
				{
					userID: nuevoUsuario._id,
					userName: nuevoUsuario.userName,
					role: nuevoUsuario.role,
					cartID: nuevoUsuario.cartID,
				},
				"contrasenaFuerte",
				{
					expiresIn: "1h",
				}
			);

			// lo mandamos con la cookie
			res.cookie("userCookieToken", token, {
				maxAge: 3600000, //1h
				httpOnly: true,
			});

			res.status(201).json("Success");
		} catch (error) {
			res.status(500).send("Error interno del servidor, " + error);
		}
	}

	async logIn(req, res) {
		const { userName, password } = req.body;

		try {
			const userNameFixed = userName.toLowerCase().trim();
			const user = await UserService.loginUser(userNameFixed, password);

			if (!user) {
				return res
					.status(401)
					.json({ message: "Usuario o contraseña incorrectos" });
			}

			const token = jwt.sign(
				{
					userID: user._id,
					userName: user.userName,
					email: user.email,
					role: user.role,
					cartID: user.cartID,
				},
				"contrasenaFuerte",
				{
					expiresIn: "1h",
				}
			);

			// lo mandamos con la cookie
			res.cookie("userCookieToken", token, {
				maxAge: 3600000, //1h
				httpOnly: true,
			});
			res.json({
				userID: user._id,
				userName: user.userName,
				email: user.email,
				role: user.role,
				cartID: user.cartID,
			});
		} catch (error) {
			res.status(500).send("Error interno del servidor " + error);
		}
	}

	async logOut(req, res) {
		res.clearCookie("userCookieToken");
		res.status(200).json({ message: "Success" });
	}
}

export const createUser = async (req, res, next) => {
	try {
		const { cant } = req.query;
		const response = await UserService.createUsersMock(cant);
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getUsers = async (req, res, next) => {
	try {
		const response = await UserService.getUsers();
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export default UserController;
