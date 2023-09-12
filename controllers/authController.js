const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    //incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'this email is not registered';
    }

    //incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'this password is not registered';
    }

    // duplicate error code
    if (err.code === 1100) {
        errors.email = 'this email is already registered';
        return errors;
    }


    // validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'Developers secret EventsHub', {
        expiresIn: maxAge
    });
}

// controller actions

const signUp = (req, res) => {
    res.render('signup', {title:"Sign Up", user: req.user})
}

const logIn = (req, res) => {
    res.render('login', {title:"Login", user: req.user})
}

const signUpNewUser = async (req, res) => {
    const { username, name, surname, email, password, location } = req.body;

    try {
        const user = await userModel.create({ username, name, surname, email, password, location });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.render('main', { user });
    }
    catch (err) {
        console.error(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const logInUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        // Pass the user object to the template
        res.render('main', { user });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const signOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
}
  

module.exports = {
    signUp,
    logIn,
    signUpNewUser,
    logInUser,
    signOut
}