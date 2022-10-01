import { UpdateAppointmentResource } from './../../../../models/appointment/UpdateAppointmentResource';
import { AppointmentService } from './../../../../services/appoinment/Appointment.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogRecordComponent } from '../../../dialogs/result-dialog-record/result-dialog-record.component';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { ResultDialogAncientComponent } from 'src/app/pages/dialogs/result-dialog-ancient/result-dialog-ancient.component';
import { ResultDialogClinicComponent } from 'src/app/pages/dialogs/result-dialog-clinic/result-dialog-clinic.component';
import { ResultDialogTreatmentComponent } from 'src/app/pages/dialogs/result-dialog-treatment/result-dialog-treatment.component';
import { DatePipe, formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveillanceService } from 'src/app/services/surveillance/surveillance.service';
import { SurveillanceResource } from 'src/app/models/surveillance/SurveillanceResource';
import { IllnessRecordService } from 'src/app/services/ehr/illness-record.service';
import { IllnessRecordResource } from 'src/app/models/illness-record/IllnessRecordResource';
import { PatientDiagnosticService } from 'src/app/services/ehr/patient-diagnostic.service';
import { DiagnosisResource } from 'src/app/models/diagnostic/DiagnosisResource';
import { DiagnosticService } from 'src/app/services/ehr/diagnostic.service';
import { CreatePatientDiagnosisResource } from 'src/app/models/patient-diagnostic/CreatePatientDiagnosisResource';
import { PatientTreatmentResource } from 'src/app/models/patient-treatment/PatientTreatmentResource';
import { TreatmentResource } from 'src/app/models/treatment/TreatmentResource';
import { MedicineResource } from 'src/app/models/medicine/MedicineResource';
import { PatientTreatmentService } from 'src/app/services/ehr/patient-treatment.service';
import { TreatmentService } from 'src/app/services/ehr/treatment.service';
import { MedicineService } from 'src/app/services/ehr/medicine.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorResource } from 'src/app/models/doctor/DoctorResource';
import { StaffService } from 'src/app/services/staff/staff.service';
import { PatientDiagnosisResource } from 'src/app/models/patient-diagnostic/PatientDiagnosisResource';
import { UpdateDiagnosticDialogComponent } from '../../update-dialog/update-diagnostic-dialog/update-diagnostic-dialog.component';
import { UpdateTreatmentDialogComponent } from '../../update-dialog/update-treatment-dialog/update-treatment-dialog.component';
import { StaffResource } from 'src/app/models/staff/StaffResource';

@Component({
  selector: 'staff-appointment-form',
  templateUrl: './staff-appointment-form.component.html',
  styleUrls: ['./staff-appointment-form.component.css']
})
export class StaffAppointmentFormComponent implements OnInit {
  patientobject!:PatientResource
  staffobject!:StaffResource
  doctorurlobject!:DoctorResource
  idpatienturl!:number
  idstaffurl!:number
  patientupdate!:PatientResource
  surveillancepatient!:SurveillanceResource
  ancientpatient!:IllnessRecordResource
  patientdiagnostic!:CreatePatientDiagnosisResource
  diagnosis!:DiagnosisResource
  patienttreatment!:PatientTreatmentResource
  treatment!:TreatmentResource
  patientmedicine!:MedicineResource
  patientrecordform!:FormGroup
  displayvigilancy!:boolean
  backrecordform!:FormGroup
  diagnosticform!:FormGroup
  treatmentform!:FormGroup
  setstatfrom!:FormGroup
  UpdateAppointmentResource!:UpdateAppointmentResource
  treatmenttype!:String;
  treatmenttypes:TreatmentResource[] = []
  diagnostictypes:DiagnosisResource[] = []
  medicinetypes:MedicineResource[] = []
  fechaactual:Date = new Date()
  pipedate:DatePipe = new DatePipe("en-US")
  todaydate:any
  enddatediagnosticformatselected:any
  enddatetreatmentformatselected:any
  dataSource = new MatTableDataSource<any>();
  dataSourceSurveillance = new MatTableDataSource<any>();
  dataSourcepatientdiagnostic = new MatTableDataSource<any>()
  dataSourcepatientdiagnostic2 = new MatTableDataSource<any>()
  dataSourcediagnostic = new MatTableDataSource<any>()
  dataSourcepatienttreatment = new MatTableDataSource<any>()
  dataSourcepatienttreatment2 = new MatTableDataSource<any>()
  dataSourcetreatment = new MatTableDataSource<any>()
  dataSourcemedicine = new MatTableDataSource<any>()

  dataSourceancient = new MatTableDataSource<any>()
  dataSourceancient2 = new MatTableDataSource<any>()
  displayedColumnsancient: string[] = ['id', 'description', 'diseasetype', 'date'];
  displayedColumnsdiagnostic: string[] = ['code', 'description', 'diagnostic', 'initdate','finishdate','update'];
  displayedColumnstreatment: string[] = ['code', 'typetreatment', 'medicine', 'doses','description','initdate','finishdate','update'];
  stat!:string;
  notes!:string
  shecdule!:Date
  status:string[] = ["SCHEDULED","FINISHED","CANCELED"]
  constructor(public dialog:MatDialog, private formBuilder:FormBuilder, 
    private patientservice:PatientService,private activeroute:ActivatedRoute, private route:Router, 
    private surveillanceservice:SurveillanceService,
    private illnesservice:IllnessRecordService,
    private patientdiagnosticservice:PatientDiagnosticService,
    private diagnosisservice:DiagnosticService,
    private patienttreatmentservice:PatientTreatmentService,
    private treatmentservice:TreatmentService,
    private medicineservice:MedicineService,
    private staffservice:StaffService,
    private AppointmentService:AppointmentService
    ) { 
      this.ancientpatient = {} as IllnessRecordResource,
      this.patientdiagnostic = {} as CreatePatientDiagnosisResource,
      this.diagnosis = {} as DiagnosisResource
      this.patienttreatment = {} as PatientTreatmentResource
      this.treatment = {} as TreatmentResource
      this.patientmedicine = {} as MedicineResource
      this.patientobject = {} as PatientResource
      this.surveillancepatient = {} as SurveillanceResource
      this.UpdateAppointmentResource={}as UpdateAppointmentResource
    }

  ngOnInit() {
    this.patientrecordform=this.formBuilder.group({
      height:['',Validators.required],
     })

     this.patientrecordform.controls['height'].setValue(this.patientobject.height);

     this.backrecordform = this.formBuilder.group({
      disease:['',Validators.required],
      description:['',Validators.required],
      date:['',Validators.required],
     })
     this.diagnosticform = this.formBuilder.group({
      initdate:['',Validators.required],
      finishdate:[''],
      typediagnostic:['',Validators.required],
     })
     this.treatmentform = this.formBuilder.group({
      initdate:['',Validators.required],
      finishdate:[''],
      doses:['',Validators.required],
      type:['',Validators.required],
      medicine:['',Validators.required],
     })
     this.setstatfrom = this.formBuilder.group({

      stat:['',Validators.required]

     })
     this.displayvigilancy = false;
     this.todaydate = this.pipedate.transform(this.fechaactual, 'dd/MM/yyyy');

     let urlpatientvariable = parseInt(this.activeroute.snapshot.paramMap.get('patientid')!);
     let urlstaffvariable = parseInt(this.activeroute.snapshot.paramMap.get('staffid')!);
     let urlstaffstatus = parseInt(this.activeroute.snapshot.paramMap.get('appointid')!);
     this.idpatienturl = urlpatientvariable
     this.idstaffurl = urlstaffvariable
     console.log(this.idpatienturl)
     console.log(this.idstaffurl)
     this.GetPatientbyId(this.idpatienturl);
     this.GetStaffbyId(this.idstaffurl)
     this.getSurveillanceByPatientId(this.idpatienturl);
     this.getPatientAncients(this.idpatienturl)
     this.getPatientAncientssave(this.idpatienturl)
     this.getPatientDiagnostic(this.idpatienturl)
     this.getPatientTreatments(this.idpatienturl)
     this.getPatientTreatmentssave(this.idpatienturl)
     this.getPatientDiagnosticssave(this.idpatienturl)
     this.getDiagnosis()
     this.getTreatments()
     this.getMedicines()
     this.getappoint(urlstaffstatus)
  }

  RegisterMethod(){
    const dialogRef = this.dialog.open(ResultDialogRecordComponent)
  }
  getappoint(id:number){
    this.AppointmentService.getAppointmentById(id).subscribe((response:any)=>{
      this.setstatfrom.controls["stat"].setValue(response.status)
      this.notes=response.notes
      this.shecdule=response.scheduledAt

    })
  }
  SaveAncient(id:number){
    this.illnesservice.createIllnessRecord(this.ancientpatient,id).subscribe( (response:any) =>{
      this.dataSourceancient2.data.push( {...response});
      this.dataSourceancient2.data = this.dataSourceancient2.data.map((o: any) => { return o; });
      const dialogRef = this.dialog.open(ResultDialogAncientComponent)
      this.getPatientAncients(id)
    });
    
  }
  cambiarstat(){
        let urlstaffstatus = parseInt(this.activeroute.snapshot.paramMap.get('appointid')!);
        this.UpdateAppointmentResource.status= this.setstatfrom.controls["stat"].value
        this.UpdateAppointmentResource.notes=this.notes
        this.UpdateAppointmentResource.scheduledAt=this.shecdule
        this.AppointmentService.updateAppointment(urlstaffstatus,this.UpdateAppointmentResource).subscribe((response:any)=>{
                    
        })

  }
  getDiagnosis(){
    this.diagnosisservice.getAllDiagnosis().subscribe( (response:any) =>{
        this.diagnostictypes = response
        console.log(this.diagnostictypes)
      }
    )
  }

  getTreatments(){
    this.treatmentservice.getAllTreatments().subscribe( (response:any) =>{
        this.treatmenttypes = response
        console.log(this.treatmenttypes)
      }
    )
  }

  getMedicines(){
    this.medicineservice.getAllMedicines().subscribe( (response:any) =>{
        this.medicinetypes = response
        console.log(this.medicinetypes)
      }
    )
  }

  getDiagnosticbyName(diagnosticselected:any){
    console.log(diagnosticselected)
    this.diagnosisservice.getDiagnosisByName(diagnosticselected).subscribe( (response:any) =>{
      this.dataSourcediagnostic.data = response
      console.log(this.dataSourcediagnostic.data)
      this.diagnosis = this.dataSourcediagnostic.data[0]
    })
  }
  
  getTreatmentbyName(treatmentselected:any){
    console.log(treatmentselected)
    this.treatmentservice.getTreatmentByName(treatmentselected).subscribe( (response:any) =>{
      this.dataSourcetreatment.data = response
      this.treatment = this.dataSourcetreatment.data[0]
    })
  }

  SaveDiagnostic(id:number){
    console.log(this.diagnosis);
    console.log(this.patientdiagnostic);

    this.diagnosisservice.getDiagnosisByName(this.diagnosis.name).subscribe( (response:any) =>{
        this.dataSourcediagnostic.data = response
        console.log(this.dataSourcediagnostic.data)
        this.diagnosis = this.dataSourcediagnostic.data[0]

        this.patientdiagnosticservice.createPatientDiagnosis(this.patientdiagnostic,id,this.diagnosis.id).subscribe( (response:any) =>{
            this.dataSourcepatientdiagnostic2.data.push( {...response});
            this.dataSourcepatientdiagnostic2.data = this.dataSourcepatientdiagnostic2.data.map((o: any) => { return o; });
            const dialogRef = this.dialog.open(ResultDialogClinicComponent)
            this.getPatientDiagnostic(id)
          },err=>{
            alert("Diagnostico seleccionado igual")
          }
        )
      }
    )
    
  }

  SaveTreatment(id:number){
    console.log(this.patientmedicine);
    console.log(this.treatment);
    console.log(this.patienttreatment);

    this.medicineservice.getMedicineByName(this.patientmedicine.name).subscribe( (responsemedicine:any) =>{
      this.dataSourcemedicine.data = responsemedicine
      this.patientmedicine = this.dataSourcemedicine.data[0]
      console.log(this.patientmedicine)

      this.treatmentservice.getTreatmentByName(this.treatment.name).subscribe( (responsetreatment:any) =>{
            this.dataSourcetreatment.data = responsetreatment
            this.treatment = this.dataSourcetreatment.data[0]
            console.log(this.treatment)

            this.patienttreatmentservice.createPatientTreatment(id,this.treatment.id,this.patientmedicine.id,this.patienttreatment).subscribe( (responsepatienttreatment:any) =>{
                this.dataSourcepatienttreatment2.data.push( {...responsepatienttreatment});
                console.log(responsepatienttreatment)
                this.dataSourcepatienttreatment2.data = this.dataSourcepatienttreatment2.data.map((o: any) => { return o; });
                const dialogRef = this.dialog.open(ResultDialogTreatmentComponent)
                this.getPatientTreatments(id)
            },err=>{
              alert("Tratamiento seleccionado igual")
              }
            )
          })
      });

    
  }

  DisplayVigilancy(){
    if(this.displayvigilancy == true){
      this.displayvigilancy = false;
    }else{
      this.displayvigilancy = true;
    }
  }

  GetPatientbyId(id:number){
    this.patientservice.getPatientById(id).subscribe( (response:any) =>{
        this.patientobject = response
        console.log(this.patientobject)
      }
    )
  }

  GetStaffbyId(id:number){
    this.staffservice.getStaffById(id).subscribe( (response:any) =>{
        this.staffobject = response
        console.log(this.staffobject)
      }
    )
  }

  UpdatePatient(id:number){
    console.log(this.patientobject.height)
    
    this.patientservice.getPatientById(id).subscribe((response:any) =>{
        this.patientupdate = response
        this.patientupdate.height = this.patientobject.height

        this.patientservice.updatePatient(id,this.patientupdate).subscribe( (response:any) =>{
            this.dataSource.data = this.dataSource.data.map((o: PatientResource) => {
              if (o.id === response.id) {
                o = response;
              }
              return o;
            });
        });

        console.log(this.patientupdate)
    });
  }

  getSurveillanceByPatientId(id:number){
    this.surveillanceservice.getSurveillanceByPatientId(id).subscribe( (response:any) => {
        this.dataSourceSurveillance.data = response
        console.log(this.dataSourceSurveillance.data)
        let finalposition = this.dataSourceSurveillance.data.length - 1
        this.surveillancepatient = this.dataSourceSurveillance.data[finalposition]
        console.log(this.surveillancepatient)
      }
    );   
  }

  getPatientAncients(id:number){
    this.illnesservice.getIllnessRecordsByPatientId(id).subscribe( (response:any) =>{
        this.dataSourceancient.data = response
        console.log(this.dataSourceancient.data)

        for(var oneancient of this.dataSourceancient.data){
          let dateformatselected = formatDate(oneancient.date,'YYYY-MM-dd','en_US')
          
          oneancient.date = dateformatselected
        }
      }
    );
  }

  getPatientAncientssave(id:number){
    this.illnesservice.getIllnessRecordsByPatientId(id).subscribe( (response:any) =>{
        this.dataSourceancient2.data = response
        console.log(this.dataSourceancient2.data)
      }
    );
  }

  getPatientDiagnostic(id:number){
    this.patientdiagnosticservice.getPatientDiagnosisByPatientId(id).subscribe( (response:any) => {
        this.dataSourcepatientdiagnostic.data = response
        console.log(this.dataSourcepatientdiagnostic.data)

        for(var onediagnostic of this.dataSourcepatientdiagnostic.data){
          console.log(onediagnostic)
          let startdateformatselected = formatDate(onediagnostic.startDate,'YYYY-MM-dd','en_US')
          
          if(onediagnostic.endDate != null){
            this.enddatediagnosticformatselected = formatDate(onediagnostic.endDate,'YYYY-MM-dd','en_US') 
          }
          else{
            this.enddatediagnosticformatselected = null
          }
          
          onediagnostic.startDate = startdateformatselected
          onediagnostic.endDate = this.enddatediagnosticformatselected
        }

      }

    )
  }

  getPatientTreatments(id:number){
    this.patienttreatmentservice.getPatientTreatmentByPatientId(id).subscribe( (response:any) =>{
        this.dataSourcepatienttreatment.data = response
        console.log(this.dataSourcepatienttreatment.data)

        for(var onetreatment of this.dataSourcepatienttreatment.data){
          let startdateformatselected = formatDate(onetreatment.startDate,'YYYY-MM-dd','en_US')
          if(onetreatment.endDate != null){
            this.enddatetreatmentformatselected = formatDate(onetreatment.endDate,'YYYY-MM-dd','en_US') 
          }
          else{
            this.enddatetreatmentformatselected = null
          }
            
          onetreatment.startDate = startdateformatselected
          onetreatment.endDate = this.enddatetreatmentformatselected
        }

      }
    )
  }

  getPatientTreatmentssave(id:number){
    this.patienttreatmentservice.getPatientTreatmentByPatientId(id).subscribe( (response:any) =>{
        this.dataSourcepatienttreatment2.data = response
        console.log(this.dataSourcepatienttreatment2.data)
      }
    )
  }

  getPatientDiagnosticssave(id:number){
    this.patientdiagnosticservice.getPatientDiagnosisByPatientId(id).subscribe( (response:any) => {
      this.dataSourcepatientdiagnostic2.data = response
      console.log(this.dataSourcepatientdiagnostic2.data)
    })
  }

  GoToAppointmentStaff(){
      this.route.navigate(['staff',this.staffobject.id,'appointment-staff']);
  }

  GotoUpdateDiagnostic(object:PatientDiagnosisResource){
    const dialogRef=  this.dialog.open(UpdateDiagnosticDialogComponent,{
      data:object 
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      
      this.patientdiagnosticservice.updatePatientDiagnosis(result.id,result).subscribe( (response:any) =>{

        this.dataSourcepatientdiagnostic2.data = this.dataSourcepatientdiagnostic2.data.map((o: PatientDiagnosisResource) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });

      });

    });
  }

  GotoUpdateTreatment(object:PatientTreatmentResource){
    const dialogRef=  this.dialog.open(UpdateTreatmentDialogComponent,{
      data:object 
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)

      this.patienttreatmentservice.updatePatientTreatment(result.id,result).subscribe( (response:any) =>{

        this.dataSourcepatienttreatment2.data = this.dataSourcepatienttreatment2.data.map((o: PatientTreatmentResource) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });

      });

    });
  }
}
