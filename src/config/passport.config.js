// npm install passport-jwt

import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
	passport.use(
		"jwt",
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
				secretOrKey: "contrasenaFuerte",
			},
			async (jwt_payload, done) => {
				try {
					return done(null, jwt_payload);
				} catch (error) {
					return done(error);
				}
			}
		)
	);
};

// coookieExtractor
const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["userCookieToken"];
	}
	return token;
};

export default initializePassport;
