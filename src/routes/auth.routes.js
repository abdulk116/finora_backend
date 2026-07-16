import { Router } from "express";
import { login, logout, me, register } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";

import {
  loginSchema,
  registerSchema
} from "../validations/auth.validation.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.post("/logout", protect, logout);
router.get("/me", protect, me);

export default router;