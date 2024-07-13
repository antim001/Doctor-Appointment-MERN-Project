const mongoose=require('mongoose');
mongoose.connect(process.env.MONGOURL);
const connection=mongoose.connection;
connection.on("connected",()=>{
    console.log('mongodb is coonected')
})
connection.on('error',()=>{
    console.log('error')
})
module.exports=mongoose;