import { Strategy as LocalStrategy } from "passport-local";
import * as userServices from "../services/userServices.js";
import * as authServices from "../services/authServices.js";

const strategyConfig = {
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true,
};

const localRegister = async (req, email, password, done) => {
	const { first_name, last_name, age } = req.body;
	const userData = { first_name, last_name, age, email, password };

	try {
		const user = await userServices.getUserByEmail(email);

		if (user) {
			return done(null, false, {
				message: "El mail ya existe",
				userExists: true,
			});
		}

		if (userData.age < 0 || userData.age > 150) {
			return done(null, false, { message: "Edad invalida" });
		}

		const newUser = await userServices.createUser(userData);

		return done(null, newUser);
	} catch (error) {
		return done(error);
	}
};

const localLogin = async (req, email, password, done) => {
	try {
		const userLogin = await authServices.login(email, password);

		if (!userLogin) {
			return done(null, false, {
				message: "Email o contraseña incorrectos",
				status: 401,
			});
		}

		return done(null, userLogin);
	} catch (error) {
		return done(error);
	}
};

export const registerStrategy = new LocalStrategy(
	strategyConfig,
	localRegister
);
export const loginStrategy = new LocalStrategy(strategyConfig, localLogin);
