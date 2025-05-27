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
 * Logs in an existing user using the provided email and password.
 * 
 * @param {String} email - The user's email address.
 * @param {String} password - The user's password.
 * 
 * @returns {Promise<Object>} A promise that resolves with an object containing the user's details and a token if the login was successful,
 * or an object with an error message if there was an issue with the login.
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
 * Registers a new user using the provided email and password.
 * 
 * @param {String} email - The user's email address.
 * @param {String} password - The user's password.
 * 
 * @returns {Promise<Object>} A promise that resolves with an object containing the user's details and a token if the registration was successful,
 * or an object with an error message if there was an issue with the registration.
 * 
 * Validation rules:
 * - Email must be in a valid format.
 * - Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.
 * - Email must not already be in use.
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
 * Retrieves a list of all users from the database.
 *
 * Excludes the password field from the returned user objects for security reasons.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Sends a JSON response with an array of user objects or an error message.
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
 * Retrieves a user by their ID from the database.
 *
 * Excludes the password field from the returned user object.
 *
 * @param {Object} req - Express request object. Must include the user ID in params.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Sends a JSON response with the user object or an error message.
 *
 * @throws {UserNotFound} If the user with the specified ID is not found.
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
 * Updates a user by their ID in the database.
 *
 * Accepts an Express request object containing the user ID in the URL parameters
 * and the updated user data in the request body. The password field is excluded
 * from the updated user object for security reasons.
 *
 * @param {Object} req - Express request object. Must include the user ID in params
 * and updated user data in the body.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Sends a JSON response with the updated user object or an error message.
 *
 * @throws {UserNotFound} If the user with the specified ID is not found.
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
 * Deletes a user by their ID from the database.
 *
 * Accepts an Express request object containing the user ID in the URL parameters.
 *
 * @param {Object} req - Express request object. Must include the user ID in params.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Sends a JSON response with a success message or an error message.
 *
 * @throws {UserNotFound} If the user with the specified ID is not found.
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
