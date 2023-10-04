const homePage = (req, res) => {
    res.send({
        err: null,
        title:"Home", 
        user: req.user});
}

module.exports = {
    homePage
}