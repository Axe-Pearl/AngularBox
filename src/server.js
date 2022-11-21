import express from 'express';
import cors from "cors";
import { generateUploadUrl } from './s3.js';
const app = express();

app.use(express.static('front'));
app.use(cors());
app.get("/", (req,res)=>{
    res.send("hello");
})
app.get('/s3Url', async (req,res)=>{
    const url = await generateUploadUrl();
    res.send({url});
})

app.listen(3000, (req, res) =>{
    console.log("Server running Successfully on port 3000");
})