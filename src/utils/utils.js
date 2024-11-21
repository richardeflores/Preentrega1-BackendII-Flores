import bcrypt from "bcrypt";
import { saltRounds } from "../config/config.js";

import { fileURLToPath } from 'url'; 
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Direccion de la carpeta src del proyecto
export const srcPath = path.resolve(__dirname, '..');

/**
 * Hashea la contraseña pasada por parametro
 * @param {String} password - La contraseña sin hashear
 * @returns {String} - La contraseña hasheada
 */
export const hashPassword = password => {
    try {
        if (!password) {
            throw new Error("No se ingreso contraseña.");
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt); 
        return hashedPassword;
    } catch (error) {
        console.log("Error al intentar hashear la contraseña:", error);
    }

};

/**
 * Compara la contraseña sin hashear con la constraseña del usuario de la base de datos (hasheada)
 * @param {String} password - Contraseña sin encriptar.
 * @param {String} userPassword - Contraseña encriptada.
 * @returns {Boolean} - True si la contraseña es correcta, false si no.
 */
export const comparePasswords = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
};