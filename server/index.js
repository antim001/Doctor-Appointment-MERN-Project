const express =require('express');
const app=express();
const cors=require('cors');
require('dotenv').config()
const dbConfig=require('./config/dbConfig');
const userRoutes=require('./routes/userRoutes')
const port=process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/user',userRoutes)

app.listen(port,()=>console.log(`server cholche port number,${port}`))