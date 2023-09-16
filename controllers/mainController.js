const homePage = (req, res) => {
    res.render('main', {title:"Home", user: req.user});
}

module.exports = {
    homePage
}