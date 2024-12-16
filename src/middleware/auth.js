import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

function verifyToken(req, res, next) {
	const token = req.cookies.userCookieToken;

	if (!token) {
		return res.status(403).redirect("/");
	}
	try {
		// verificar y decodificar el token
		const decoded = jwt.verify(token, "contrasenaFuerte");
		// normalizar los datos del usuario con el dto
		const userDTO = new UserDTO({
			userID: decoded.userID,
			userName: decoded.userName,
			email: decoded.email,
			role: decoded.role,
			cartID: decoded.cartID,
			isAdmin: decoded.role === "admin",
		});

		// asignar dto al user
		req.user = userDTO;

		next();
	} catch (error) {
		res.status(401).send("Error en la coneccion con el midleware, " + error);
	}
}

export function authMiddleware(req, res, next) {
	return verifyToken(req, res, next);
}

export function onlyUser(req, res, next) {
	verifyToken(req, res, () => {
		// normalizar los datos del usuario con el dto
		if (req.user.role === "user") {
			next();
		} else {
			res.status(403).send("Acceso denegado, solo apto para users default");
		}
	});
}

export function onlyAdmin(req, res, next) {
	verifyToken(req, res, () => {
		// normalizar los datos del usuario con el dto
		if (req.user.role === "admin") {
			next();
		} else {
			res.status(403).send("Acceso denegado, solo apto para admins");
		}
	});
}
