import { createHash, isValidPassword } from "../utils/utils.js";
import userRepository from "../repositories/user.repository.js";

class userService {
  async registerUser(userData) {
    const existeUsuario = await userRepository.getUserByUserName(
      userData.userName
    );
    const existeEmail = await userRepository.getUserByEmail(userData.email);
    if (existeUsuario) throw new Error("El usuario ya existe");
    if (existeEmail) throw new Error("El EMail ya está en uso");

    userData.password = await createHash(userData.password);
    return await userRepository.createUser(userData);
  }

  async loginUser(userName, password) {
    const user = await userRepository.getUserByUserName(userName);
    if (!user) throw new Error("Usuario no encontrado");
    if (!isValidPassword(password, user))
      throw new Error("contrasena incorrecta");
    return user;
  }
}

export default new userService();
