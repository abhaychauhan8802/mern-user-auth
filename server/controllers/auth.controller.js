import bcrypt from "bcryptjs";

// local import
import { errorHandler } from "../utils/error.js";
import { validateEmail } from "../utils/validateEmail.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    if (!validateEmail(email)) {
      return next(errorHandler(400, "Invalid email"));
    }

    if (password.length < 6) {
      return next(errorHandler(400, "Password must be 6 character long"));
    }

    const salt = bcrypt.genSaltSync(10);

    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json("User created successfully");
  } catch (error) {
    next(error);
  }
};
