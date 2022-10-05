export class JwtDTO {
    refresh!:string;
    access!:string;
    constructor(refresh:string,access:string){
      this.refresh=refresh;
      this.access = access
    }
}
