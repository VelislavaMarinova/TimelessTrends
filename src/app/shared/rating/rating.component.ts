import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() maxRating = 5;
  @Input() SelectedStar: number;
  @Output() onRating: EventEmitter<number> = new EventEmitter<number>();
  previousSelection = 0
  totalRatings = 0;
  cumulativeRating = 0;

  maxRatingArr: any = [];

  constructor() { }
  HandleMouseEnter(index: number) {
   this.SelectedStar = index + 1
  }

  Rating(index) {
    this.SelectedStar = index + 1;
    this.previousSelection = this.SelectedStar;
    this.totalRatings++;
    this.cumulativeRating += this.SelectedStar;
    this.calculateAverageRating();

    this.onRating.emit(this.SelectedStar);
  }

  ngOnInit(): void {
   
    this.calculateAverageRating();
  }

  updateStars() {
    for (let i = 0; i < this.SelectedStar; i++) {
      this.maxRatingArr[i] = 1; 
    }
  }
  calculateAverageRating() {
    if (this.totalRatings === 0) {
      this.maxRatingArr = Array(this.maxRating).fill(0);
    } else {
      const averageRating = this.cumulativeRating / this.totalRatings;
      const roundedAverage = Math.round(averageRating * 2) / 2; 

      this.maxRatingArr = Array(this.maxRating).fill(0).map((_, index) => (index < roundedAverage ? 1 : 0));
    }
  }
}
