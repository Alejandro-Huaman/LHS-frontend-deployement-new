import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Medicine',
  templateUrl: './Medicine.component.html',
  styleUrls: ['./Medicine.component.css']
})
export class MedicineComponent implements OnInit {
  whois=""
  idurl!:number
  home!:string
  todaydate:any
  fechaactual:Date = new Date()
  pipedate:DatePipe = new DatePipe("en-US")
  listmedicine = ["medicine 1","medicine 2","medicine 3"]
  listfrequency = ["frequency 1","frequency 2","frequency 3"]
  medicineform!:FormGroup
  constructor(private ActivatedRoute:ActivatedRoute,private Router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.medicineform=this.formBuilder.group({
      medicine:['',Validators.required],
      frequency:['',Validators.required],
      dose:['',Validators.required],
     })

    let id=parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!)
    console.log(this.ActivatedRoute.snapshot.url[0].path)

    this.whois=(this.ActivatedRoute.snapshot.url[0].path)
    this.idurl=id
    if(this.whois=="doctor"){
      this.home="home-doctor"
    }
    if(this.whois=="staff"){
     this.home="home-staff"
    }
    this.todaydate = this.pipedate.transform(this.fechaactual, 'dd/MM/yyyy');
  }
  GotoAttention(){
    this.Router.navigate([this.whois,this.idurl,'attention'])
  }

  getMedicinebyName(medicineselected:any){

  }
  
  getFrequencybyName(frequencyselected:any){

  }
}
