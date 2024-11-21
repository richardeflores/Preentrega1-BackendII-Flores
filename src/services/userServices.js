import User from "../models/userModel.js";
import { hashPassword } from "../utils/utils.js";

/**
 * Crea un nuevo usuario en la base de datos.
 * @param {Object} userData - Datos del usuario (nombre, email, etc.).
 * @returns {Object} - El usuario creado.
 */
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

/**
 * Obtiene un usuario por su email.
 * @param {String} userEmail - El email del usuario.
 * @returns {Object|null} - El usuario si se encuentra, o null si no.
 */
export const getUserByEmail = async (email) => {
	email = email.toLowerCase();
	const user = await User.findOne({ email });
	return user;
};

/**
 * Elimina un usuario buscado por su ID
 * @param {String} ID - ID del usuario.
 * @returns {Object|null} - Informacion del usuario eliminado si se encuentra, o null si no.
 */
export const deleteUser = async (id) => {
	return await User.findByIdAndDelete(id);
};

/**
 * Busca un usuario por su ID
 * @param {String} ID - ID del usuario.
 * @returns {Object|null} - Devuelve el usuario si se encuentra, o null si no.
 */
export const getUserById = async (id) => {
	return await User.findById(id);
};
