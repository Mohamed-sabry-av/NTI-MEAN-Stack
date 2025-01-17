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

    exports.updateUserType = async (req, res) => {
        try {
            const userTypeId = req.user.userType;
            if (userTypeId === 'Admin') {
                const { id } = req.params; // استلام معرف النوع من الباراميترز
                const updatedUserType = await userRoleModel.findByIdAndUpdate(
                    id,
                    req.body, // البيانات الجديدة
                    { new: true, runValidators: true } // خيارات لتحديث البيانات بشكل صحيح
                );
    
                if (!updatedUserType) {
                    return res.status(404).json({ error: 'User type not found' });
                }
    
                res.status(200).json({ message: 'User type updated successfully', updatedUserType });
            } else {
                res.status(401).json({ error: 'Access denied, admins only' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    
    exports.removeUserType = async (req, res) => {
        try {
            const userTypeId = req.user.userType;
            if (userTypeId === 'Admin') {
                const { id } = req.params; // استلام معرف النوع من الباراميترز
                const deletedUserType = await userRoleModel.findByIdAndDelete(id);
    
                if (!deletedUserType) {
                    return res.status(404).json({ error: 'User type not found' });
                }
    
                res.status(200).json({ message: 'User type deleted successfully' });
            } else {
                res.status(401).json({ error: 'Access denied, admins only' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    