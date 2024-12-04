import User from "../models/userModel.js";
import { hashPassword } from "../utils/utils.js";

export const createUser = async (userData) => {
	console.log(userData);
	try {
		const newUserData = {
			first_name: userData?.first_name || null,
			last_name: userData?.last_name || null,
			age: userData?.age || null,
			email: (userData?.email).toLowerCase() || null,
			password: userData?.password ? hashPassword(userData.password) : null,
		};
		if (!newUserData.email) {
			throw new Error(
				"No se creo el usuario porque no se reconoce el email del usuario"
			);
		}

		if (newUserData.age < 0 || newUserData.age > 150) {
			throw new Error("No se creo el usuario porque la edad es inválida");
		}

		const existingUser = await getUserByEmail(newUserData.email);
		if (existingUser) {
			throw new Error("No se creo el usuario porque ya existe");
		}

		const newUser = await User.create(newUserData);
		if (!newUser) {
			throw new Error("Error desconocido al intentar crear el usuario");
		}
		return newUser;
	} catch (error) {
		console.log("Error al crear usuario:", error.message);
		return null;
	}
};

export const getUserByEmail = async (email) => {
	email = email.toLowerCase();
	const user = await User.findOne({ email });
	return user;
};

export const deleteUser = async (id) => {
	return await User.findByIdAndDelete(id);
};

export const getUserById = async (id) => {
	return await User.findById(id);
};
