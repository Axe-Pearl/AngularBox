import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "angular-box";
  filePath : any = '';
  onUpload(event: any){
    const files = event.target.files;
    console.log("files", files[0]);
    
    console.log("working!!", this.filePath)
    var reader = new FileReader();
    reader.addEventListener("load", ()=>{
      console.log("Reader Loaded", reader.result);
      this.filePath = reader.result;
    })
    reader.readAsDataURL(files[0]);
  }
}
