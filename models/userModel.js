import mongoose from "mongoose";

// create collection
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLenght: 4,
      trim: true,
      maxLenght: 10,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
    },
    skill: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    location: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    gallery: {
      type: Array,
      trim: true,
    },
    follower: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    accessToken: {
      type: String,
      trim: true,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
