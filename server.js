const express = require('express');
const mongoose = require('mongoose');
const route = require('./config/routes');
require('./config/mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.use(route);

const dbURI = "mongodb+srv://EHAdmin:OgBXRJeO1Ms7Bj2r@events.x2zumxc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

    const User = mongoose.model('User', userSchema);
    const Business = mongoose.model('Business', businessSchema);
    const Event = mongoose.model('Event', eventSchema);

    app.get('/search', async (req, res) => {
        const query = req.query.q; // Get the search query from the URL parameter

        try {
          // Perform searches on each collection (users, businesses, events) using Mongoose queries
            const userResults = await User.find({ $text: { $search: query } });
            const businessResults = await Business.find({ $text: { $search: query } });
            const eventResults = await Event.find({ $text: { $search: query } });

          // Combine the results into a single array
            const results = [...userResults, ...businessResults, ...eventResults];

          // Send the results to the search page
            res.render('search', { results }); // 'search' is your search results view
        } 
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });