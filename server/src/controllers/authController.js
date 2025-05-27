import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Errors from "../utils/errors.js";

const {
  UserEmailNotProvided,
  UserPasswordNotProvided,
  UserEmailAlreadyExists,
  UserInvalidCredentials,
  UserNotFound,
} = Errors;


dotenv.config();

/**
 * Login an existing user
 * @function login
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Promise<void>}
 * @throws {UserEmailNotProvided}
 * @throws {UserPasswordNotProvided}
 * @throws {UserInvalidCredentials}
 */
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

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "7d" });


    res.json({ token, user: { _id: user._id, email: user.email } });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

/**
 * Register a new user
 * @function register
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Promise<void>}
 * @throws {UserEmailNotProvided}
 * @throws {UserPasswordNotProvided}
 * @throws {UserEmailAlreadyExists}
 */
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
        error: "Invalid format email.",
      });
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new UserEmailAlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiSuccess {Object[]} users List of users, with password field excluded
 * @apiError {Object} 500 Internal Server Error
 */
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password"); // ocultar password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @api {get} /users/:id Get user by ID
 * @apiName GetUserById
 * @apiGroup Users
 * @apiParam {String} id User ID
 * @apiSuccess {Object} user User data, with password field excluded
 * @apiError {Object} 404 User not found
 * @apiError {Object} 500 Internal Server Error
 */
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

/**
 * @api {patch} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiParam {String} id User ID
 * @apiBody {Object} user User data to update
 * @apiSuccess {Object} user Updated user data, with password field excluded
 * @apiError {Object} 404 User not found
 * @apiError {Object} 500 Internal Server Error
 */
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

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiParam {String} id User ID
 * @apiSuccess {Object} message Success message
 * @apiError {Object} 404 User not found
 * @apiError {Object} 500 Internal Server Error
 */
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      throw new UserNotFound();
    }

    res.json({ message: "User deleted successfully" });
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
