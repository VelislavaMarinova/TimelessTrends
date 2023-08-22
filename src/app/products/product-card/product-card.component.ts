import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { CartCountService } from 'src/app/cartCount.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  starOne: boolean = false
  goldStars: number[];
  blueStars: number[];
  addCountToCart: number = 1
  constructor(private cartCountService: CartCountService) { };

  ngOnInit(): void {
    console.log(this.product);
    this.goldStars = new Array(Math.round(this.product.rating));
    this.blueStars = new Array(5 - Math.round(this.product.rating))
    // if (this.product.rating > 1 ) {
    //   this.starOne = true;
    // }
    // if (this.product.rating > 1 ) {
    //   this.starOne = true;
    // }
    // console.log(this.starOne,"star");


  }


  Handle(event: number) {
    this.product.rating = Number(((this.product.rating + event) / 2).toFixed(2))
    alert(`You rate ${event}`);
  }

  onAddToCart() {

    this.cartCountService.updateCartCount(this.addCountToCart);
    alert(`${this.product.title} added to cart`);
  }

}
