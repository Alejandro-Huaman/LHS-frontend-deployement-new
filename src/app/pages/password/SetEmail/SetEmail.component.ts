import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-SetEmail',
  templateUrl: './SetEmail.component.html',
  styleUrls: ['./SetEmail.component.css']
})
export class SetEmailComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  email!:string
  emailform!: FormGroup
  ngOnInit() {
    this.emailform=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
     })
  }
  SendEmail(){
    console.log(this.email)
  }
}
