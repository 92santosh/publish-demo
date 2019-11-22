import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Record, Languages } from './record';
import { FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , AfterViewInit {
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  public nameControl:FormControl = null;
  public genderCotrol:FormControl= null;
  
  public languages:Languages[] = [
    {name:'Java',checked:false},
    {name:'Php',checked:false},
    {name:'Python',checked:false},
    {name:'Javascript',checked:false},
    {name:'Typescript',checked:false},
  ];
  public headers:Array<String> = [
    'name',
    'gender',
    'languages',
    'photo'
  ];


  public dataSource:MatTableDataSource<Record> = null;
  public allRecords:Array<Record> = new Array<Record>();
  public constructor(){
    this.nameControl = new FormControl('',[]);
    this.genderCotrol = new FormControl('male',[]);
  }
  ngOnInit(){}
  ngAfterViewInit(){}
  private selectedLangiages:Array<string> = [];
  public submit():void{
    if(this.isValidData()){
      let record:Record = <Record>{};
       record.name = this.nameControl.value;
       record.gender = this.genderCotrol.value;
       record.languages = this.selectedLangiages.join(",");
       record.photo = this.imageBase64;
       this.allRecords.push(record);
       this.dataSource = new MatTableDataSource(this.allRecords);
       this.dataSource.paginator = this.paginator;
       alert("submit success");
       this.resetData();
    }
  }
  public resetData():void{
    this.imageBase64 ='';
    this.selectedLangiages = [];
    this.languages.forEach(lang=>{
      lang.checked = false;
    });
  }
  private isValidData():boolean{
    if(!this.nameControl.value || this.nameControl.value.trim().length<1){
      alert("Please Enter Name.");
      return false;
    }
    if(this.selectedLangiages.length<1){
      alert("Please Select Atleast One Language.");
      return false;
    }
    if(this.imageBase64.length<1){
      alert("Please Upload Image");
      return false;
    }
    return true;
  }
  public setLanguage(languages:Languages):void{
    if(this.selectedLangiages.indexOf(languages.name)==-1){
      this.selectedLangiages.push(languages.name);
      languages.checked = true;
    }else{
      let index = this.selectedLangiages.indexOf(languages.name);
      this.selectedLangiages.splice(index,1);
      languages.checked = false;
    }
  }
  public imageBase64:string = '';
  public fileChange(ev:Event):void{
     let fileType:HTMLInputElement = <HTMLInputElement>ev.currentTarget;
     if(fileType.files){
       let file:File = fileType.files[0];
       let typeRegx=/^(.*\.(jpeg|jpg|bmp|gif|png))$/;
       if(!typeRegx.test(file.name)){
         alert("Please Enter Image File Only..!");
         return;
       }
       let reader = new FileReader();
       reader.onload = (ev:any)=>{
          this.imageBase64 = ev.target.result;
       }
       reader.readAsDataURL(file);
     }
  }
}
