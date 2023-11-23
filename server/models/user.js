import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this?.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this?.password, 8);
});

const user = mongoose.model("User", userSchema);

export default user;
