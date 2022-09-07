const { getNextKeyDef } = require("@testing-library/user-event/dist/keyboard/getNextKeyDef");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    var decodedToken;
    try {
        if(token){
            decodedToken = jwt.verify(token, 'asecrettoken');
        }
    }
    catch (err) {
        console.log(err);
    }
    if(decodedToken){
        req.username = decodedToken.username;
        next();
    }
}