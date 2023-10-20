const bcrypt = require("bcrypt");
const User = require("../models/user");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

const passwordMatch = (password, repwd) => {
  return password === repwd;
};

const passwordRequirements = (password, repwd) => {
  const minLength = 6;
  const maxLength = 12;

  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,12}$/;

  const confirmPwd = passwordMatch(password, repwd);

  let error = null;

  if (password && password.length < minLength) {
    error = `Minimum password length is ${minLength}`;
  } else if (password && password.length > maxLength) {
    error = `Maximum password length is ${maxLength}`;
  } else if (!passwordPattern.test(password)) {
    error =
      "Password must contain letters, numbers, and at least one special character.";
  } else if (!confirmPwd) {
    error = "Password don't match";
  }

  return error;
};

module.exports = {
  hashPassword,
  comparePassword,
  passwordRequirements,
};
