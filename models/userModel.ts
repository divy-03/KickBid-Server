import { Document, model, Model, Schema } from "mongoose";
import validator from "validator";
import crypto from "crypto";
import { Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "player" | "admin" | "captain";
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  position:
    | "LW"
    | "RW"
    | "CAM"
    | "ST"
    | "CF"
    | "CM"
    | "CDM"
    | "LM"
    | "RM"
    | "LB"
    | "RB"
    | "CB"
    | "LWB"
    | "RWB"
    | "GK";
  rating: number;
  // tid: Types.ObjectId | ITeam;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    validate: [validator.isEmail],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["player", "admin", "captain"],
    default: "player",
  },
  avatar: {
    public_id: String,
    url: String,
  },
  position: {
    type: String,
    enum: [
      "LW",
      "RW",
      "CAM",
      "ST",
      "CF",
      "CM",
      "CDM",
      "LM",
      "RM",
      "LB",
      "RB",
      "CB",
      "LWB",
      "RWB",
      "GK",
    ],
  },
  rating: {
    type: Number,
    default: 0,
  },
  // tid: {
  //   type: Types.ObjectId,
  //   ref: "Team"
  // },
  resetPasswordToken: {
    type: String,
    default: undefined,
  },
  resetPasswordExpire: {
    type: Date,
    default: undefined,
  },
});

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User: Model<IUser> = model<IUser>("User", userSchema);
export default User;
