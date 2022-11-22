import aws from "aws-sdk";
import dotenv from 'dotenv';
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "ap-northeast-1";
const bucketName = "angularbox";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
  })  
console.log(s3);

// generate a secure url here
export async function generateUploadUrl(){
const rawBytes = await randomBytes(16);
const imageName = rawBytes.toString('hex');
console.log("ImageName", imageName);
const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  });

const uploadURL = await s3.getSignedUrlPromise('putObject', params)
return uploadURL;
}


export async function getBucketObjects(){
   // get all objects from s3 bucket
  return new Promise((resolve,reject)=>{
     s3.listObjectsV2({Bucket: bucketName, MaxKeys: 200}, (err, data) => {
      if(err) { 
        console.log("Error: ", err);
        reject("Error")
      }
      console.log("Data", data.Contents);
        resolve(data.Contents);
    }); 
  })
}