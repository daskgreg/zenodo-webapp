const {expressjwt:expressJwt} = require('express-jwt');

//Using Agorithm HS256
function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret:secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked
    }).unless({ path: [`${api}/login`,`${api}/users/register`] })
}

function isRevoked(res,token){
    if(token.payload.isAdmin == false){
        return res.status(401).json({message:"The user is not Authorized"});
    }
}

module.exports = authJwt;