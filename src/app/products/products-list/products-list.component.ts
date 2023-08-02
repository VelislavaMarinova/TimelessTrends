import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../../types/product';
import { ProductResponse } from '../../types/productResponse';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] | undefined;
  productsToLoad: Product[] = []
  isLoading: boolean = true;
  noProductsInTheList: boolean = false;
  category: string | undefined;
  numProductsPerPage: number = 9;
  numLoadedProducs: number = 0
  loadMore: boolean = true;
  sortByParam='';
  sortDirection="asc"

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  onSortDirection(){
    this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
  }

  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe((params: Params) => {
      this.category = params['category'];
      let sliceNumber = null;
      this.numLoadedProducs=0
      this.isLoading=true;

      switch (this.category) {
        case 'sunglasses': sliceNumber = 28; break
        case 'womens-jewellery': sliceNumber = 6; break
        case 'skincare': sliceNumber = 14; break
        case 'mens-watches': sliceNumber = 3; break
        case 'womens-bags': sliceNumber = 0
      }

      this.apiService.getProductsByCategory(this.category!).subscribe(
        {
          next: (response: ProductResponse) => {


            this.products = response.products;
            this.products.forEach(p => {
              // need more products to do the page logic 
              this.products.push(p)
              this.products.push(p)
              this.products.push(p)
              this.products.push(p)
              this.products.push(p)
            })

            this.products = this.products.slice(0, sliceNumber);
          
            // console.log(this.products.length);
            if (this.products.length > 9) {
              this.noProductsInTheList = false;
              this.loadMore = true
              this.productsToLoad = this.products.slice(0, this.numProductsPerPage);

              this.numLoadedProducs = this.numLoadedProducs + this.numProductsPerPage


            } else if(this.products.length <= 9 && this.products.length!==0){
              this.productsToLoad = this.products.slice(0);
              this.numLoadedProducs=this.productsToLoad.length;
              this.loadMore = false;
              this.noProductsInTheList = false;
            }else if(this.products.length===0){
              this.noProductsInTheList = true;
              this.numLoadedProducs=this.productsToLoad.length
            }

            console.log(this.products);
            console.log(this.productsToLoad, 'productsToLoad');
            this.isLoading = false;

          },
          error: (err) => {
            this.isLoading = false
            console.log(`Error ${err}`);
          }
        })
    })
  }

  onLoadMore() {
  
    this.productsToLoad = this.products.slice(0, this.numLoadedProducs + this.numProductsPerPage)
    this.numLoadedProducs = this.productsToLoad.length;
 

    if (this.numLoadedProducs === this.products.length) {
      this.loadMore = false;
    }
  }
}
