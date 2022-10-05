import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const Token_key='AuthToken';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private Router:Router) { }
  public setToken(token:string):void {
  
    window.localStorage.removeItem(Token_key);
    window.localStorage.setItem(Token_key,token)
    
    }
    public getToken() {
    
      return window.localStorage.getItem(Token_key)
    
    
    }
    public isLogged(){
  
      if(this.getToken()){return true}
      else{return false}
      
  }
  public getUserid()  {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken()!;
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    
    const username = values.user_id;
    return username
  }
  public logOut(): void {
    window.localStorage.clear();
    this.Router.navigate(['/login']);
  }
}
