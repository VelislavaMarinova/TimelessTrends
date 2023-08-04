import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';
import { CartCountService } from 'src/app/cartCount.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product;
  addCountToCart:number=1
  constructor(private cartCountService: CartCountService){}

  Handle(event: number) {
    this.product.rating = Number(((this.product.rating + event) / 2).toFixed(2))
    alert(`You rate ${event}`)
  }

  onAddToCart() {
    
    this.cartCountService.updateCartCount(this.addCountToCart)
    alert(`${this.product.title} added to cart`)
  }

}
