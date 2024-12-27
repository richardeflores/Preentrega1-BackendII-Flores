import { createHash, isValidPassword } from "../utils/utils.js";
import userRepository from "../repositories/user.repository.js";
import { UserModel } from "../dao/models/user.model.js";
import { generateUser } from "../utils/user.utils.js";

class UserService {
	async registerUser(userData) {
		const existeUsuario = await userRepository.getUserByUserName(
			userData.userName
		);
		const existeEmail = await userRepository.getUserByEmail(userData.email);

		if (existeUsuario) {
			throw new Error("El usuario ya existe");
		}
		if (existeEmail) {
			throw new Error("El EMail ya está en uso");
		}

		userData.password = await createHash(userData.password);
		return await userRepository.createUser(userData);
	}

	async loginUser(userName, password) {
		const user = await userRepository.getUserByUserName(userName);

		if (!user) {
			throw new Error("Usuario no encontrado");
		}
		if (!isValidPassword(password, user)) {
			throw new Error("Contraseña incorrecta");
		}

		return user;
	}

	async createUsersMock(cant = 20) {
		try {
			const usersArray = [];
			for (let i = 0; i < cant; i++) {
				const user = generateUser();
				usersArray.push(user);
			}
			return await UserModel.insertMany(usersArray);
		} catch (error) {
			throw new Error(error);
		}
	}

	async getUsers() {
		try {
			return await userRepository.getUsers();
		} catch (error) {
			console.error(error);
			throw new Error("Error al obtener los usuarios");
		}
	}
}

export default new UserService();
