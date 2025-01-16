const mongoose = require('mongoose')

let userRoleSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            unique:true,
        },
        RoleDetails:{
            type:String,
            required:true,
            maxlegnth: 200,
        },
    },{timestamps:true},
)

module.exports = mongoose.model('userRole',userRoleSchema)