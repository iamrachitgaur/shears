const mongoose = require('mongoose');
const collectionName = 'timeSlot';

const schema = mongoose.Schema({
        emp_id:{
            type:mongoose.Schema.ObjectId,
            required:true
        },
        slots:[{
            slot_date:{type:Date,required:true},
            slot_time:[{
                slot:{type:Date,required:true},
                booked:{type:Boolean,required:true,default:false}
            }]            
        }]
})

const model = mongoose.model(collectionName,schema);
module.exports = model;