const express = require('express');
const model = require('../models/shopModel');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/shop',auth,async (req,res)=>{
    const options = Object.keys(req.body);
    const optionMain = ['name','owner','employee','facility'];
    const isMatch = options.every((option) => optionMain.includes(option) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }
    try{
        const shop = await new model(req.body)
        await shop.save()
        res.status(201).send(shop)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/shop/:id',auth,async (req,res)=>{
    const id = req.params.id
    try{
        const shop = await model.findById(id)
        res.status(200).send(shop)
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports = router