export const PORT = process.env.PORT || 3000;

export const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/ProyectoFinal-BackEnd1-CoderHouse";

export const dbConnectionType = process.env.MONGO_URL ? "Atlas" : "Local"

export const SECRET_KEY = process.env.SECRET_KEY || 123;

export const saltRounds = 10;

// Para passport-google-oauth20
export const CLIENT_ID_GOOGLE = process.env.CLIENT_ID_GOOGLE;
export const CLIENT_SECRET_GOOGLE = process.env.CLIENT_SECRET_GOOGLE;