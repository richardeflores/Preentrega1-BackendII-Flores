import { comparePasswords } from "../utils/utils.js";
import { getUserByEmail } from "./userServices.js";

export const validatePassword = (password, user) => {
	try {
		const isValidPassword = comparePasswords(password, user.password);
		if (!isValidPassword) {
			throw new Error("Contraseña incorrecta");
		}
		return isValidPassword;
	} catch (error) {
		console.error("Error al validar la contraseña:", error);
		return false;
	}
};

export const login = async (email, password) => {
	try {
		const user = await getUserByEmail(email);

		if (!user) {
			return null;
		}

		const correctPassword = validatePassword(password, user);

		if (!correctPassword) {
			return null;
		}

		return user;
	} catch (error) {
		console.error("Error al iniciar sesion:", error);
		return null;
	}
};
