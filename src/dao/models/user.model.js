import { Schema, model } from "mongoose";

const userSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	birth: {
		type: Date,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ["admin", "user"],
		default: "user",
	},
	cartID: {
		type: String,
		required: true,
	},
});

export const UserModel = model("users", userSchema);
