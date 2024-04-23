const mongoose =  require('mongoose');
const express  =  require('express');
let dbUrl  =  'mongodb://localhost:27017/todo'
let cors =  require('cors')

mongoose.connect(dbUrl)
.then(()=>{
  console.log('connected.....');
})
.catch((err)=>{
  console.log(err);
})
// modal create 
// ek schema create jisme hum batayenge kya kya data send krenge database
const Schema =  mongoose.Schema
const mySchema  =  new Schema({
  
  task: String,
  status: {type: String, default:'pending'},
  ass_date:{type:Date,default:Date.now},
  due_date: Date,
  comp_date: Date

})


// Create a model based on the schema
const model =  mongoose.model('model',mySchema)

let myapp =  express();
// Middleware to parse JSON data
myapp.use(express.json())
myapp.use(cors())


// post api

myapp.post('/api/user', async(req,res)=>{
  try{
    const{task,status,ass_date,due_date,comp_date} = req.body;
    const newModel =  new model({task,status,ass_date,due_date,comp_date});
    await newModel.save();
    res.status(200).json({msg:'data send suceessfully'})
    console.log(newModel);
  } catch(err){
    res.status(500).json({ error: 'Error creating post' });
  }
})

// get api
myapp.get('/api/user', async (req, res) => {
  try {
    const result = await model.find({});
    res.send(result);
    console.log(result);
  } catch (error) {
    res.send(error);
  }
});
// delete method  --> automatic generated id se delete kr rhe hai
myapp.delete('/api/user/:id',(req,res)=>{
  const taskId =  req.params.id
  model.deleteOne({_id : taskId })
  .then((result)=>{res.send({msg:'data deleted'})})
  .catch((error)=>{res.send({msg:'data is not deleted'})})
})

// patch 
myapp.patch('/api/user/:id', async (req,res) =>{
  try{
   const taskId = req.params.id
   const updatedData =  req.body;
   const result =  await model.updateOne({_id: taskId},updatedData)
   res.send(result)
   console.log(updatedData);
  } catch(err){
    res.send(err);
  }
   })


// listen
myapp.listen(5050,()=>{
  console.log('running on 5050');
})
