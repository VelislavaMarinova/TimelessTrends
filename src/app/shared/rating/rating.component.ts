import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() maxRating = 5;
  @Input() SelectedStar: number = 0
  @Output() onRating: EventEmitter<number>=new EventEmitter<number>();
  previousSelection = 0

  maxRatingArr: any = [];

  constructor() { }
  HandleMouseEnter(index: number) {
    this.SelectedStar = index + 1
  }

  HandleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.SelectedStar = this.previousSelection
    } else {
      this.SelectedStar = 0
    }
  }

  Rating(index){
    this.SelectedStar=index+1;
    this.previousSelection=this.SelectedStar;
    this.onRating.emit(this.SelectedStar);
  }

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0)
  }

}
