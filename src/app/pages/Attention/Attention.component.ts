import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CreateMedicalCareResource } from 'src/app/models/medical-care/CreateMedicalCareResource';
import { MedicalCareResource } from 'src/app/models/medical-care/MedicalCareResource';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { MedicalCareService } from 'src/app/services/patient/medical-care.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ResultDialogAttentionComponent } from './result-dialog-attention/result-dialog-attention.component';

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
  createattentionobject!:CreateMedicalCareResource
  dataSource = new MatTableDataSource<any>();
  constructor(private ActivatedRoute:ActivatedRoute,private Router:Router, private patientservice:PatientService, private formBuilder: FormBuilder, private medicalcareservice:MedicalCareService,
    public dialog:MatDialog
    ) { 
    this.objpatient = {} as PatientResource
    this.createattentionobject = {} as CreateMedicalCareResource
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
      ktv:['',Validators.required],
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
    this.Router.navigate([this.whois,this.idurl,'patient',this.objpatient.id,'medicines'])
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

  PostAttention(){
    console.log(this.createattentionobject)
    this.createattentionobject.dialysisMaterial = 0
    this.medicalcareservice.CreateMedicalCare(this.objpatient.id,this.createattentionobject).subscribe((response:any) =>{
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      const dialogRef = this.dialog.open(ResultDialogAttentionComponent)
    })

    
  }

}
