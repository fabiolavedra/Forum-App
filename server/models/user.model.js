const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (val) {
          return /^([\w.-]+@([\w-]+\.)+[\w-]+)$/.test(val);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    },
    role: {
      type: "String",
      default: "user",
    },
    favouritePosts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    return (this._confirmPassword = value);
  });

UserSchema.pre("validate", function (next) {
  if (this.isModified("password")) {
    if (this.password !== this._confirmPassword) {
      this.invalidate(
        "confirmPassword",
        "Password must match confirm password"
      );
    }
  }
  next();
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
