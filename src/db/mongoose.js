const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})



// const me = new User({
//     name :'Sabyasachi',
//     email: 'sabyas@gmail.com',
//     password:'sabyasachi',
//     age :25
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

// const task1= new Task ({
//     description:'sabya'
// })

// task1.save().then(()=>{
//     console.log(task1)
// }).catch((error)=>{
//     console.log(error)
// })