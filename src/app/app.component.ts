import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import imageCompression from 'browser-image-compression';
import { FilestoreService } from './Services/filestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "angular-box";
  constructor(public service: FilestoreService , private _http: HttpClient){};
  filePath = '';
  errMsg:any = '';
  inputType = '';
  isCompressed: boolean = false;
 // post request to upload to s3 Bucket
  async uploadAWS(file: any) {
    const { url } = await fetch("http://localhost:3000/s3Url").then(res => res.json());
    console.log("secured url",url);
    await fetch(url,{
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: file
    });
    return url;
  }

  //upload validations and compression
  async onUpload(event: any){
    const files = event.target.files;
    const file = files[0];
    this.inputType = event.target.id;
    console.log("File Size", ( files[0].size / 1024 )/1024 + "MB");
  
  // upload file if less than 2MB
   try{
    let fileSize = ( ( file.size ) / 1024 ) / 1024;
    if(fileSize > 2) throw "File limit exceeds 2MB";
    let thisUrl = await this.uploadAWS(file);
    console.log("Returned Url", thisUrl);  
    this.filePath = thisUrl.split('?')[0];  
    console.log("image Url:", this.filePath);
  }
  // compress file if greater than or equal to 2MB
  catch(err){
    this.errMsg = err;
    console.log("Error: ", err);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 400,
      useWebWorker: true
    }
    try{
        this.isCompressed = true;
        const compressedFile = await imageCompression(file, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        console.log('originalFile instanceof Blob', file instanceof Blob); // true
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
        console.log("filec", compressedFile);
        let compressedUrl = await this.uploadAWS(compressedFile);
        console.log("Returned Compressed Url", compressedUrl);
        this.filePath = compressedUrl.split('?')[0];  
        console.log("Compressed image Url:", this.filePath);
     } 
   catch (error) {
    console.log(error);
  }
    }
  }

// fetch object request
async fetchObjs(event: any){
  console.log("event", event);
  let resp = await fetch("http://localhost:3000/getObjs").then(res => res.json());
  this.service.allFiles = resp;
}

// hide file on error
hideThis(event: any){
  let targetToHide = event.target;
  console.log("hide this", targetToHide);
  event.target.setAttribute("class", "isNone");
}
}
