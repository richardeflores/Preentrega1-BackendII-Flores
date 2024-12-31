export const info = {
	definition: {
		openapi: "3.0.3",
		info: {
			title: "API de tienda online",
			version: "1.0.0",
			description:
				"API para gestión de productos, creación de carritos, usuarios y tickets",
			contact: {
				name: "Richard Flores",
				email: "lcdo.richardflores@gmail.com",
			},
		},
		servers: [
			{ url: "http://localhost:8080", description: "Development server" },
		],
	},
	apis: ["./src/docs/*.yml"],
};
