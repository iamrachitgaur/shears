const express = require('express');
const mongoose = require('mongoose');
const model = require('../models/shopModel');
const auth = require('../middleware/auth');
const cloudinary = require('../middleware/cloudinary');  
const multer = require('multer');
const router = express.Router();

const Storage = multer.memoryStorage();
const upload = multer({ 
    limits:{
        fileSize:1000000
    },
    Storage:Storage,
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            callback(new Error('please select an image'))
        }
        callback(undefined, true)
    }
 });

router.post('/shop',auth,async (req,res)=>{
    const options = Object.keys(req.body);
    const optionMain = ['name','city','owner','employee','facility'];
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

router.post('/shop/:id',upload.single('shop_image'),(req,res)=>{
    const id = req.params.id;
    try{
        const new_public_id = mongoose.Types.ObjectId();
        const imageBuffer = req.file.buffer;
        model.findById(id,(error,shop)=>{
            if(error){
                return res.send(error)
            }
        const public_id = shop.shop_image.public_id != null?shop.shop_image.public_id:new_public_id;

            cloudinary.uploader.upload_stream({ 
                resource_type: 'image',
                width: 500,
                height: 500,
                crop: 'fill',
                overwrite: true,
                public_id:public_id,
                folder:'shears/shop_image/'
                },(error,result)=>{
                    if (error) {
                        return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
                    }

                    const shop_image = {public_id:public_id,url:result.secure_url}
                    shop.shop_image = shop_image
                    shop.save()
                    res.send(result.secure_url)
                }).end(imageBuffer)
        })
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/shop',auth,async (req,res)=>{
    try{
        const shop = await model.find()
        res.status(200).send(shop)
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