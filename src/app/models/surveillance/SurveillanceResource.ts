import { PatientResource } from './../patient/PatientResource';
import { DoctorResource } from './../doctor/DoctorResource';
export interface SurveillanceResource {
      id:number;
      patient:PatientResource
      

      // Calculate ktv
      initWeight:number;
      finalWeight:number;
      hdTime:number;
      uf:number;



      // Clinic
      ureaPre:number;
     hematocrit:number;
     serumElectrolytes:number;
    chlorine:number;
     phosphorus:number;
     serumCalcium:number;
    proteinElectrophoresis:number;
    alkalinePhosphatase:number;
     tgo:number;
    tgp:number;
     dayCreatinine:number;
     parathormone:number;
   serumIron:number;
    serumFerritin:number;
    transferrinSaturation:number;
     transferrin:number;
     elisa:boolean;
     vdrlAndRpr:boolean;
    hepatitisBAntigen:boolean;
    hepatitisBAntibody:boolean;
     hepatitisCAntibody:boolean;
     ktv:number;



    // Shared
    bloodUrea:number; // este es el postUrea
    serumCreatinine:number; // este es creatinina
    hemoglobin:number;
    sodium:number;
    potassium:number;
     albumin:number;


     // Predcition
 bloodPressure:number;
     specificGravity:number;
      sugar:number;
      redBloodCells:boolean;
      pusCells:boolean;
      pusCellClumps:boolean;
     bacteria:boolean;
      bloodGlucoseRandom:number;
     packedCellVolume:number;
      whiteBloodCellCount:number;
      redBloodCellCount:number;
     appetite:boolean;
      pedalEdema:boolean;

  // Legacy
  planCalories:number;
   consumedCalories:number;
   pain:string;
   otherSymptoms :string;
 imc:number;



}