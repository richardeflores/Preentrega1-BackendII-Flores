import * as Chai from "chai";
import { generateMockUsers } from "../utils/mock.utils.js";
import { generateUser } from "../utils/user.utils.js";

const { expect, assert, should } = Chai;
should();

describe("generateMockUsers test de funcionalidad", () => {
	it("Debe retornar un Array", () => {
		const users = generateMockUsers(5);
		expect(users).to.be.an("array");
		assert.isArray(users, "users is an array");
		users.should.be.an("array");
	});

	it("Debe retornar un array con cantidades específicas", () => {
		const quantity = 5;
		const users = generateMockUsers(quantity);
		expect(users).to.have.lengthOf(quantity);
		assert.lengthOf(users, quantity, "users array has correct length");
		users.should.have.lengthOf(quantity);
	});

	it("Debe retornar los usuarios con las propiedades requeridas", () => {
		const users = generateMockUsers(1);
		const user = users[0];
		expect(user).to.have.property("first_name");
		expect(user).to.have.property("last_name");
		expect(user).to.have.property("userName");
		expect(user).to.have.property("email");
		expect(user).to.have.property("birth");
		expect(user).to.have.property("role");
		expect(user).to.have.property("cartID");

		assert.containsAllKeys(user, [
			"first_name",
			"last_name",
			"userName",
			"email",
			"birth",
			"role",
			"cartID",
		]);
		user.should.have.property("first_name");
		user.should.have.property("last_name");
		user.should.have.property("userName");
		user.should.have.property("email");
		user.should.have.property("birth");
		user.should.have.property("role");
		user.should.have.property("cartID");
	});

	describe("generateUser Testeando función", () => {
		it("Debe retornar un objeto", () => {
			const user = generateUser();
			expect(user).to.be.an("object");
			assert.isObject(user, "user is an object");
			user.should.be.an("object");
		});

		it("Retorna un objeto con las propiedades required", () => {
			const user = generateUser();
			expect(user).to.have.property("first_name");
			expect(user).to.have.property("last_name");
			expect(user).to.have.property("email");
			expect(user).to.have.property("age");
			expect(user).to.have.property("password");
			expect(user).to.have.property("role");
			expect(user).to.have.property("image");

			assert.containsAllKeys(user, [
				"first_name",
				"last_name",
				"email",
				"age",
				"password",
				"role",
				"image",
			]);
			user.should.have.property("first_name");
			user.should.have.property("last_name");
			user.should.have.property("email");
			user.should.have.property("age");
			user.should.have.property("password");
			user.should.have.property("role");
			user.should.have.property("image");
		});
	});
});
