import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { generateAndSaveToken } from "../passport/jwt-strategy.js";
import { loginResponse, registerResponse } from "../middlewares/authConsoleResponses.js";
import passport from "passport";

/**
 * Se utiliza la estrategia pasada por parametro, sea para login o registro y maneja los errores en caso de tenerlos
 * @param {String} strategyName - Nombre de la estrategia
 */
export const passportAuth =
    (strategyName, config = {}) =>
    (req, res, next) => {
        passport.authenticate(strategyName, config, (err, user, info) => {
            if (err) {
                return errorResponse(res, "Error del servidor", 500);
            }

            // Caso de que el usuario que se intenta crear ya existe
            if (info?.userExists) {
                return errorResponse(res, info.message, 409);
            }

            // Caso de contraseña incorrecta
            if (info?.status === 401) {
                return errorResponse(res, info.message, 401);
            }

            if (!user) {
                if (strategyName === "google") return next();
                return errorResponse(res, info?.message || "Autenticación fallida", 401);
            }
            req.user = user;
            next();
        })(req, res, next);
    };

/**
 * Realiza un login por passport-local, guarda su token, imprime una respuesta en consola del servidor y luego da la respuesta de exito final.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const login = (req, res, next) => {
    passportAuth("login")(req, res, () => {
        const token = generateAndSaveToken(req, res);

        loginResponse(req, res, next);

        return successResponse(res, { user: req.user, token }, "Login exitoso");
    });
};

/**
 * Realiza un registro por passport-local, guarda su token, imprime una respuesta en consola del servidor y luego da la respuesta de exito final.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const register = (req, res, next) => {
    passportAuth("register")(req, res, () => {

        const token = generateAndSaveToken(req, res);

        registerResponse(req, res, next);

        return successResponse(res, { user: req.user, token }, "Registro exitoso", 201);
    });
};

/**
 * Realiza un registro o login por passport-google, guarda su token, imprime una respuesta en consola del servidor y luego da la respuesta de exito final.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const loginOrRegisterGoogle = (req, res, next) => {
    try {
        const config = {
            assignProperty: "user", // Guarda los datos del usuario
            scope: ["profile", "email"],
        };

        passportAuth("google", config)(req, res, () => {
            // En caso de cancelar el ingreso redirecciona al login
            if (!req?.user) {
                console.log("El usuario cancelo el ingreso por google");
                return res.redirect("/login");
            }

            const token = generateAndSaveToken(req, res);

            loginResponse(req, res, next);

            return successResponse(res, { user: req.user, token }, "Ingreso por Google exitoso");
        });
    } catch (error) {
        console.error("Error en loginOrRegisterGoogle:", error);
    }
};
