const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://user1996:Royshiny1!@mern-vercel.r56h0.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };