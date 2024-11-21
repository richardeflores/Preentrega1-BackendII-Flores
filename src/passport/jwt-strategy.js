import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { getUserById } from "../services/userServices.js";

// Extrae el token de las cookies
const cookieExtractor = req => req?.cookies?.token;

const jwtCookiesConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: SECRET_KEY,
};

// Funcion para verificar el token y obtener el usuario asociado
const verifyToken = async (jwt_payload, done) => {
    try {
        if (!jwt_payload) {
            return done(null, false, { message: "Token inválido o usuario no encontrado" });
        }

        const user = await getUserById(jwt_payload.id);

        if (!user) {
            return done(null, false, { message: "Usuario no encontrado"});
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
};

export const currentStrategy = new JwtStrategy(jwtCookiesConfig, verifyToken);

const generateToken = user => {
    const payload = {
        id: user._id,
        first_name: user.first_name,
        last_name: user?.last_name,
        age: user?.age,
        cart: user?.cart,
        role: user?.role,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" });
    return token;
};

export const generateAndSaveToken = (req, res) => {
    const user = req.user;
    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true });
    return token;
};
