const Business = require('../models/businessModel');

/* // Handle requests for a business page by its ID
exports.getBusinessById = async (req, res) => {
  const businessId = req.params.id;

    try {
        const business = await Business.findById(businessId);

        if (!business) {
            return res.status(404).send('Business not found');
        }

        // Render the business page view with 'business' data
        res.render('businessPage', { business, title: business.businessName });
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
 */


const dummyBusinesses = [
    {
        name: 'Java Junction',
        location: 'Amsterdam',
        size: 'Small',
        description: 'A cozy cafe for coffee enthusiasts.',
        image: '/img/businessDummy1.jpg',
        category: 'Cafe',
    },
    {
        name: 'Canvas Creations',
        location: 'Rotterdam',
        size: 'Medium',
        description: 'An art gallery showcasing local talent.',
        image: '/img/businessDummy2.jpg',
        category: 'Art Gallery',
    },
    {
        name: 'The Groovy Groove',
        location: 'Utrecht',
        size: 'Big',
        description: 'A happening nightclub with live music.',
        image: '/img/businessDummy3.jpg',
        category: 'Club',
    },
    {
        name: 'Taste of Italy',
        location: 'The Hague',
        size: 'Medium',
        description: 'An authentic Italian restaurant.',
        image: '/img/businessDummy4.jpg',
        category: 'Restaurant',
    },
    {
        name: 'Green Oasis',
        location: 'Eindhoven',
        size: 'Small',
        description: 'A plant and garden store.',
        image: '/img/businessDummy5.jpg',
        category: 'Other',
    },
    {
        name: 'Tech Innovators',
        location: 'Other',
        size: 'Medium',
        description: 'A technology startup working on innovative projects.',
        image: '/img/businessDummy6.jpeg',
        category: 'Other',
    }    
    // Add more dummy businesses as needed
];

exports.getBusinessPage = async (req, res) => {
    try {
        // Fetch all businesses from the database (if you have a real database)
        // If not, use dummy businesses for presentation
        const businesses = await Business.find();

        // Merge the dummy businesses with the database businesses
        const allBusinesses = [...dummyBusinesses, ...businesses];

        // Render the business page with the list of businesses
        res.render('business', { businesses: allBusinesses, title: "Businesses" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.filterBusinesses = async (req, res) => {
    try {
        // Implement your filtering logic here based on req.body
        // For example, you can use Business.find() with filters

        // Fetch filtered businesses from the database (if you have a real database)
        // If not, use dummy businesses for presentation
        const filteredBusinesses = await Business.find(/* your filtering criteria */);

        // Render the business page with filtered results
        res.render('business', { businesses: filteredBusinesses, title: "Filtered Businesses" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

