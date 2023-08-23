import { Component, Input } from '@angular/core';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent {
  @Input() product: Product

}
