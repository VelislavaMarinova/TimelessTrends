import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { CartCountService } from 'src/app/cartCount.service';
import { Product } from 'src/app/types/product';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit,OnDestroy{
  product: Product | undefined
  isLoading: boolean = true;
  productRating: number = 0;
  goldStars: number[];
  blueStars: number[];
  hasDiscount: boolean;
  priceAfterDiscount: number = 0;
  addCountToCart: number = 1;



  isAuthenticated = false;
  private userSub!: Subscription;
  username: string | undefined;
  isOwner: boolean = false;
  showReviews: boolean = false;

  id: number;


  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private cartCountService: CartCountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hasDiscount = false;

    this.showReviews = false;
    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = user?.username;
    });

    this.loadData();
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {

      this.id =Number( params['productId']);

      this.apiService.getProduct(this.id).subscribe(
        {
          next: (res) => {
            this.product = res;
            console.log(this.product, "details");
            if (this.product.discountPercentage !== 0) {
              this.hasDiscount = true;
              this.priceAfterDiscount = this.product.price - Number((this.product.price * this.product.discountPercentage / 100).toFixed(2))
            }

            this.isLoading = false;
            if (this.product.reviews.length !== 0) {
              this.product.reviews.forEach(r => {
                this.productRating += r.rating
              });
              this.productRating = Number((this.productRating / this.product.reviews.length).toFixed(2))

              this.goldStars = new Array(Math.round(this.productRating));
              this.blueStars = new Array(5 - Math.round(this.productRating))
            } else {
              this.blueStars = new Array(5)
            }
         
          },
          error: (err) => {
            this.isLoading = false
            console.log(`Error ${err}`);

          }
        })
    })
  }

  onShowReviewsToggle() {
    this.showReviews = !this.showReviews
  }
  onAddReview(){
this.router.navigate([`/products/${this.product.category}/${this.product.id}/add-review`])
  }

  onAddToCart() {

    this.cartCountService.updateCartCount(this.addCountToCart);
    alert(`${this.product.title} added to cart`);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
