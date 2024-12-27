import { faker } from "@faker-js/faker";
import { CartModel } from "../dao/models/cart.model.js";

faker.locale = "es";

export const generateMockUsers = (quantity) => {
	const users = [];
	for (let i = 0; i < quantity; i++) {
		const user = {
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			userName: faker.internet.username(),
			email: faker.internet.email(),
			birth: faker.date.birthdate({ mode: "age", min: 18, max: 65 }),
			role: faker.helpers.arrayElement(["user", "admin"]),
			cartID: faker.string.ulid(),
		};
		users.push(user);
	}
	return users;
};

export const generateMockCart = (quantity) => {
	const carts = [];
	for (let i = 0; i < quantity; i++) {
		const cart = {
			products: [
				{
					quantity: faker.number.int({ min: 1, max: 10 }),
					product: faker.database.mongodbObjectId(),
				},
			],
		};
		carts.push(cart);
	}
	return carts;
};
