import express from 'express';
import cors from "cors";
import { generateUploadUrl, getBucketObjects } from './s3.js';
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

app.get("/getObjs", async(req,res)=>{
    const BucketObjs = await getBucketObjects();
    console.log("BucketObjs: ", BucketObjs);
    res.send(BucketObjs);
})

app.listen(3000, (req, res) =>{
    console.log("Server running Successfully on port 3000");
});