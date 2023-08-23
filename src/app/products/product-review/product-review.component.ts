import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/types/review';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  @Input() review: Review;
  goldStars: number[];
  blueStars: number[];

  ngOnInit(): void {
    this.goldStars = new Array(this.review.rating);
    this.blueStars = new Array(5 - this.review.rating)
  }

}
