const UserModel = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { createUser };
