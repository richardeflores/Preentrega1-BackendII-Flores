import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    res.render("login", { title: "Inicio de Sesion" });
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/", (req, res) => {
    res.render("index");
});

export default router;
