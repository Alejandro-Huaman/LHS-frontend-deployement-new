import { Dialysis } from "../patient/DIalysis.enum";

export interface CreateMedicalCareResource {
    ureaPre:number;
    ureaPost:number;
    dryWeight:number;
    initialWeight:number;
    finalWeight:number;
    hdTime:number;
    uf:number;
    ktv:number;
    hb:number;
    hto:number;
    dialysisMaterial:Dialysis;
}