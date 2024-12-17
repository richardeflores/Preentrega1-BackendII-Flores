import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { authMiddleware, onlyAdmin } from "../middleware/auth.js";

const userController = new UserController();

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.logIn);

router.post("/logout", userController.logOut);

//Current

router.get("/current", authMiddleware, (req, res) => {
	try {
		if (req.user.role == "admin") {
			// si es admin entra a la parte de edicion
			return res.redirect("/adminpage");
		}
		const userData = req.user;
		// si es admin entra a la parte de edicion
		// return res.redirect("/products");
		return res.status(201).json({ message: userData });
	} catch (error) {
		res.status(500).json({ message: `error en ruta current ${error}` });
	}
});

export default router;
