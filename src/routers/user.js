const express= require('express')
const multer=require('multer')
const router =new express.Router()
const User=require('../models/user')
const auth =require('../middleware/auth')
const {sendwelcomemail,cancelEmail}=require('../emails/account')
router.post('/users',async (req,res)=>{
    const user =new User(req.body);
    
    try{
        await user.save()
        sendwelcomemail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.send({user,token})

    }
    catch(e){
        res.status(400).send(e)
    }
    
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     res.status(400)
    //    res.send(error)
    // })
})

router.post('/users/login',async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})

    }
    catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens =req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.status(200).send()    
    }
    catch(e){
        console.log(e)
        res.status(500).send()
    }
})

router.get('/users/me',auth,async (req,res)=>{
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
    // try{
    //     const users= await User.find({})
    //     res.send(users)
    // }
    // catch(e){
    //     res.status(500).send()
    // }
    res.send(req.user)

})
// router.get('/users/:id',async (req,res)=>{
//     const _id=req.params.id

//     try{
//         const user =await User.findById(_id)
//         if(!user){
//             return res.status(400).send()
//         }
//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send()
//     }
//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)

//     // }).catch((e)=>{
//     //     res.status(500).send()
//     // })
// })

router.patch('/users/me',auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const  isValidOperation =updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }
    try{
        //const user=await User.findById(req.params.id)
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{ new:true,runValidators:true})
        
        res.send(req.user)

    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    try{
        // const user= await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove();
        cancelEmail(req.user.email,req.user.name)
        res.send(req.user)
    }
    catch(e){
        
        res.status(500).send()
    }
})

const avatar=multer({
    //dest:'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload pictures with extension jpg,jpeg or png'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,avatar.single('avatar'),async (req,res)=>{
    req.user.avatar=req.file.buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    try{
        req.user.avatar=undefined
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()        
    }
})

router.get('/users/:id/avatar', async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)

        if(!user|| !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    }
    catch(e){
        res.status(404).send()
    }
})

module.exports=router