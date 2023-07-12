const User = require("../Models/userModel");
const mongoose = require("mongoose");

const createUser = async (req, res) => {
  const { username, email, password, battleTag, createdAt } = req.body;

  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });
    const validEmail = (email) => {
      const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return regEmail.test(email);
    };

    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    } else if (existingEmail) {
      return res.status(409).json({ error: "Email is already in use." });
    }

    const isValidEmail = validEmail(email);

    if (!isValidEmail) {
      return res.status(403).json({ error: "Please enter a valid email." });
    }

    const user = await User.create({
      username,
      email,
      password,
      battleTag,
      createdAt,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (err) {
    return;
  }
};

const getAUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({
        error: `${id} is not a valid user ID. Please check your input.`,
      });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({
          error: "You have not entered a user ID. Please enter a user ID.",
        });
    }

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: `${id} is not a valid user ID. Please check your input.`,
    });
  }

  try {
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!user) {
      res.status(404).json({
        error: "You have not entered a user ID. Please enter a user ID.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  res.status(200).json({ success: `User ${user.username} has been updated.` });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Please enter a valid user ID." });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res
      .status(404)
      .json({
        error: "You have not entered a user ID. Please enter a user ID.",
      });
  }

  res.status(200).json({ success: "User has been deleted." });
};

module.exports = {
    createUser,
    getAllUsers,
    getAUser,
    updateUser,
    deleteUser
};
