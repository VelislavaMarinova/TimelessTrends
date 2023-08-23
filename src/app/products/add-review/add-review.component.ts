import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';
import { Review } from 'src/app/types/review';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit, OnDestroy{
  isLoading: boolean = false;
  reviewFormGroup!: FormGroup;
  
  private userSub!: Subscription;
  username: string | undefined;
  userId: number;
  review: Review;
  productId: number;
  category: string;
  product: Product;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.userSub = this.userService.user$$.subscribe(user => {
  
      this.username = user?.username;
      this.userId=Number(user?.id)
      console.log(user);
      
    });
    this.activatedRoute.params.subscribe((params: Params) => {

      this.productId = params['productId'];
      this.category=params['category']
    });

    this.loadProduct()

  }
  loadProduct(){
    this.apiService.getProduct(Number(this.productId)).subscribe({
      next: (response) => {
        this.isLoading = false,
          this.product = response;
      },
      error: err => {
       console.log(err);
        this.isLoading = false;
      }

    })
  }
  createForm() {
    this.reviewFormGroup = new FormGroup({
      'rating': new FormControl('choose', [Validators.required]),
      'review': new FormControl('', [Validators.required]),
    })
  }
  onSubmit() {
    if (!this.reviewFormGroup.valid) {
      return
    }
    this.isLoading = true;
    console.log(this.reviewFormGroup.value);
    this.review={
      rating: Number(this.reviewFormGroup?.value.rating),
      review: this. reviewFormGroup.value.review,
      productId: Number(this.productId),
      userId:Number(this.userId),
      username: this.username
    }
    console.log(this.review);
    
    this.apiService.addReview(this.review).subscribe(
      {
        next: (response) => {
          this.isLoading = false,
            this.review = response;
          this.router.navigate([`/products/${this.category}/${this.productId}`]);
        },
        error: err => {
         console.log(err);
          this.isLoading = false;
        }

      }
    )
    

  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

}
