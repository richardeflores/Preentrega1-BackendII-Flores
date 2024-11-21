import { comparePasswords } from "../utils/utils.js";
import { getUserByEmail } from "./userServices.js";

/**
 *
 * @param {String} password - Recibe contraseña introducida en login
 * @param {Object} user - Recibe el usuario registrado
 * @returns {Boolean} - Devuelve true si la contraseña coincide con la del usuario, false en otro caso.
 */
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

/**
 * @param {String} email - Recibe correo del usuario
 * @param {String} password - Recibe constraseña del usuario
 * @returns {Object} - Devuelve el usuario
 */
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
