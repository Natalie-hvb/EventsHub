const Business = require('../models/business');

// Handle requests for a business page by its ID
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
