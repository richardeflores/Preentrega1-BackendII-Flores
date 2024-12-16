import UserDao from "../dao/user.dao.js";

class UserRepository {
  async createUser(userData) {
    return UserDao.save(userData);
  }

  async getUserById(id) {
    return await UserDao.findById(id);
  }

  async getUserByEmail(email) {
    return await UserDao.findOne({ email });
  }

  async getUserByUserName(userName) {
    return await UserDao.findOne({ userName });
  }
}

export default new UserRepository();
