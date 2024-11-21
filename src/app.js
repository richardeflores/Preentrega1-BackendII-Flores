import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";

import "dotenv/config";

import { srcPath } from "./utils/utils.js";
import path from "path";

import initMongoDB from "./config/dbConfig.js";

import routes from "./routes/index.js";
import handlebarsRouter from "./routes/handlebars.router.js";

import passport from "./config/passportConfig.js";


const app = express();

// Iniciacion de Mongo
initMongoDB();

// Seteo de Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Seteo de Handlebars
app.use(express.static(path.join(srcPath, "public")));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(srcPath, "views"));

// Inicializacion de passport
app.use(passport.initialize());
//app.use(passport.session());

// Routes
app.use("/api", routes);

app.use("/", handlebarsRouter);

export default app;
