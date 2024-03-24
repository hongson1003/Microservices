const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_JWT;
const expiresIn = process.env.EXPIRESE_IN;
const signJWT = (data) => {
    return jwt.sign({
        data: data
    }, secret, { expiresIn: expiresIn });
}

const verifyJWT = (token) => {
    var decoded = jwt.verify(token, secret);
    return decoded;
}

module.exports = {
    signJWT,
    verifyJWT
}