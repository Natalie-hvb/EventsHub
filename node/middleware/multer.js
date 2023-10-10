const multer = require("multer");
var path = require("path");

//Production Path
function productionStatic (pathFolder, callback) {
    return callback(null, `${pathFolder}/`)
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        productionStatic ("img", callback)
    },
    filename: function (req, file, callback) {
        callback (null, file.originalname);
    }
});
const upload = multer({ storage : storage});

module.exports = upload;