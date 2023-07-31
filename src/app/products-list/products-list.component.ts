import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../types/product';
import { ProductResponse } from '../types/productResponse';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] | undefined;
  multiProducts: [] = []
  isLoading: boolean = true;
  noProductsInTheList: boolean = false;
  category: string | undefined;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {
      //from params id comes as a string, so it is need to be cast to number
      this.category = params['category'];
      let sliceNumber = null

      //   'sunglasses',
      // 'womens-jewellery',
      // 'fragrances',
      // 'skincare',
      // 'mens-watches',
      // 'womens-bags'

      switch (this.category) {
        case 'sunglasses': sliceNumber=10; break
        case 'womens-jewellery': sliceNumber=6; break
        case 'skincare': sliceNumber=14; break
        case 'mens-watches': sliceNumber=3; break
        case 'womens-bags': sliceNumber=0
      }

      this.apiService.getProductsByCategory(this.category!).subscribe(
        {
          next: (response: ProductResponse) => {


            this.products = response.products;
            this.products.forEach(p => {
              // need more products to do the page logic 
              this.products.push(p)
              this.products.push(p)
            })
            console.log(this.products);

            this.isLoading = false;


            if (this.products.length) {
              this.noProductsInTheList = true;
            }
          },
          error: (err) => {
            this.isLoading = false
            console.log(`Error ${err}`);
          }
        })
      console.log(this.noProductsInTheList);
    })
  }

}
