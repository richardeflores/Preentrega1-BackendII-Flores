import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { CLIENT_ID_GOOGLE, CLIENT_SECRET_GOOGLE, SECRET_KEY } from "../config/config.js";
import { createUser, getUserByEmail } from "../services/userServices.js";

// Callback URL: http://localhost:8080/users/oauth2/redirect/accounts.google.com

const strategyConfig = {
    clientID: CLIENT_ID_GOOGLE,
    clientSecret: CLIENT_SECRET_GOOGLE,
    callbackURL: "/api/auth/oauth2/redirect/accounts.google.com",
    scope: ["profile", "email"],
    
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        const userData = {
            first_name: profile?.name?.givenName || null,
            last_name: profile?.name?.familyName || null,
            email: profile._json.email,
        };

        if (!userData.email) {
            throw new Error("El usuario no tiene email");
        }

        let user = await getUserByEmail(userData.email);

        if (!user) {
            user = await createUser(userData);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
};

export default new GoogleStrategy(strategyConfig, registerOrLogin);
