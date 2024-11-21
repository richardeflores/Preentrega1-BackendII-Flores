import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth.js";
import { currentResponse, sessionLogout } from "../controllers/sessionsController.js";
const router = Router();

router.get("/current", ensureAuth, currentResponse);

router.delete("/logout", sessionLogout)

export default router;
