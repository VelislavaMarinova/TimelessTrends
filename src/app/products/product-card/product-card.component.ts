import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product

  Handle(event: number) {
    this.product.rating = Number(((this.product.rating + event) / 2).toFixed(2))
    alert(`You rate ${event}`)
  }

  onAddToCart(){
    alert(`${this.product.title} added to cart`)
  }

}
