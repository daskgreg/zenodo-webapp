function errorHandler(err, req, res, next) {
    console.log(err);
    // 1. jwt authentication error
    // 2. validation error
    // 3. default to 500 server error
    if (err.name === 'UnauthorizedError') return res.status(401).json({message: "The user is not authorized"})
    if (err.name === 'ValidationError') return res.status(401).json({message: err})
    
    return res.status(500).json({message:"Internal Error",error:err});
}

module.exports = errorHandler;