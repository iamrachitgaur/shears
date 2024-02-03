const express = require('express');
const model = require('../models/timeSlotModel');
const auth = require('../middleware/auth');
const { route } = require('./shopRouter');
const router = express.Router();

router.post('/slot',auth,async (req,res)=>{
    const options = Object.keys(req.body);
    const optionMain = ['emp_id','slots'];
    const isMatch = options.every((option) => optionMain.includes(option) )

    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }
    try{
        const slot = await new model(req.body)
        await slot.save()
        res.status(201).send(slot)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/slot/:id',auth,async (req,res)=>{
    try{
        const slot = await model.findOne({emp_id:req.params.id})
        res.status(200).send(slot)
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports = router