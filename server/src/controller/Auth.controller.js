// controllers/authController.js
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {User} from '../model/User.model.js'
import 'dotenv/config'

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
      const result = await User.findByIdAndDelete(req.params.id)
      if (!result) {
          return res.status(404).json({ message: 'User is Deleted' })
      }
      res.json(result)
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
}