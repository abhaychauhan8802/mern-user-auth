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

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, verified: newUser.verified },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    sendToken(email, "Verify Your email", `Your opt is ${verificationToken}`);

    res
      .status(200)
      .cookie("access_token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        ...newUser._doc,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
        resetPasswordToken: undefined,
      });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      return next(errorHandler(403, "Code is required"));
    }

    const user = await User.findOne({
      verificationToken: code,
    });

    if (!user) {
      return next(errorHandler(403, "Invalid verification code"));
    }

    if (user.verificationTokenExpiresAt < Date.now()) {
      return next(errorHandler(403, "Expired verification code"));
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    res.status(200).json("Email verified successfully");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const user = await User.findOne(
      { email },
      {
        verificationToken: 0,
        verificationTokenExpiresAt: 0,
        resetPasswordToken: 0,
        resetPasswordTokenExpiresAt: 0,
      }
    );

    if (!user) {
      return next(errorHandler(403, "User not found"));
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return next(errorHandler(403, "Invalid email or password"));
    }

    const token = jwt.sign(
      { id: user._id, verified: user.verified },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        ...user._doc,
        password: undefined,
      });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Sign out successfully");
  } catch (error) {
    next(error);
  }
};
