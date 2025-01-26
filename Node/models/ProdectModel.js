const mongoose = require('mongoose')

const ProductSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        details:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            required:true
        },
        image:{
            type:String,
        },
        discount:{
            type:Number,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        images:[{
            type:String
        }],
        isFeatured:{
            type:Boolean,
            default:false
        }
        
    }
)

module.exports = mongoose.model('Product',ProductSchema)