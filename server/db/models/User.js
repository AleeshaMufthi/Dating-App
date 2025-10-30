const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    age: {
      type: Number,
    },
    work: {
      type: String,
    },
    education: {
      type: String,
    },
    gender: {
      type: String,
    },
    hometown: {
      type: String,
    },
    password: {
      type: String,
    },
    profile: {
      url: { type: String },
      publicId: { type: String },
    },
    // publicId: {
    //   type: String,
    // },
    interests: [{
      type: String,
    }],
    foodPreference: {
      type: String
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    disliked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    travelLocation: {
      placeName: { type: String },
      lat: { type: Number },
      lng: { type: Number },
      images: [{ type: String }],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = { User };
