import express from "express";

// local import
import {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", verifyToken, signOut);

router.post("/verify-email", verifyToken, verifyEmail);
router.post("/forgot-password", verifyToken, forgotPassword);
router.post("/reset-password/:token", verifyToken, resetPassword);

export default router;
