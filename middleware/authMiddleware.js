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
        next(err);
      } else {
        res.locals.userId = decodedToken.id;
        // console.log(decodedToken.id)
        next();
      }
    });
  } else {
    res.redirect('/login');
    next();
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
              try {
                  const user = await User.findById(decodedToken.id);
                  if (user) {
                      res.locals.user = user;
                  } else {
                      console.log('User not found in database'); // Add this debug log
                      res.locals.user = null;
                  }
                  next();
              } catch (error) {
                  console.error(error);
                  res.locals.user = null;
                  next();
              }
          }
      });
  } else {
      res.locals.user = null;
      next();
  }
};





module.exports = { requireAuth, checkUser };