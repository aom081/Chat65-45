import { generateToken } from "../utils/jwt.utils";
import User from "../model/user.model";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
