import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientResource } from 'src/app/models/patient/PatientResource';
import { AppointmentService } from 'src/app/services/appoinment/Appointment.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { AppointmentRatingComponent } from './appointment-rating/appointment-rating.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css'],
  providers: [DatePipe]
})
export class AppointmentHistoryComponent implements OnInit {
  
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id','dni','doctor', 'date', 'status','puntuacion'];
  urlid!:number
  patientobject!:PatientResource
  rating = 0
  startcount = 5
  ratingArr: boolean[]
  AllratingArrays = []
  constructor(private appointmentservice:AppointmentService, private doctorservice:DoctorService, private patientservice:PatientService, private activeroute:ActivatedRoute,
              private route:Router,private datePipe: DatePipe) { 
                this.ratingArr = Array(this.startcount).fill(false)
                this.AllratingArrays = []
              }

  ngOnInit() {
    let urlvariable = parseInt(this.activeroute.snapshot.paramMap.get('id')!);
    this.urlid = urlvariable
    console.log(this.urlid)
    this.getAllAppointments(this.urlid)
    this.getPatientById(this.urlid)
    this.AllArraysRatingObtain(this.urlid)
  }

  getPatientById(id:number){
    this.patientservice.getPatientById(id).subscribe((response:any)=>{
      this.patientobject = response           
    })
  }

  getAllAppointments(id:number){
    this.appointmentservice.getAppointmentsByPatientId(id).subscribe((response:any) =>{
        this.dataSource.data = response;
        console.log(this.dataSource.data)

        
        for(var oneappointment of this.dataSource.data){
          console.log(oneappointment)
          let dateformatselected = formatDate(oneappointment.scheduledAt,'YYYY-MM-dd HH:mm:ss','en_US')
          console.log(dateformatselected)
          
          oneappointment.scheduledAt = dateformatselected
          console.log(oneappointment)
        }
      }
    )
  }

  GotoBookAppointmentsPatient(){
    this.route.navigate([`patient/${this.patientobject.id}/appointment-patient`]);
  }

  returnStar(i:number){
    if(this.rating >= i+1){
      return 'star'
    }else{
      return 'star_border'
    }
  }

  onClick(i:number){
    this.rating = i + 1;
  }

  AllArraysRatingObtain(id:number){
    this.appointmentservice.getAppointmentsByPatientId(id).subscribe((response:any) =>{
      this.dataSource2.data = response;
      console.log(this.dataSource2.data)
      for(let i=0; i<this.dataSource2.data.length;i++){
        this.AllratingArrays[i] = this.ratingArr
      }
      console.log(this.AllratingArrays)
      }
    )
    
  }
  getfecha(date:any){




    let datform=this.datePipe.transform(date, 'dd/MM/yyyy')!;
    let dataframe=this.datePipe.transform(date, 'HH:mm')!;
    let contat=`${datform}  ${dataframe}`
    
    
    return contat
    
    }
}
