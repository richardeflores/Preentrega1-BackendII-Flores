import UserDao from "../dao/user.dao.js";

const userDao = new UserDao();

class UserRepository {
	async getUsers() {
		try {
			return await userDao.find({});
		} catch (error) {
			console.error("Error al obtener los usuarios:", error);
			throw error;
		}
	}

	async createUser(user) {
		try {
			return await userDao.save(user);
		} catch (error) {
			console.error("Error al crear el usuario:", error);
			throw error;
		}
	}

	async getUserByEmail(email) {
		try {
			return await userDao.findOne({ email });
		} catch (error) {
			console.error("Error al obtener el usuario por email:", error);
			throw error;
		}
	}

	async getUserByUserName(userName) {
		try {
			return await userDao.findOne({ userName });
		} catch (error) {
			console.error("Error al obtener el usuario por userName:", error);
			throw error;
		}
	}
}

export default new UserRepository();
