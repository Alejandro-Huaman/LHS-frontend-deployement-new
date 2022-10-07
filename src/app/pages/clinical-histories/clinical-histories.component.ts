
import { ActivatedRoute, Router } from '@angular/router';
import { SurveillanceResource } from 'src/app/models/surveillance/SurveillanceResource';
import { DoctorResource } from './../../models/doctor/DoctorResource';
import { SurveillanceService } from './../../services/surveillance/surveillance.service';
import { AppointmentService } from './../../services/appoinment/Appointment.service';
import { PatientDiagnosticService } from './../../services/ehr/patient-diagnostic.service';
import { PatientTreatmentService } from './../../services/ehr/patient-treatment.service';
import { IllnessRecordService } from './../../services/ehr/illness-record.service';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { PatientService } from './../../services/patient/patient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiagnosticoPaciente } from './../../models/DiagnosticoPaciente';
import { Medicamento } from './../../models/Medicamento';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Antecedente } from 'src/app/models/Antecedente';
import { Paciente } from 'src/app/models/Paciente';
import { Tratamiento } from 'src/app/models/Tratamiento';
import { Diagnostico } from 'src/app/models/Diagnostico';
import { Cita } from 'src/app/models/Cita';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ViewChild,ElementRef  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ASurveillanceResource } from 'src/app/models/antiguo-surveillance/ASurveillanceResource';
export interface dataclinical {
  ktv: string;
  Clinic:string
  Shared:string
  Prediction:string
  Legacy:string
}
const date=new Date()
const paciente:Paciente[]=[
  { id:1,
    nombres:"person",
    apellidos:"lastaname",
    nacimiento: date,
    sexo:"M",
    telefono:"444355",
    direccion:"casa",
    username:"user",
    password:"pass",
    tipodoc:"DNI",
    nrodocumento:"5456664",
    altura:1.70,
  }
]
const antecedente:Antecedente[]=[
  {
    id:1,
    enfermedad:"toz",
    descripcion:"enfermedad",
    fecha:date,
    paciente_id:paciente[1],
  }
]
const medicamento:Medicamento[]=[
  {
    id:1,
    nombre:"medicamento 1"
  }
]
const tratamiento:Tratamiento[]=[
  {
    id:1,
    fechaInicio:date,
    fechaFin:date,
    dosis:12,
    paciente_id:paciente[0],
    medicamento_id:medicamento[0],
  }
]
const diagnostico:Diagnostico[]=[
  {
    id:1,
    tipo:"tipo 1",
    descripcion:"diagnostico",
  }
]
const DiagnosticoPaciente:DiagnosticoPaciente[]=[
  {
    id:1,
   fechaInicio:date,
   fechaFin:date,
   paciente_id:paciente[0],
   diagnostico_id:diagnostico[0],
  }
]
const cita:Cita[]=[
  {
    id:1,
notas:"notas",
paciente_id:paciente[1]
  }
]
@Component({
  selector: 'app-clinical-histories',
  templateUrl: './clinical-histories.component.html',
  styleUrls: ['./clinical-histories.component.css'],
  providers: [DatePipe]
})

export class ClinicalHistoriesComponent implements OnInit {
  public DNIform!:FormGroup;
  DNI!:string
  dataSource1 !:MatTableDataSource<any>;
  dataSource2 !:MatTableDataSource<any>;
  dataSource3 !:MatTableDataSource<any>;
  dataSource4 !:MatTableDataSource<any>;
  dataSource5 !:MatTableDataSource<any>;
  dataSource6 !:MatTableDataSource<any>;
  dataSourcea=antecedente
  avalible!:boolean

  arrayclinical!:dataclinical[]
  PDFTitle="Clinical Stories"
  @ViewChild('pdfTable') pdfTable: ElementRef;
  avaliblerecords!:boolean
  avalibletreatments!:boolean
  avaliblediagnosis!:boolean
  avaliblehistory!:boolean
  avaliblevigilant!:boolean
  vigilantarray!: ASurveillanceResource[]
  dataSourceb=tratamiento
  dataSourcec=DiagnosticoPaciente
  dataSourced=cita
  DoctorResource!:DoctorResource;
  Patient!:PatientResource;
  whois=""
  home!:string
  id!:number
  pdf=false
  SurveillanceResource1!:SurveillanceResource
  displayedColumns: string[] =  ['Antecedente', 'Descripcion', 'fecha'];
  displayedColumns2: string[] = ['Medicamento', 'Dosis Diarias', 'fecha inicio','fecha final'];
  displayedColumns3: string[] = ['Diagnostico', 'Fecha', 'Comentario'];
  displayedColumns4: string[] = ['Fecha','Notas'];
  displayedColumns5: string[] = ['ktv','Clinic',"Shared","Prediction","Legacy"];
  constructor(public dialog: MatDialog,private formBuilder:FormBuilder,private PATIENTSERVICE:PatientService,private IllnessRecordService:IllnessRecordService
    ,private PatientTreatmentService:PatientTreatmentService,private PatientDiagnosticService:PatientDiagnosticService,private AppointmentService:AppointmentService,private SurveillanceService:SurveillanceService
    ,private DoctorService:DoctorService,private ActivatedRoute:ActivatedRoute,private Router:Router,private datePipe: DatePipe) { 
    this.dataSource1 = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
    this.dataSource3 = new MatTableDataSource<any>();
    this.dataSource4 = new MatTableDataSource<any>();
    this.dataSource5 = new MatTableDataSource<any>();
    this.dataSource6 = new MatTableDataSource<any>();
    this.Patient={}as PatientResource
    this.SurveillanceResource1={}as SurveillanceResource
    
    this.avalible=false
     
  }

  ngOnInit() {
    let doctorid=parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!)
    this.DNIform=this.formBuilder.group({
      dni:['',[Validators.required,Validators.minLength(8)]],
     
 
      })
      this.findDoctor(doctorid)
      this.whois=(this.ActivatedRoute.snapshot.url[0].path)
    this.id=doctorid
    if(this.whois=="doctor"){
      this.home="home-doctor"
   }
   if(this.whois=="staff"){
     this.home="home-staff"
  }
  }
  
  findDoctor(id:number){
    this.DoctorService.getDoctorById(id).subscribe((response:any)=>{
               this.DoctorResource=response  
                       
    })
    


}

ReturnHome(){
  this.Router.navigate([this.whois,this.id,this.home])
}


downloadAsPDF(){
  
  const doc = new jsPDF();
  const pdfTable = this.pdfTable.nativeElement;
  var html = htmlToPdfmake(pdfTable.innerHTML);
  const documentDefinition = { content: html };
  pdfMake.createPdf(documentDefinition).open(); 

 


}



  checkheight(height:string){
    if(height == "" || height===null){
        return "Ninguna"
    }else{
      return height + " m"
    }
  }



   checkvigilant(){
           
                  
            if(this.SurveillanceResource1.initWeight==null){
              this.SurveillanceResource1.initWeight=0
            } 
            if(this.SurveillanceResource1.finalWeight==null){
              this.SurveillanceResource1.finalWeight=0
            } 
            if(this.SurveillanceResource1.hdTime==null){
              this.SurveillanceResource1.hdTime=0
            } 
            if(this.SurveillanceResource1.uf==null){
              this.SurveillanceResource1.uf=0
            } 
            if(this.SurveillanceResource1.ureaPre==null){
              this.SurveillanceResource1.ureaPre=0
            } 
            if(this.SurveillanceResource1.hematocrit==null){
              this.SurveillanceResource1.hematocrit=0
            } 
            if(this.SurveillanceResource1.serumElectrolytes==null){
              this.SurveillanceResource1.serumElectrolytes=0
            } 
            if(this.SurveillanceResource1.phosphorus==null){
              this.SurveillanceResource1.phosphorus=0
            } 
            if(this.SurveillanceResource1.serumCalcium==null){
              this.SurveillanceResource1.serumCalcium=0
            } 
            if(this.SurveillanceResource1.proteinElectrophoresis==null){
              this.SurveillanceResource1.proteinElectrophoresis=0
            } 
            if(this.SurveillanceResource1.alkalinePhosphatase==null){
              this.SurveillanceResource1.alkalinePhosphatase=0
            } 
            if(this.SurveillanceResource1.tgo==null){
              this.SurveillanceResource1.tgo=0
            } 
            if(this.SurveillanceResource1.tgp==null){
              this.SurveillanceResource1.tgp=0
            } 
            if(this.SurveillanceResource1.dayCreatinine==null){
              this.SurveillanceResource1.dayCreatinine=0
            } 
            if(this.SurveillanceResource1.parathormone==null){
              this.SurveillanceResource1.parathormone=0
            } 
            if(this.SurveillanceResource1.serumIron==null){
              this.SurveillanceResource1.serumIron=0
            }
            if(this.SurveillanceResource1.serumFerritin==null){
              this.SurveillanceResource1.serumFerritin=0
            }
            if(this.SurveillanceResource1.transferrinSaturation==null){
              this.SurveillanceResource1.transferrinSaturation=0
            }
            if(this.SurveillanceResource1.transferrin==null){
              this.SurveillanceResource1.transferrin=0
            }
            if(this.SurveillanceResource1.elisa==null){
              this.SurveillanceResource1.elisa=false
            }
            if(this.SurveillanceResource1.vdrlAndRpr==null){
              this.SurveillanceResource1.vdrlAndRpr=false
            }
            if(this.SurveillanceResource1.hepatitisBAntigen==null){
              this.SurveillanceResource1.hepatitisBAntigen=false
            }
            if(this.SurveillanceResource1.hepatitisBAntibody==null){
              this.SurveillanceResource1.hepatitisBAntibody=false
            }

            if(this.SurveillanceResource1.hepatitisCAntibody==null){
              this.SurveillanceResource1.hepatitisCAntibody=false
            }
            if(this.SurveillanceResource1.ktv==null){
              this.SurveillanceResource1.ktv=0
            }
            if(this.SurveillanceResource1.bloodUrea==null){
              this.SurveillanceResource1.bloodUrea=0
            }

            if(this.SurveillanceResource1.serumCreatinine==null){
              this.SurveillanceResource1.serumCreatinine=0
            }
            if(this.SurveillanceResource1.hemoglobin==null){
              this.SurveillanceResource1.hemoglobin=0
            }
            if(this.SurveillanceResource1.sodium==null){
              this.SurveillanceResource1.sodium=0
            }
            if(this.SurveillanceResource1.potassium==null){
              this.SurveillanceResource1.potassium=0
            }
            if(this.SurveillanceResource1.albumin==null){
              this.SurveillanceResource1.albumin=0
            }

            if(this.SurveillanceResource1.bloodPressure==null){
              this.SurveillanceResource1.bloodPressure=0
            }
            if(this.SurveillanceResource1.specificGravity==null){
              this.SurveillanceResource1.specificGravity=0
            }
            if(this.SurveillanceResource1.sugar==null){
              this.SurveillanceResource1.sugar=0
            }
            if(this.SurveillanceResource1.redBloodCells==null){
              this.SurveillanceResource1.redBloodCells=false
            }
            if(this.SurveillanceResource1.pusCells==null){
              this.SurveillanceResource1.pusCells=false
            }
            if(this.SurveillanceResource1.pusCellClumps==null){
              this.SurveillanceResource1.pusCellClumps=false
            }
            if(this.SurveillanceResource1.bacteria==null){
              this.SurveillanceResource1.bacteria=false
            }
            if(this.SurveillanceResource1.bloodGlucoseRandom==null){
              this.SurveillanceResource1.bloodGlucoseRandom=0
            }
            if(this.SurveillanceResource1.packedCellVolume==null){
              this.SurveillanceResource1.packedCellVolume=0
            }
            if(this.SurveillanceResource1.whiteBloodCellCount==null){
              this.SurveillanceResource1.whiteBloodCellCount=0
            }
            if(this.SurveillanceResource1.redBloodCellCount==null){
              this.SurveillanceResource1.redBloodCellCount=0
            }
            if(this.SurveillanceResource1.appetite==null){
              this.SurveillanceResource1.appetite=false
            }

            if(this.SurveillanceResource1.pedalEdema==null){
              this.SurveillanceResource1.pedalEdema=false
            }
            if(this.SurveillanceResource1.planCalories==null){
              this.SurveillanceResource1.planCalories=0
            }
            if(this.SurveillanceResource1.consumedCalories==null){
              this.SurveillanceResource1.consumedCalories=0
            }
            if(this.SurveillanceResource1.imc==null){
              this.SurveillanceResource1.imc=0
            }

            if(this.SurveillanceResource1.pain==null){
              this.SurveillanceResource1.pain="No Regitrado"
            }   
            if(this.SurveillanceResource1.otherSymptoms==null){
              this.SurveillanceResource1.otherSymptoms="No Regitrado"
            }  

                             
   }


  arrayflow(){
    this.arrayclinical=[
      {ktv:`initWeight: ${this.SurveillanceResource1.initWeight} `,Clinic:`ureaPre:${this.SurveillanceResource1.ureaPre} `,Shared:`bloodUrea:${this.SurveillanceResource1.bloodUrea}`,Prediction:`bloodPressure:${this.SurveillanceResource1.bloodPressure}`,Legacy:`planCalories: ${this.SurveillanceResource1.planCalories}`},
      {ktv:`finalWeight: ${this.SurveillanceResource1.finalWeight} `,Clinic:`hematocrit:${this.SurveillanceResource1.hematocrit} `,Shared:`serumCreatinine:${this.SurveillanceResource1.serumCreatinine}`,Prediction:`specificGravity:${this.SurveillanceResource1.specificGravity}`,Legacy:`consumedCalories: ${this.SurveillanceResource1.consumedCalories}`},
      {ktv:`hdTime: ${this.SurveillanceResource1.hdTime} `,Clinic:`serumElectrolytes:${this.SurveillanceResource1.serumElectrolytes} `,Shared:`hemoglobin:${this.SurveillanceResource1.hemoglobin}`,Prediction:`sugar:${this.SurveillanceResource1.sugar}`,Legacy:`pain: ${this.SurveillanceResource1.pain}`},
      {ktv:`uf: ${this.SurveillanceResource1.uf} `,Clinic:`chlorine:${this.SurveillanceResource1.chlorine} `,Shared:`sodium:${this.SurveillanceResource1.sodium}`,Prediction:`redBloodCells:${this.SurveillanceResource1.redBloodCells}`,Legacy:`otherSymptoms: ${this.SurveillanceResource1.otherSymptoms}`},
      {ktv:``,Clinic:`phosphorus:${this.SurveillanceResource1.phosphorus} `,Shared:`potassium:${this.SurveillanceResource1.potassium}`,Prediction:`pusCells:${this.SurveillanceResource1.pusCells}`,Legacy:`otherSymptoms: ${this.SurveillanceResource1.imc}`},
      {ktv:``,Clinic:`serumCalcium:${this.SurveillanceResource1.serumCalcium} `,Shared:`albumin:${this.SurveillanceResource1.albumin}`,Prediction:`pusCellClumps:${this.SurveillanceResource1.pusCellClumps}`,Legacy:``},
      {ktv:``,Clinic:`proteinElectrophoresis:${this.SurveillanceResource1.proteinElectrophoresis} `,Shared:``,Prediction:`bacteria:${this.SurveillanceResource1.bacteria}`,Legacy:``},
      {ktv:``,Clinic:`alkalinePhosphatase:${this.SurveillanceResource1.alkalinePhosphatase} `,Shared:``,Prediction:`bloodGlucoseRandom:${this.SurveillanceResource1.bloodGlucoseRandom}`,Legacy:``},
      {ktv:``,Clinic:`tgo:${this.SurveillanceResource1.tgo} `,Shared:``,Prediction:`packedCellVolume:${this.SurveillanceResource1.packedCellVolume}`,Legacy:``},
      {ktv:``,Clinic:`tgp:${this.SurveillanceResource1.tgp} `,Shared:``,Prediction:`whiteBloodCellCount:${this.SurveillanceResource1.whiteBloodCellCount}`,Legacy:``},
      {ktv:``,Clinic:`dayCreatinine:${this.SurveillanceResource1.dayCreatinine} `,Shared:``,Prediction:`redBloodCellCount:${this.SurveillanceResource1.redBloodCellCount}`,Legacy:``},
      {ktv:``,Clinic:`parathormone:${this.SurveillanceResource1.parathormone} `,Shared:``,Prediction:`appetite:${this.SurveillanceResource1.appetite}`,Legacy:``},
      {ktv:``,Clinic:`serumIron:${this.SurveillanceResource1.serumIron} `,Shared:``,Prediction:`pedalEdema:${this.SurveillanceResource1.pedalEdema}`,Legacy:``},
      {ktv:``,Clinic:`serumFerritin:${this.SurveillanceResource1.serumFerritin} `,Shared:``,Prediction:``,Legacy:``},
      {ktv:``,Clinic:`transferrinSaturation:${this.SurveillanceResource1.transferrinSaturation} `,Shared:``,Prediction:``,Legacy:``},
      {ktv:``,Clinic:`transferrin:${this.SurveillanceResource1.transferrin} `,Shared:``,Prediction:``,Legacy:``},
      {ktv:``,Clinic:`elisa:${this.SurveillanceResource1.elisa} `,Shared:``,Prediction:``,Legacy:``},
      {ktv:``,Clinic:`vdrlAndRpr:${this.SurveillanceResource1.vdrlAndRpr} `,Shared:``,Prediction:``,Legacy:``},
      {ktv:``,Clinic:`hepatitisBAntigen:${this.SurveillanceResource1.hepatitisBAntigen} `,Shared:``,Prediction:``,Legacy:``},
      {ktv:``,Clinic:`hepatitisBAntibody:${this.SurveillanceResource1.hepatitisBAntibody} `,Shared:``,Prediction:``,Legacy:``},
      {ktv:``,Clinic:`hepatitisCAntibody:${this.SurveillanceResource1.hepatitisCAntibody} `,Shared:``,Prediction:``,Legacy:``},
      {ktv:``,Clinic:`ktv:${this.SurveillanceResource1.ktv} `,Shared:``,Prediction:``,Legacy:``},


    ]
    this.dataSource6.data=this.arrayclinical
  }


  onSubmitDNI(){
    this.PATIENTSERVICE.getPatientByDocumentNumber(this.DNI).subscribe((response:any)=>{
      this.Patient=response;
      this.avalible=true
      this.pdf=true 
      console.log(this.Patient) 
      this.IllnessRecordService.getIllnessRecordsByPatientId(this.Patient.id).subscribe((response:any)=>{
        console.log(this.Patient.id)
        console.log(response)
        this.dataSource1.data=response;
        this.avaliblerecords=true
        if(this.dataSource1.data.length==0){
            this.avaliblerecords=false
        }
      })
      this.PatientTreatmentService.getPatientTreatmentByPatientId(this.Patient.id).subscribe((response:any)=>{
        this.dataSource2.data=response;
        this.avalibletreatments=true
        if(this.dataSource2.data.length==0){
          this.avalibletreatments=false
      }
      })
      this.PatientDiagnosticService.getPatientDiagnosisByPatientId(this.Patient.id).subscribe((response:any)=>{
        this.dataSource3.data=response;
        this.avaliblediagnosis=true
        if(this.dataSource3.data.length==0){
          this.avaliblediagnosis=false
      }
      })
      this.AppointmentService.getAppointmentsByPatientId(this.Patient.id).subscribe((response:any)=>{
        this.dataSource4.data=response;
        this.avaliblehistory=true
        if(this.dataSource4.data.length==0){
          this.avaliblehistory=false
      }
      })
      this.SurveillanceService.getSurveillanceByPatientId(this.Patient.id).subscribe((response:any)=>{
        this.dataSource5.data=response;
        console.log(this.dataSource5.data)
        this.avaliblevigilant=true
        if(this.dataSource5.data.length==0){
             this.avaliblevigilant=false
             this.SurveillanceResource1.initWeight=0

        }else{
          this.SurveillanceResource1=this.dataSource5.data.pop() 
          this.vigilantarray=this.dataSource5.data.reverse()
          /*if(this.SurveillanceResource1.appetite==null){
                for(let element in this.vigilantarray){
                       if(this.vigilantarray[element].appetite!=null){
                              this.SurveillanceResource1.planCalories=this.vigilantarray[element].planCalories
                              this.SurveillanceResource1.imc=this.vigilantarray[element].imc
                              this.SurveillanceResource1.consumedCalories=this.vigilantarray[element].consumedCalories
                              this.SurveillanceResource1.pain=this.vigilantarray[element].pain
                              this.SurveillanceResource1.appetite=this.vigilantarray[element].appetite
                              this.SurveillanceResource1.otherSymptoms=this.vigilantarray[element].otherSymptoms
                              break
                       }
                              
                }
          }
          if(this.SurveillanceResource1.hemoglobin==null){

            for(let element in this.vigilantarray){
              if(this.vigilantarray[element].hemoglobin!=null){
                     this.SurveillanceResource1.hemoglobin=this.vigilantarray[element].hemoglobin
                     this.SurveillanceResource1.segmented=this.vigilantarray[element].segmented
                     this.SurveillanceResource1.mvc=this.vigilantarray[element].mvc
                     this.SurveillanceResource1.lymphocytes=this.vigilantarray[element].lymphocytes
                     this.SurveillanceResource1.monocytes=this.vigilantarray[element].monocytes
                     this.SurveillanceResource1.mch=this.vigilantarray[element].mch
                     this.SurveillanceResource1.leukocytes=this.vigilantarray[element].leukocytes
                     this.SurveillanceResource1.glucose=this.vigilantarray[element].glucose
                     this.SurveillanceResource1.cholesterol=this.vigilantarray[element].cholesterol
                     this.SurveillanceResource1.triglycerides=this.vigilantarray[element].triglycerides
                     this.SurveillanceResource1.erythrocytes=this.vigilantarray[element].erythrocytes
                     break
              }
                     
           }




          }
          if(this.SurveillanceResource1.urineAppearance==null){

            for(let element in this.vigilantarray){
              if(this.vigilantarray[element].hemoglobin!=null){
                     this.SurveillanceResource1.urea=this.vigilantarray[element].urea
                     this.SurveillanceResource1.protein=this.vigilantarray[element].protein
                     this.SurveillanceResource1.nitrite=this.vigilantarray[element].nitrite
                     this.SurveillanceResource1.ketone=this.vigilantarray[element].ketone
                     this.SurveillanceResource1.crystals=this.vigilantarray[element].crystals
                     this.SurveillanceResource1.density=this.vigilantarray[element].density
                     this.SurveillanceResource1.urobilinogen=this.vigilantarray[element].urobilinogen
                     this.SurveillanceResource1.sugar=this.vigilantarray[element].sugar
                     this.SurveillanceResource1.ph=this.vigilantarray[element].ph
                     this.SurveillanceResource1.bilirubin=this.vigilantarray[element].bilirubin
                     this.SurveillanceResource1.urineAppearance=this.vigilantarray[element].urineAppearance
                     this.SurveillanceResource1.urineColor=this.vigilantarray[element].urineColor
                     break
              }
                     
           }

          } */
          this.checkvigilant()
          this.arrayflow()
        }
        
      })
  },err=>{
    alert("No se encuentra el DNI")
  })
  
  }
  openDialog(): void {
    window.print()

    const dialogRef = this.dialog.open(clinicalHisotory, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.downloadAsPDF()
    });
  }
  getfecha(date:any){




    let datform=this.datePipe.transform(date, 'dd/MM/yyyy')!;
    
    
    
    
    return datform
    
    }
}
@Component({
  selector: 'clinicalhistoryaccept',
  templateUrl: './dialog/clinicalhistory.html',
})
export class clinicalHisotory{
  constructor(
    public dialogRef: MatDialogRef<clinicalHisotory>,
    
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  


}