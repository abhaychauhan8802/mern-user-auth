import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// local import
import { errorHandler } from "../utils/error.js";
import { validateEmail } from "../utils/validateEmail.js";
import { sendToken } from "../utils/mail.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      return next(errorHandler(400, "User already exist"));
    }

    if (!validateEmail(email)) {
      return next(errorHandler(400, "Invalid email"));
    }

    if (password.length < 6) {
      return next(errorHandler(400, "Password must be 6 character long"));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log(verificationToken);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    const user = await newUser.save();

    const { password: _, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    sendToken(email, "Verify Your email", `Your opt is ${verificationToken}`);

    res
      .status(200)
      .cookie("access_token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
