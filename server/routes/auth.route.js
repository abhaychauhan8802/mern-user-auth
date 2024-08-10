import express from "express";

// local import
import {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendCode,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", verifyToken, signOut);

router.post("/verify-email", verifyToken, verifyEmail);
router.post("/resend-code", verifyToken, resendCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
