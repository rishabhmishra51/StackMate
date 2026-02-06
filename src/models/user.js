const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken"); 
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
  validate(value) {
    if (!validator.isEmail(value)) {
      throw new Error("Invalid email address: " + value);
    }
  },
},

    password: {
      type: String,
     validate(value) {
    if (!validator.isStrongPassword(value)) {
      throw new Error("Enter a strong password");
    }
  },
      // required: [true, "Password is required"],
      // minlength: [6, "Password must be at least 6 characters"],
      // maxlength: [20, "Password must be at most 20 characters"],
      // validate: {
      //   validator: function (value) {
      //     // At least 1 uppercase, 1 lowercase, 1 number, 1 special character
      //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$/.test(
      //       value
      //     );
      //   },
      //   message:
      //     "Password must contain uppercase, lowercase, number and special character",
      // },
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
      validate(value) {
    if (!validator.isURL(value)) {
      throw new Error("Invalid photo Url: " + value);
    }
  },
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

userSchema.methods.getJWT=async function() {
  const user=this;
  const token=await jwt.sign({_id:user._id},"Rishabh@4873",{expiresIn:"1d"});

  return token;
}
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};
const User = mongoose.model("User", userSchema);

module.exports = User;