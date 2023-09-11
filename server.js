const express = require('express');
const route = require('./config/routes');
const cookieParser = require('cookie-parser');

require('./config/mongoose');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

// view engine
app.set('view engine', 'ejs');

// cookies
app.use(cookieParser());

app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});

app.use(route);
app.listen(3000, () => {
        console.log("Server started on port 3000");
});

// const dbURI = "mongodb+srv://EHAdmin:OgBXRJeO1Ms7Bj2r@events.x2zumxc.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(result => {
//     const User = mongoose.model('User', userSchema);
//     const Business = mongoose.model('Business', businessSchema);
//     const Event = mongoose.model('Event', eventSchema);

//     app.listen(3000, () => {
//       console.log("Server started on port 3000");
//     });

//     app.get('/search', async (req, res) => {
//       const query = req.query.q; // Get the search query from the URL parameter

//       try {
//         // Perform searches on each collection (users, businesses, events) using Mongoose queries
//         const userResults = await User.find({ $text: { $search: query } });
//         const businessResults = await Business.find({ $text: { $search: query } });
//         const eventResults = await Event.find({ $text: { $search: query } });

//         // Combine the results into a single array
//         const results = [...userResults, ...businessResults, ...eventResults];

//         // Send the results to the search page
//         res.render('search', { results }); // 'search' is your search results view
//       } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//       }
//     });
//   })
//   .catch(err => console.log(err));