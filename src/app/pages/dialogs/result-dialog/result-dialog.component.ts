import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css']
})
export class ResultDialogComponent implements OnInit {

  constructor(private route:Router, @Inject(MAT_DIALOG_DATA) public staffdata:any) { }

  ngOnInit() {
    
  }
  GoToUsersPage(){
    this.route.navigate(['staff',this.staffdata.id,'staff-users']);
  }
}
