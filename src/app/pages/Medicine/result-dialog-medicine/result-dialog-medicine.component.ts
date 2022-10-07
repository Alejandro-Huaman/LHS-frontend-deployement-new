import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-result-dialog-medicine',
  templateUrl: './result-dialog-medicine.component.html',
  styleUrls: ['./result-dialog-medicine.component.css']
})
export class ResultDialogMedicineComponent implements OnInit {

  constructor(private route:Router, @Inject(MAT_DIALOG_DATA) public dataobject:any) { }

  ngOnInit() {
  }

  GoBack(){
    this.route.navigate([this.dataobject.who,this.dataobject.id,'patient',this.dataobject.idpatient,'medicines']);
  }

}
