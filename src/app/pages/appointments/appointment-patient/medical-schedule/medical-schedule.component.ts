import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentResource } from 'src/app/models/appointment/AppointmentResource';
import { DoctorResource } from 'src/app/models/doctor/DoctorResource';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { AppointmentService } from 'src/app/services/appoinment/Appointment.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ResultDialogAppointmentComponent } from '../../../dialogs/result-dialog-appointment/result-dialog-appointment.component';

@Component({
  selector: 'app-medical-schedule',
  templateUrl: './medical-schedule.component.html',
  styleUrls: ['./medical-schedule.component.css']
})
export class MedicalScheduleComponent implements OnInit {
  patient!:string;
  patients:string[] = ["Paciente 1","Paciente 2","Paciente 3", "Paciente 4", "Paciente 5"];
  scheduleform!: FormGroup;
  patientobject!:PatientResource
  doctorobject!:DoctorResource
  urlpatientid!:number
  urldoctorid!:number
  starthour!:string
  finalhour!:string
  numberstarttime!:number
  numberfinaltime!:number
  Hours:String[] = []
  pipedate:DatePipe = new DatePipe("en-US")
  appointmentobject!:AppointmentResource
  hourformatchange!:Date
  newdate!:Date
  testdate:Date =new Date()
  datenow = new Date()
  appointmentdateselected!:Date
  appointmentdateformated!:any
  nombredia:any
  appyear!:any
  appmonth!:any
  appday!:any
  dataSourceappointment = new MatTableDataSource<any>()
  days = ['lunes','martes','miércoles','jueves','viernes','sábado','domingo']
  
  constructor(public dialog:MatDialog, private formBuilder:FormBuilder,private route:Router,private activeroute:ActivatedRoute, 
              private patientservice:PatientService,
              private doctorservice:DoctorService,
              private appointmentservice:AppointmentService,
              ) { 
                this.appointmentobject = {} as AppointmentResource
                this.patientobject = {} as PatientResource
                this.doctorobject = {} as DoctorResource
              }

  ngOnInit() {
    this.scheduleform=this.formBuilder.group({
      date:['',Validators.required]
     })
    let urlpatientvariable = parseInt(this.activeroute.snapshot.paramMap.get('patientid')!);
    let urldoctorvariable = parseInt(this.activeroute.snapshot.paramMap.get('doctorid')!);
    this.urlpatientid = urlpatientvariable
    this.urldoctorid = urldoctorvariable
    console.log(this.urlpatientid)
    console.log(this.urldoctorid)

    this.getPatientbyId(this.urlpatientid)
    this.getDoctorbyId(this.urldoctorid)
    this.getTimeBlocks(this.urldoctorid)

  }

  getPatientbyId(id:number){
    this.patientservice.getPatientById(id).subscribe( (response:any) =>{
        this.patientobject = response
        console.log(this.patientobject)
      }
    )
  }

  getDoctorbyId(id:number){
    this.doctorservice.getDoctorById(id).subscribe( (response:any) =>{
        this.doctorobject = response
        console.log(this.doctorobject)
      }
    )
  }

  getTimeBlocks(id:number){
    this.doctorservice.getDoctorById(id).subscribe( (response:any) =>{
        this.doctorobject = response
        console.log(this.doctorobject)
        
        this.starthour = String(this.doctorobject.shift.startShift)
        this.finalhour = String(this.doctorobject.shift.endShift)
        console.log(this.starthour)
        console.log(this.finalhour)
        let onlystarttime = this.starthour.slice(0,2)
        let onlyfinaltime = this.finalhour.slice(0,2)
        console.log(onlystarttime)
        console.log(onlyfinaltime)

        this.numberstarttime = parseInt(onlystarttime)
        this.numberfinaltime = parseInt(onlyfinaltime)

        console.log(typeof this.numberstarttime)
        console.log(typeof this.numberfinaltime)       
        for(let i = this.numberstarttime + 1; i < this.numberfinaltime;i++){
          let newhour = String(i)
          let newallhour =  newhour + ":00:00"
          this.Hours.push(newallhour)
        }

        console.log(this.Hours)
      }
    )
  }


  GoToAppointmentPatient(){
    this.route.navigate([`patient/${this.patientobject.id}/appointment-patient`]);
  }

  SelectedDate(date:any,patientid:number,doctorid:number){
      console.log(date)
      console.log(typeof date)
      console.log(this.appointmentdateselected)
      let hourstring = String(date)
      
      const [hour, minute, seconds] = hourstring.split(':');
      
      let dateformatselected = formatDate(this.appointmentdateselected,'yyyy-MM-dd','en_US')
      
      console.log(dateformatselected)

      const [year, month, day] = dateformatselected.split('-');

      const dateformat = new Date(+year,+month-1,+day,+hour, +minute, +seconds);

      console.log(dateformat)
      
      this.appointmentobject.scheduledAt = dateformat 
      this.appointmentobject.notes = "note test"
      this.appointmentservice.createAppointment(this.appointmentobject,patientid,doctorid).subscribe( (response:any) =>{
          this.dataSourceappointment.data.push( {...response});
          this.dataSourceappointment.data = this.dataSourceappointment.data.map((o: any) => { return o; });
          console.log(response)
          const dialogRef = this.dialog.open(ResultDialogAppointmentComponent)
        },err=>{
          alert("Cita ya guardada por otro paciente intente otro horario")
        }
      )

  }

  GetDay(){
    console.log(this.appointmentdateselected)

    const dias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    const numeroDia = this.appointmentdateselected.getDay();
    console.log(numeroDia)
    this.nombredia = dias[numeroDia];
    console.log("Nombre de día de la semana: ", this.nombredia);
  }



}
