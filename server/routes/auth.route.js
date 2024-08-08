import express from "express";

// local import
import { signUp, verifyEmail } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/sign-up", signUp);

router.post("/verify-email", verifyToken, verifyEmail);

export default router;
