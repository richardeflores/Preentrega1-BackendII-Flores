import mongoose from "mongoose";
import configObject from "./config/config.js";
const { mongo_url } = configObject;

const database = mongoose
	.connect(mongo_url)
	.then(() => console.log("Conectados a la db" + mongo_url))
	.catch((error) => console.error("Algo salió mal", error));

export default database;
