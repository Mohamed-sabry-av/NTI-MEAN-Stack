const jwt = require('jsonwebtoken');

const secrectKey = "hello1122"
exports.createAccessToken = (data)=>{
    return jwt.sign(data,secrectKey,{expiresIn:'1h'})
  }


  exports.authMW = (req,res,next)=>{
    try
    {
    const token = req.header('Authorization')?.replace('Bearer ','');
    
    if(token){
        const verified = jwt.verify(token,secrectKey);
        
        req.user = verified;
        next();
    }
    else
    {
        res.status(401).json({error: 'Access denied, token missing'})
    }
}
    catch(err){
        res.status(401).json({error:err.message})
    }
  }
  