const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateAge = (age) => {
  return Number.isInteger(age) && age >= 13;
};

const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};

module.exports = {
  validateEmail,
  validateAge,
  validateName
};