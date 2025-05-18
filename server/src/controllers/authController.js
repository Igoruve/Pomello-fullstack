import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  UserEmailNotProvided,
  UserPasswordNotProvided,
  UserEmailAlreadyExists,
  UserInvalidCredentials,
  UserNotFound,
} from "../utils/errors.js";

dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new UserEmailNotProvided();
    }

    if (!password) {
      throw new UserPasswordNotProvided();
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new UserInvalidCredentials();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UserInvalidCredentials();
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { _id: user._id, email: user.email } });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new UserEmailNotProvided();
    }

    if (!password) {
      throw new UserPasswordNotProvided();
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "El email no tiene un formato válido.",
      });
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        error:
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new UserEmailAlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password"); // ocultar password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) {
      throw new UserNotFound();
    }
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      throw new UserNotFound();
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      throw new UserNotFound();
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export default {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
