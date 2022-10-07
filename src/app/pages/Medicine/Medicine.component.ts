import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MedicineResource } from 'src/app/models/medicine/MedicineResource';
import { CreatePatientMedicineResource } from 'src/app/models/patient-medicine/CreatePatientMedicineResource';
import { MedicineService } from 'src/app/services/ehr/medicine.service';
import { PatientMedicineService } from 'src/app/services/patient/patient-medicine.service';
import { ResultDialogMedicineComponent } from './result-dialog-medicine/result-dialog-medicine.component';

export interface DataGoToDialog{
  who:string
  id:number
  idpatient:number
}

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
  idurlpatient!:number
  datagoobject!:DataGoToDialog
  fechaactual:Date = new Date()
  pipedate:DatePipe = new DatePipe("en-US")
  listmedicine!:MedicineResource[]
  listfrequency = ["Mensual","Diario"]
  medicineform!:FormGroup
  objectmedicine!:MedicineResource
  listobjectmedicine!:MedicineResource[]
  frecuencyselected!:string
  dosesselected!:number
  dataSource = new MatTableDataSource<any>();
  createpatientmedicine!:CreatePatientMedicineResource 
  constructor(private ActivatedRoute:ActivatedRoute,private Router:Router, private formBuilder: FormBuilder, private medicineservice:MedicineService,private patientmedicineservice:PatientMedicineService,
              public dialog:MatDialog) 
  { 
    this.objectmedicine = {} as MedicineResource
    this.createpatientmedicine = {} as CreatePatientMedicineResource
    this.datagoobject = {} as DataGoToDialog
  }

  ngOnInit() {
    this.medicineform=this.formBuilder.group({
      medicine:['',Validators.required],
      frequency:['',Validators.required],
      dose:['',Validators.required],
     })

    let id=parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!)
    let patientid=parseInt(this.ActivatedRoute.snapshot.paramMap.get('patientid')!)
    console.log(this.ActivatedRoute.snapshot.url[0].path)
    this.idurlpatient = patientid 
    this.whois=(this.ActivatedRoute.snapshot.url[0].path)
    this.idurl=id
    if(this.whois=="doctor"){
      this.home="home-doctor"
    }
    if(this.whois=="staff"){
     this.home="home-staff"
    }
    this.todaydate = this.pipedate.transform(this.fechaactual, 'dd/MM/yyyy');
    this.getAllMedicines();
  }

  GotoAttention(){
    this.Router.navigate([this.whois,this.idurl,'attention'])
  }

  getMedicinebyName(medicineselected:any){
    console.log(medicineselected)
    this.medicineservice.getMedicineByName(medicineselected)
  }
  
  getFrequencybyName(frequencyselected:any){
    console.log(frequencyselected)
  }

  getAllMedicines(){
    this.medicineservice.getAllMedicines().subscribe( (response:any) =>{
      this.listmedicine = response
      console.log(this.listmedicine)
    })
  }

  PostMedicine(){
    console.log(this.objectmedicine)
    console.log(this.frecuencyselected)
    console.log(this.dosesselected)
    this.medicineservice.getMedicineByName(this.objectmedicine.name).subscribe( (response:any) =>{
      this.listobjectmedicine = response
      this.objectmedicine = this.listobjectmedicine[0]
      console.log(this.objectmedicine)
      this.createpatientmedicine.frequency = this.frecuencyselected 
      this.createpatientmedicine.quantity = this.dosesselected 
      
      this.patientmedicineservice.CreatePatientMedicine(this.idurlpatient,this.objectmedicine.id,this.createpatientmedicine).subscribe((createresponse:any) =>{
        this.dataSource.data.push( {...createresponse});
        this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
        
        this.datagoobject.who = this.whois
        this.datagoobject.idpatient = this.idurlpatient
        this.datagoobject.id = this.idurl
        const dialogRef = this.dialog.open(ResultDialogMedicineComponent,{
          data: this.datagoobject
        })
      })

    })
    
  }
}
