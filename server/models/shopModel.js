const mongoose = require('mongoose');
const collectionName = 'shop';

const schema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    shop_image:{
        public_id:{type:String},
        url:{type:String}
    },
    city:{type:String,required:true,trim:true,lowercase:true},
    owner:[{
        owner_id:{type:mongoose.Schema.ObjectId}
    }],
    employee:[{
        emp_id:{
            type:mongoose.Schema.ObjectId,
            required:true
            }    
        }],
    facility:[{
        facility_name:{
            type:String,
            required:true,
            trim:true
        },
        prize:{
            type:Number,
            required:true
        }
        }]
})

const model = mongoose.model(collectionName,schema);
module.exports = model;