import express from "express";

// local import
import { signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);

export default router;
