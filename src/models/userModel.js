import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		first_name: { type: String, default: null, required: false },
		last_name: { type: String, default: null, required: false },
		email: { type: String, required: true, unique: true },
		age: { type: Number, default: null, required: false, min: 0, max: 150 },
		password: { type: String, default: null, required: false },
		cart: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Carts",
			default: null,
			required: false,
		},
		role: { type: String, default: "user", required: false },
	},
	{
		versionKey: false,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
