import {passportAuth} from "../controllers/authController.js"

export const ensureAuth = passportAuth('current', { session: false });