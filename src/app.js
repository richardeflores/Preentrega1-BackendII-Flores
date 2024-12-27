/* IMPORTACIONES */

import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// Database
import "./database.js";
// Importacion de Routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import ticketsRouter from "./routes/tickets.router.js";
import mocksRouter from "./routes/mocks.router.js";

// Passport config
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import productService from "./services/product.service.js";
import productController from "./controllers/product.controller.js";
import compression from "express-compression";

/* Configuracion de puerto */
// declaro app como express para que sea mas facil y mas visual
const app = express();

// declaro en que puerto se va a correr, facilitando y optimizando
const PORT = process.env.PORT || 8080;

// Middleware

//Middleware: aca le digo al servidor que voy a usar formato json
app.use(express.json());
//esto le dice a la app que va a recibir datos complejos
app.use(express.urlencoded({ extended: true }));
// Hace que busque las cosas llamandolas desde esta ubicacion
app.use(express.static("./src/public"));
// usar las cookies
app.use(cookieParser());
// passport config middleware
initializePassport();
app.use(passport.initialize());
// cors para conexion con front
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Middleware para mejorar rendimiento
app.use(
	compression({
		brotli: {
			enabled: true,
			zlib: {},
		},
	})
);

//config
app.engine(
	"handlebars",
	engine({
		helpers: {
			eq: function (a, b) {
				return a === b;
			},
		},
	})
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//apis rutas

//Views

//Ruta principal donde se vera representado el front
app.use("/", viewsRouter);

//Products

// llama a la api products para usar sus funcionalidades
app.use("/api/products", productsRouter);

//Carts

// llama a la api carts para usar sus funcionalidades
app.use("/api/carts", cartsRouter);

//Sessions

// llama a la api sessions para usar sus funcionalidades
app.use("/api/sessions", usersRouter);

// Tickets

// llama a la api tickets para usar sus funcionalidades
app.use("/api/tickets", ticketsRouter);

app.use("/api/users", usersRouter);

app.use("/api/mocks", mocksRouter);

// VINCULA EL SERVIDOR
const httpServer = app.listen(PORT, () => {
	// cuando el puerto esta escuchando lo comunica a traves de la consola
	console.log(`Escuchando en el puerto: http://localhost:${PORT}`);
});

//Servidor

const io = new Server(httpServer);

io.on("connection", async (socket) => {
	console.log("Un cliente se conecto");

	//Le envian el array de productos a la vista realTimeProducts:
	socket.emit("products", await productService.getProducts());
	//Con un evento y el metodo "on" lo escuchas desde el  main.js y lo mostras por pantalla.

	// //Recibimos el evento "deleteProduct" desde el cliente y borramos con el metodo borrar:
	socket.on("deleteProduct", async (id) => {
		await productService.deleteById(id);
		io.emit("products", await productService.getProducts());
	});

	// //Recibimos el evento "updateProduct" desde el cliente y actualizamos con el metodo update:
	socket.on("updateProduct", async ({ id, stock }) => {
		try {
			await productService.updateProduct(id, { stock: stock });

			io.emit("products", await productService.getProducts());
		} catch (error) {
			console.error("Error updating product:", error);
		}
	});
	// //Recibimos el evento "addProduct" desde el cliente y agregamos con el metodo addproduct:
	socket.on("addProduct", async (formValues) => {
		try {
			const result = await fetch(`http://localhost:8080/api/products/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formValues),
			});

			// console.log(result);
			const data = await result.json();
			if (result.ok) {
				console.log("Nuevo producto agregado correctamente " + data);
			}

			io.emit("products", await productService.getProducts());
		} catch (error) {
			console.error("Error adding product:", error);
		}
	});

	// //Despues de borrar le envio los productos actualizados al cliente:
	// io.sockets.emit("products", await productService.getProducts());
});
