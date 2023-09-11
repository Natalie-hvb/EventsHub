const homePage = (req, res) => {
    res.render('main', {title:"Home"});
}

module.exports = {
    homePage
}