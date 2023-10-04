const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'Developers secret EventsHub', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
        next(err); // Delete if it causes any errors
      } else {
        res.locals.userId = decodedToken.id;
        console.log(decodedToken.id)
        next();
      }
    });
  } else {
    res.redirect('/login');
    next(); // Delete if it causes any errors
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, 'Developers secret EventsHub', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };