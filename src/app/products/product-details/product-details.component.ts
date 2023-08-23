import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: Product | undefined
  isLoading: boolean = true;
  productRating:number=0;
  goldStars: number[];
  blueStars: number[];


  isAuthenticated = false;
  private userSub!: Subscription;
  username: string | undefined;
  isOwner: boolean = false

  id: string = '';


  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = user?.username;
    });

    this.loadData();
   
    
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {

      this.id = params['productId'];

      this.apiService.getProduct(this.id).subscribe(
        {
          next: (res) => {
            this.product = res;
            console.log(this.product,"details");
            
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
            // if(this.product.author===this.username){
            //   this.isOwner=true;
            // }
          },
          error: (err) => {
            this.isLoading = false
            console.log(`Error ${err}`);

          }
        })
    })
  }

  openModal(){
    
  }
}
