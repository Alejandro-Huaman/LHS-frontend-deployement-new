import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-Attention',
  templateUrl: './Attention.component.html',
  styleUrls: ['./Attention.component.css']
})
export class AttentionComponent implements OnInit {
  whois=""
  idurl!:number
  home!:string
  documentnumber = new FormControl("", Validators.min(7))
  objpatient!:PatientResource;
  showform:boolean = false
  attentionform!:FormGroup
  constructor(private ActivatedRoute:ActivatedRoute,private Router:Router, private patientservice:PatientService, private formBuilder: FormBuilder) { 
    this.objpatient = {} as PatientResource
  }

  ngOnInit() {
    this.attentionform=this.formBuilder.group({
      ureapre:['',Validators.required],
      ureapost:['',Validators.required],
      weight:['',Validators.required],
      initweight:['',Validators.required],
      finalweight:['',Validators.required],
      uf:['',Validators.required],
      time:['',Validators.required],
      hemoglobine:['',Validators.required],
      hematocrite:['',Validators.required],
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
  }

  GotoDoctorStaffHome(){
    this.Router.navigate([this.whois,this.idurl,this.home])
  }

  GotoMedicines(){
    this.Router.navigate([this.whois,this.idurl,'medicines'])
  }

  findbyDNI(){
         
    this.patientservice.getPatientByDocumentNumber(this.documentnumber.value).subscribe((response:any)=>{
                 this.objpatient=response;
                 console.log(this.objpatient)
                 this.showform = true
    },err=>{
     alert("Dni no identificado")
      
    })
  }

  validateDni(){
        
    if(this.documentnumber.value?.length === 8){
        return true
    }else{
      return false
    }

}

}
