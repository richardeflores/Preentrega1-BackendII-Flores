import { Router } from "express";
import authRouter from "./auth.router.js";
import sessionsRouter from "./sessions.router.js";

const router = Router();

router.use("/auth", authRouter);

router.use("/sessions", sessionsRouter);

export default router;
