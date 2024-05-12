import  dotenv  from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();


const app = express();

mongoose.connect(
    process.env.MONGODB
)
        .then(() => {
            console.log('MongoDb is Connected')
        }).catch((err) => {
            console.log(err);
        })

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!')
})