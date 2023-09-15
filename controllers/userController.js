const User = require('../models/User');

// Handle requests for a user's profile by their ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

    // Render the user profile view with 'user' data
        res.render('userProfile', { user, title: user.username }); // Adjust the view name as needed
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
