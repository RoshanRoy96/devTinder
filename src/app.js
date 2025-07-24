const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.use(express.json()); // middleware to read JSON data

app.post("/signup", async (req, res) => {
  const userObj = req.body;
  const user = new User(userObj);
  try {
    const ALLOWED_FIELDS = [
      "firstName",
      "lastName",
      "emailId",
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const isFieldsAllowed = Object.keys(userObj).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if(!isFieldsAllowed) {
      throw new Error("Data cannot be saved");
    }
    if(userObj?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    await user.save();
    res.send("User saved successfully");
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

// get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.find({ emailId: userEmail });
//     if (user.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// using findone
app.get("/user", async (req, res) => {
  const userEmail = req.data.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// feed API to get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// delete user API
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// update user API
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update failed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be add more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User data updated succesfully");
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

// update user API using emailId
// app.patch("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   const data = req.body;
//   try {
//     const user = await User.findOneAndUpdate({ emailId: userEmail }, data, { new: true });
//     console.log(user);
//     res.send("User data updated successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

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
