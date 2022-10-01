import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-rating',
  templateUrl: './appointment-rating.component.html',
  styleUrls: ['./appointment-rating.component.css']
})
export class AppointmentRatingComponent implements OnInit {
  rating = 0
  startcount = 5
  ratingArr: boolean[]

  constructor() { 
    this.ratingArr = Array(this.startcount).fill(false)
  }

  ngOnInit() {
  }

  returnStar(i:number){
    if(this.rating >= i+1){
      return 'star'
    }else{
      return 'star_border'
    }
  }

  onClick(i:number){
    this.rating = i + 1;
  }

}
