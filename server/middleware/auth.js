const jwt = require('jsonwebtoken');
const model = require('../models/userModel')
const auth = async (req,res,next)=>{

    try{
        const token = req.header('Authorization').replace('Bearer ','');
        if(!token){
           return req.status(403)
        }
        const decode = jwt.verify(token,"shears")
        const user = await model.findOne({_id:decode._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        res.status(400).send('Unauthorized')
    }

}

module.exports = auth