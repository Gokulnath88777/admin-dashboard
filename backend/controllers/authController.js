
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    console.log(req.body)
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json(
        {
          message: "Field is required"
        }
      )
    }

    const existingUser = await User.findOne(
      {
        where:
        {
          email
        }
      }
    );

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPass,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        pass: user.password,
        role: user.role
      }
    });

  } catch (err) {
    console.log(err.message)
    res.status(500).json({

      message: "Something went wrong"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne(
      {
        where:
        {
          email
        }
      }
    )

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }
    const isTrue = await bcrypt.compare(password, user.password);
    if (!isTrue) {
      return res.status(400).json({
        message: "Invalid details"
      });
    }
    const token = jwt.sign(
      {
        id: user.id, email: user.email, role: user.role
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h"
      },
    );

    res.cookie("token", token, {
      httponly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
    });
    res.json(
      {
        message: "Login successful"
      }
    );

  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Something went wrong"
    })
  }
}
module.exports = { register, login }