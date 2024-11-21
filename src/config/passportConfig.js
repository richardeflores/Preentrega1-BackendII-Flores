import passport from "passport";
import * as localStrategy from "../passport/local-strategy.js";
import { currentStrategy } from "../passport/jwt-strategy.js";
import googleStrategy from "../passport/google-strategy.js";
import { getUserById } from "../services/userServices.js";

// Registrar estrategias
// Local
passport.use("register", localStrategy.registerStrategy);
passport.use("login", localStrategy.loginStrategy);

// JWT
passport.use("current", currentStrategy);

// Google
passport.use("google", googleStrategy);

// Recibe el usuario para devolver el id
passport.serializeUser((user, done) => {
    try {
        done(null, user._id);
    } catch (error) {
        return done(error);
    }
});

// Recibe el id del usuario para devolver el usuario
passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

export default passport;
