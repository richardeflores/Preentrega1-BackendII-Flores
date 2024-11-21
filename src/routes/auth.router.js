import express from "express";
import { login, loginOrRegisterGoogle, register } from "../controllers/authController.js";

const router = express.Router();
router.use(express.json());

// Local
router.post("/login", login);

router.post("/register", register);

// Google
router.get("/login-google", loginOrRegisterGoogle);

// Callback URL de Google luego de logueo o registro
router.get("/oauth2/redirect/accounts.google.com", loginOrRegisterGoogle);

export default router;
