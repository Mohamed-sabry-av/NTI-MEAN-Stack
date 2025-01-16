const userRoleModel = require ('../models/UserRoleModel');

exports.createUserType= async(req,res)=>
    {
        try{
            const userTypeId = req.user.userType;
            if(userTypeId === 'Admin')
            {
        const userType = await userRoleModel.create(req.body);
        res.status(201).json(userType);
            }
            else
            {
                res.status(401).json({error : 'access denied, admins only'})
            }
        }
        catch(err){
            res.status(500).json({error:err.message});
        }
    }
    
    exports.getUserTypes = async(req,res)=>{
        try{
            const myUserTypeName  = req.user.userType;
          
           
            if(myUserTypeName === 'Admin')
            {
    const userTypes = await userRoleModel.find();
    res.status(200).json(userTypes);
    }
    else
    {
        res.status(401).json({error : 'access denied, admins only'})
    }
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }