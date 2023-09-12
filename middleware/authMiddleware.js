const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if the token exists and is verified
  if (token) {
    jwt.verify(token, 'Developers secret EventsHub', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login'); // Redirect to login page on verification failure
      } else {
        console.log(decodedToken);
        next(); // Pass to the next middleware if token is valid
      }
    });
  } else {
    // Redirect to login page if no token is found
    res.redirect('/login');
  }
};


// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'Developers secret EventsHub', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await userModel.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
};

module.exports = { 
    requireAuth, 
    checkUser 
};