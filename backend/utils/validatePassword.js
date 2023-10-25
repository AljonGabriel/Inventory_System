const validatePassword = (enteredPassword) => {
  const min = 6;
  const max = 12;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).+$/;

  if (enteredPassword.length < min) {
    return `Password minimum length is ${min}.`;
  } else if (enteredPassword.length > max) {
    return `Password maximum length is ${max}.`;
  } else if (!passwordRegex.test(enteredPassword)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return null; // Return null if the password is valid
};

export default validatePassword;
