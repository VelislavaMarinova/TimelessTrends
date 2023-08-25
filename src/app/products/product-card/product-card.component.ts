import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { CartCountService } from 'src/app/cartCount.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  starOne: boolean = false;
  goldStars: number[];
  blueStars: number[];
  addCountToCart: number = 1;
  productRating: number = 0;
  hasDiscount: boolean = false;
  priceAfterDiscount: number = 0;

  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(
    private cartCountService: CartCountService,
    private userService: UserService
  ) { };

  ngOnInit(): void {
    if (this.product.reviews.length !== 0) {
      this.product.reviews.forEach(r => {
        this.productRating += r.rating
      });
      this.productRating = Number((this.productRating / this.product.reviews.length).toFixed(2))

      this.goldStars = new Array(Math.round(this.productRating));
      this.blueStars = new Array(5 - Math.round(this.productRating))
    } else {
      this.blueStars = new Array(5);
    }
    if (this.product.discountPercentage !== 0) {
      this.hasDiscount = true;
      this.priceAfterDiscount = this.product.price - Number((this.product.price * this.product.discountPercentage / 100).toFixed(2))
    }

    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;

    });

  }

  onAddToCart() {

    this.cartCountService.updateCartCount(this.addCountToCart);
    alert(`${this.product.title} added to cart`);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
