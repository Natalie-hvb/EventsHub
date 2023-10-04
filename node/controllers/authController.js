const User = require("../models/User");
const token = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', name: '', surname: '', city: '', email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'This email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'This password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'This email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return token.sign({ id }, 'Developers secret EventsHub', {
    expiresIn: maxAge
  });
};

// controller actions
const signup_get = (req, res) => {
  res.send({title:"Sign Up"});
}

const login_get = (req, res) => {
  res.send({title:"Login"});
}

const signup_post = async (req, res) => {
  let { username, name, surname, city, email, password } = req.body;

  try {
    const user = await User.create({ username, name, surname, city, email, password });
    const token = createToken(user._id);
    
    // Send a single JSON response containing both token and user data
    res.status(201).json({ token, user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};


const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    console.log(res)
    // Send a single JSON response containing both token and user data
    res.status(200).json({ token, user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};


const logout_get = (req, res) => {
  res.send('token', '', { maxAge: 1 });
  res.redirect('/');
}

const contact_get = (req, res) => {
  res.send({title: "Contact"});
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
  contact_get
}
