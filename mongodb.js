//crud


// const mongodb =require('mongodb');

// const MongoClient=mongodb.MongoClient;
// const objectID=mongodb.ObjectID
//shorthand can be used for above three lines

const {MongoClient, ObjectID}=require('mongodb')
const connectionURL='mongodb://127.0.0.1:27017'
const databaseName ='task-manager'


MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('unable to connect to database')
    }
    const db= client.db(databaseName)

    // db.collection('users').findOne({name:'sabyasachi'},(error,user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    //})

    // db.collection('tasks').findOne({_id: new ObjectID("5c8df6c516dbc7092873049c")},(error,task)=>{
    //     console.log(task);
    // })
    // db.collection('tasks').find({completed :false}).toArray((error,tasks)=>{
    //     console.log(tasks)
    // })

   
    // const updatePromise=db.collection('users').updateOne({
    //     _id: new ObjectID("5c8df0634c75a91edc8a621f")
    // },{
    //     $set:{
    //         name:'lolo'
    //     }
    // })

    // updatePromise.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    // db.collection('tasks').updateMany({
    //    completed :false
    // },{
    //     $set :{
    //         completed :true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({
    //     age:25
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    db.collection('tasks').deleteOne({
        description :'tab app'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

})

