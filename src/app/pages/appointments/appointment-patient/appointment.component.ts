import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { AppointmentService } from 'src/app/services/appoinment/Appointment.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  selecteddate !: Date;
  patientobject!:PatientResource
  urlid!:number
  medical!:number;
  medicals:string[] = ["Dr. Concepción Zavaleta, Marcio Jose","Dr. Punis Reyes, Nevia Neda", "Dr. Uribe Tejada, Nancy Patricia"] 
  constructor(private activeroute:ActivatedRoute,private route:Router,private doctorservice:DoctorService, private patientservice:PatientService) { }
  dataSource = new MatTableDataSource<any>();


  ngOnInit() {

    let urlvariable = parseInt(this.activeroute.snapshot.paramMap.get('id')!);
    this.urlid = urlvariable
    console.log(this.urlid)
    this.getDoctorAppointments()
    this.getPatientbyId(this.urlid)
  }

  getDoctorAppointments(){
    this.doctorservice.getAllDoctors().subscribe( (response:any) =>{
        this.dataSource.data = response
        console.log(this.dataSource.data)
      }
    )
  }

  getPatientbyId(id:number){
    this.patientservice.getPatientById(id).subscribe( (response:any) =>{
        this.patientobject = response
        console.log(this.patientobject)
      }
    )
  }

  GoToMedicalSchedule(patientid:number,doctorid:number){
    this.route.navigate([`patient/${patientid}/medical-schedule/doctor/${doctorid}`]);
  }

  GoToHomePatient(){
    this.route.navigate([`patient/${this.patientobject.id}/home-patient`]);
  }

  GoToAppointmentsPatient(){
    this.route.navigate([`patient/${this.patientobject.id}/appointment-history`]);
  }
}
