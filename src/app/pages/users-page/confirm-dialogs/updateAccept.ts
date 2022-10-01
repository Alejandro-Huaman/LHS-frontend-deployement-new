

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'updateAccept',
    templateUrl:'./updateAccept.html',
  })
  export class updateAccept{
    constructor(
      public dialogRef: MatDialogRef<updateAccept>,
      
    ) {}
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  
  
  
  }