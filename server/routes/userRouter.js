const express = require('express');
const mongoose = require('mongoose');
const model = require('../models/userModel');
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

router.post('/signup',async (req,res)=>{
    
    const options = Object.keys(req.body);
    const optionMain = ['name','email','password',"bussiness_account"];
    const isMatch = options.every((option) => optionMain.includes(option) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }
    try{

        const user = await new model(req.body)
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user,token})

    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/signin',async (req,res)=>{
    try{

    const user = await model.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({user,token})

    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/profile',auth,upload.single('profile'),(req,res)=>{
    try{
    const new_public_id = mongoose.Types.ObjectId();
    const public_id = req.user.profile.public_id != null?req.user.profile.public_id:new_public_id;
        // Upload to Cloudinary
    const imageBuffer = req.file.buffer;

    cloudinary.uploader.upload_stream({ 
        resource_type: 'image',
        width: 500,
        height: 500,
        crop: 'fill',
        overwrite: true,
        public_id:public_id,
        folder:'shears/profile/'
        }, (error, result) => {
        if (error) {
        return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
        }
              req.user.profile.public_id = public_id
              req.user.profile.url = result.secure_url
              req.user.save()
        // The result object contains information about the uploaded image
        res.json({ imageUrl: result.secure_url });
    }).end(imageBuffer);

    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/getUser',auth,async (req,res)=>{
    res.status(200).send(req.user)
})

router.patch('/updateUser',auth,async (req,res)=>{
    
    const options = Object.keys(req.body);
    const optionMain = ['name','email','password',"bussiness_account"];
    const isMatch = options.every((option) => optionMain.includes(option) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }
    try{ 
            options.every((option)=> req.user[option] = req.body[option] )
            await req.user.save()
            res.status(201).send({user:req.user,token:req.token})
    }catch(e){
            res.status(400).send(e)
    }
})

router.post('/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send()

    }
    catch(e){
        res.send(500).send(e)
    }

})

router.delete('/deleteUser',auth,async (req,res)=>{
    
    try{
     await req.user.remove()
     await res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
       
 })
 
module.exports = router