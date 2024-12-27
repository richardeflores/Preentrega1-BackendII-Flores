import { UserModel } from "./models/user.model.js";

export default class UserDao {
	async findById(id) {
		return await UserModel.findById(id);
	}

	async findOne(query) {
		return await UserModel.findOne(query);
	}

	async save(userData) {
		const user = new UserModel(userData);
		return await user.save();
	}
}
