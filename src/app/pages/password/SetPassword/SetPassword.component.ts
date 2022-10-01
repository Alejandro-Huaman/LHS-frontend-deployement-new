import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-SetPassword',
  templateUrl: './SetPassword.component.html',
  styleUrls: ['./SetPassword.component.css']
})
export class SetPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  password!:string
  confirmpassword!:string
  passwordform!: FormGroup
  ngOnInit() {
    this.passwordform=this.formBuilder.group({
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      confirmpassword:['',[Validators.required,Validators.minLength(8)]],
     })
  }
  ChangePassword(){

    if(this.isPassword()){
      console.log(this.password)
    console.log(this.confirmpassword)
    }
    else{
      alert("Debe ser igual a la contraseña el campo de confirmar contraseña")
    }
    
    
  }
  isPassword(){
    if(this.password==this.confirmpassword){
      return true
    }
    return false
  }
}
