const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter your name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEdits = [
    "firstName",
    "lastName",
    "emailId",
    "password",
    "about",
    "skills",
    "gender",
    "age"
  ];

  const isEditAllowed = Object.keys(req.body).every((fields) => allowedEdits.includes(fields));
  return isEditAllowed;
}

module.exports = { validateSignUpData, validateEditProfileData };
