export class CreateSurveillanceCSV {
     // Calculate ktv
     init_weight:number;
     final_weight:number;
     hd_time:number;
     uf:number;

     constructor() {
      this. init_weight=0;
      this.final_weight=0;
      this.hd_time=0;
      this. uf=0;
      this.urea_pre=0;
    this.hematocrit=0;
    this.serum_electrolytes=0;
    this.chlorine=0;
    this.phosphorus=0;
    this.serum_calcium=0;
    this.protein_electrophoresis=0;
    this.alkaline_phosphatase=0;
    this. tgo=0;
    this. tgp=0;
    this.day_creatinine=0;
    this.parathormone=0;
    this.serum_iron=0;
    this.serum_ferritin=0;
    this.transferrin_saturation=0;
    this.transferrin=0;
    this. elisa=false;
    this. vdrl_and_rpr=false;
    this.hepatitisbantigen=false;
    this.hepatitisbantibody=false;
    this.hepatitiscantibody=false;
   
    this.ktv=0;

    this.blood_urea=0; // este es el postUrea
    this.serum_creatinine=0; // este es creatinina
    this.hemoglobin=0;
    this.sodium=0;
    this.potassium=0;
    this.albumin=0;


    this.blood_pressure=0;
    this. specific_gravity=0;
    this.sugar=0;
    this.red_blood_cells=false;
    this. pus_cells=false;
    this.pus_cell_clumps=false;
    this. bacteria=false;
    this.blood_glucose_random=0;
    this.packed_cell_volume=0;
    this.white_blood_cell_count=0;
    this.red_blood_cell_count=0;
    this.appetite=false;
    this. pedal_edema=false;


    this. plan_calories=0;
    this.consumed_calories=0;
    this. pain="";
    this.other_symptoms="";
    this. imc=0;

    
    this.patient_dni="";
     }

     // Clinic
     urea_pre:number;
    hematocrit:number;
    serum_electrolytes:number;
   chlorine:number;
    phosphorus:number;
    serum_calcium:number;
    protein_electrophoresis:number;
   alkaline_phosphatase:number;
    tgo:number;
   tgp:number;
   day_creatinine:number;
    parathormone:number;
    serum_iron:number;
  serum_ferritin:number;
  transferrin_saturation:number;
    transferrin:number;
    elisa:boolean;
    vdrl_and_rpr:boolean;
    hepatitisbantigen:boolean;
    hepatitiscantibody:boolean;
    hepatitisbantibody:boolean;
    ktv:number;



   // Shared
   blood_urea:number; // este es el postUrea
   serum_creatinine:number; // este es creatinina
   hemoglobin:number;
   sodium:number;
   potassium:number;
    albumin:number;


    // Predcition
    blood_pressure:number;
    specific_gravity:number;
     sugar:number;
     red_blood_cells:boolean;
     pus_cells:boolean;
     pus_cell_clumps:boolean;
    bacteria:boolean;
    blood_glucose_random:number;
    packed_cell_volume:number;
    white_blood_cell_count:number;
     red_blood_cell_count:number;
    appetite:boolean;
    pedal_edema:boolean;

 // Legacy
 plan_calories:number;
 consumed_calories:number;
  pain:string;
  other_symptoms :string;
  imc:number;



  patient_dni:string
}
