const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Vaishak",
    lastName: "R",
    emailId: "vaishak@r.com",
    password: "vaishak@123",
  };

  const user = new User(userObj);

  try {
    await user.save();
    res.send("Data saved successfully");
  } catch (error) {
    res.status(400).send("Error in saving data");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server listening on port 7777");
    });
  })
  .catch((error) => {
    console.log("Database connection failed");
  });
