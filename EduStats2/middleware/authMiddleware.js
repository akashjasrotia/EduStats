const jwt = require('jsonwebtoken');
const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.send(401).json({message:"Unauthorized, Please login first"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECTRET);
        req.user = decoded;
        next();
    }
    catch(err){
        res.send(500).json({message:"internal server error"});
    }
}
module.exports = authMiddleware;