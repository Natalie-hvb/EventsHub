const User = require("../models/User");
const jwt = require('jsonwebtoken');

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
  return jwt.sign({ id }, 'Developers secret EventsHub', {
    expiresIn: maxAge
  });
};

// controller actions
const signup_get = (req, res) => {
  res.render('signup');
}

const login_get = (req, res) => {
  res.render('login');
}

const signup_post = async (req, res) => {
  const { username, name, surname, city, email, password } = req.body;

  try {
    const user = await User.create({ username, name, surname, city, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

const contact_get = (req, res) => {
  res.render('contact');
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
  contact_get
}



// login in case

// <div class="container mt-5">
//   <div class="row justify-content-center">
//     <div class="col-md-6">
//       <form action="/signup" class="bg-light p-4 rounded">
//         <h2 class="mb-4">Login</h2>
//         <div class="mb-3">
//           <label for="email" class="form-label">Email</label>
//           <input type="text" name="email" class="form-control" />
//           <div class="email error text-danger"></div>
//         </div>
//         <div class="mb-3">
//           <label for="password" class="form-label">Password</label>
//           <input type="password" name="password" class="form-control" />
//           <div class="password error text-danger"></div>
//         </div>
//         <button class="btn btn-primary">Login</button>
//       </form>
//     </div>
//   </div>
// </div>