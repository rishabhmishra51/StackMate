const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name must be at most 50 characters"],
      match: [/^[a-zA-Z ]+$/, "First name can contain only letters and spaces"],
    },

    lastName: {
      type: String,
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name must be at most 50 characters"],
      match: [/^[a-zA-Z ]+$/, "Last name can contain only letters and spaces"],
    },

    emailId: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [20, "Password must be at most 20 characters"],
      validate: {
        validator: function (value) {
          // At least 1 uppercase, 1 lowercase, 1 number, 1 special character
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$/.test(
            value
          );
        },
        message:
          "Password must contain uppercase, lowercase, number and special character",
      },
    },

    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [80, "Age must be less than 80"],
    },

    gender: {
      type: String,
      lowercase: true,
      enum: {
        values: ["male", "female", "others"],
        message: "Gender must be male, female or others",
      },
    },

    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      trim: true,
      match: [
        /^(https?:\/\/)(www\.)?[^\s]+$/i,
        "Photo URL must be a valid URL",
      ],
    },

    about: {
      type: String,
      trim: true,
      maxlength: [250, "About section can be max 250 characters"],
      default: "Hey there! I am using StackMate",
    },

    skills: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 20; // max 20 skills
        },
        message: "Skills cannot be more than 20",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;