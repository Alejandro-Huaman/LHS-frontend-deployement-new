import { AppointedateUpdateComponent } from './dialog/appointedate-update/appointedate-update.component';
import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentResource } from 'src/app/models/appointment/AppointmentResource';
import { DoctorResource } from 'src/app/models/doctor/DoctorResource';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { StaffResource } from 'src/app/models/staff/StaffResource';
import { AppointmentService } from 'src/app/services/appoinment/Appointment.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { StaffService } from 'src/app/services/staff/staff.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
export interface Appointment {
  dni: string;
  patient: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-appointment-staff',
  templateUrl: './appointment-staff.component.html',
  styleUrls: ['./appointment-staff.component.css'],
  providers: [DatePipe]
})
export class AppointmentStaffComponent implements OnInit {
  selecteddate !: Date;
  dnisearch = new FormControl;
  patient!:number;
  doctorusername = new FormControl
  patientobject!:PatientResource
  doctorobject!:DoctorResource
  patients:string[] = ["Alayo Zavaleta, Alessandro Fabián","Almonacid Garrido, Viviana", "Benavides Castillo, Daniela"] 
  urlid!:number
  displayedColumns: string[] = ['id','dni' ,'patient', 'date', 'status','doctor','button'];
    dataSource !:MatTableDataSource<any>;
  staffobject!:StaffResource

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private appointmentservice:AppointmentService, private route:Router,private activeroute:ActivatedRoute, private patientservice:PatientService, 
              private staffservice:StaffService, private doctorservice:DoctorService,public dialog:MatDialog,private datePipe: DatePipe) {
                this.dataSource = new MatTableDataSource<any>();
              }
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    let urlvariable = parseInt(this.activeroute.snapshot.paramMap.get('id')!);
    this.urlid = urlvariable
    console.log(this.urlid)
    this.getStaffById(this.urlid)
    this.getallappoiments()
   
  }

  SearchAppointmentDoctor(event:Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }

  }

  getStaffById(id:number){
      this.staffservice.getStaffById(id).subscribe((response:any)=>{
        this.staffobject = response           
      })
  }
  

  getallappoiments(){
    this.appointmentservice.getAll().subscribe((response:any)=>{
      this.dataSource.data=response
      

    })
  }

  UpdateFecha(elemnt:any){
    const dialogRef=  this.dialog.open(AppointedateUpdateComponent,{
      data:elemnt 
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      elemnt.scheduledAt=result.scheduledAt
      console.log(elemnt)
      let itemIndex = this.dataSource.data.findIndex(item => item.id == elemnt.id);
      console.log(itemIndex)
      this.dataSource.data[itemIndex] = elemnt
      console.log(this.dataSource.data[itemIndex])
    })
  }
getformaldate(date:any){
  let dateformatselected = formatDate(date,'YYYY-MM-dd HH:mm:ss','en_US')
  return dateformatselected
}
deleteappoint(id:number){
  
  this.appointmentservice.deleteAppointment(id).subscribe((response:any)=>{
    this.dataSource.data = this.dataSource.data.filter((o: any) => {
      return o.id !== id ? o : false;
    });
  })
}





  getDoctorandAllAppointments(){
      this.doctorservice.getDoctorByUserName(this.doctorusername.value).subscribe((response:any)=>{
        this.doctorobject = response
        
        this.appointmentservice.getAppointmentsByDoctorId(this.doctorobject.id).subscribe((response:any) =>{
          this.dataSource.data = response;
          console.log(this.dataSource.data)
          
          for(var oneappointment of this.dataSource.data){
            console.log(oneappointment)
            let dateformatselected = formatDate(oneappointment.scheduledAt,'YYYY-MM-dd HH:mm:ss','en_US')
            console.log(dateformatselected)
            
            oneappointment.scheduledAt = dateformatselected
            console.log(oneappointment)
          }
        })

      })

  }

  AppointmentForm(patientid:number,appoint:number){

    this.route.navigate([`staff/${this.staffobject.id}/staff-appointment-form/patient/${patientid}/appoint/${appoint}`]);
  }

  GotoStaffHome(id:number){
      this.route.navigate(['staff',id,'home-staff'])
  }

  GetPatientByDNI(){
        console.log(this.dnisearch.value)
        this.doctorservice.getDoctorByUserName(this.dnisearch.value).subscribe((response:any)=>{
              let id=response.id;
              this.appointmentservice.getAppointmentsByDoctorId(id).subscribe((response:any)=>{
                this.dataSource.data = response;
               
              })
        },err=>{
          alert("docotr inexistente")
        })

       
  }
  getdocotorname(name:string,lastname:string){
    let complete=`${name}  ${lastname}`
    return complete
  }
  getfecha(date:any){




    let datform=this.datePipe.transform(date, 'dd/MM/yyyy')!;
    let dataframe=this.datePipe.transform(date, 'HH:mm')!;
    let contat=`${datform}  ${dataframe}`
    
    
    return contat
    
    }



}