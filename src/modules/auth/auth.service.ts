import { User } from "../user/user.model";
import { comparePassword, hashPassword } from "../../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt";

/**
 * Register Admin (Only One Admin Allowed)
 */
export const registerAdmin = async (
  name: string,
  email: string,
  password: string
) => {
  // Check if admin already exists
  const adminCount = await User.countDocuments();

  if (adminCount > 0) {
    throw new Error("Admin already exists. Registration disabled.");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  return user;
};

/**
 * Login Admin
 */
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};
