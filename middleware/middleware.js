const jwt = require("jsonwebtoken")
module.exports = (req,res,next)=>{
    const token = req.params.token;
    if(!token){
        return res.status(401).send({ok:false,message:"access denied . No token provided"})
    }

    try{
        const deccoded = jwt.verify(token,process.env.JWT_TOKEN);
    }catch{
        return res.status(401).send({ok:false,message:"Token expired"})
    }

    next();
}