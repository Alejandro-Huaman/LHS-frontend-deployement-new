export class CreateSurveillanceResource {
      
      // Calculate ktv
      initWeight:number;
      finalWeight:number;
      hdTime:number;
      uf:number;

      constructor() {
       this. initWeight=0;
       this.finalWeight=0;
       this.hdTime=0;
       this. uf=0;
       this.ureaPre=0;
     this.hematocrit=0;
     this.serumElectrolytes=0;
     this.chlorine=0;
     this.phosphorus=0;
     this.serumCalcium=0;
     this.proteinElectrophoresis=0;
     this.alkalinePhosphatase=0;
     this. tgo=0;
     this. tgp=0;
     this.dayCreatinine=0;
     this.parathormone=0;
     this.serumIron=0;
     this.serumFerritin=0;
     this.transferrinSaturation=0;
     this.transferrin=0;
     this. elisa=0;
     this. vdrlAndRpr=0;
     this.hepatitisBAntigen=0;
     this.hepatitisBAntibody=0;
     this.hepatitisCAntibody=0;
     this.ktv=0;

     this.bloodUrea=0; // este es el postUrea
     this.serumCreatinine=0; // este es creatinina
     this.hemoglobin=0;
     this.sodium=0;
     this.potassium=0;
     this.albumin=0;


     this.bloodPressure=0;
     this. specificGravity=0;
     this.sugar=0;
     this.redBloodCells=0;
     this. pusCells=0;
     this.pusCellClumps=0;
     this. bacteria=0;
     this.bloodGlucoseRandom=0;
     this.packedCellVolume=0;
     this.whiteBloodCellCount=0;
     this.redBloodCellCount=0;
     this.appetite=0;
     this. pedalEdema=0;


     this. planCalories=0;
     this.consumedCalories=0;
     this. pain="";
     this.otherSymptoms="";
     this. imc=0;
      }

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
     elisa:number;
     vdrlAndRpr:number;
    hepatitisBAntigen:number;
    hepatitisBAntibody:number;
     hepatitisCAntibody:number;
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
      redBloodCells:number;
      pusCells:number;
      pusCellClumps:number;
     bacteria:number;
      bloodGlucoseRandom:number;
     packedCellVolume:number;
      whiteBloodCellCount:number;
      redBloodCellCount:number;
     appetite:number;
      pedalEdema:number;

  // Legacy
  planCalories:number;
   consumedCalories:number;
   pain:string;
   otherSymptoms :string;
 imc:number;

    
}
