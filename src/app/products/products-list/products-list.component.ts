import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../../types/product';
import { ProductResponse } from '../../types/productResponse';
import { FilterPipeByPrice } from 'src/app/shared/pipes/filterByPrice.pipe';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductsListComponent implements OnInit {
  products: Product[] | undefined;
  productsToLoad: Product[] = []
  isLoading: boolean = true;
  noProductsInTheList: boolean = false;
  category: string | undefined;
  numProductsPerPage: number = 12;
  numLoadedProducs: number = 0
  loadMore: boolean = true;
  sortByParam = '';
  sortDirection = "asc";
  filterByPrice = "choose";
  filterByBrand = "choose";
  categoryImage:string 

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private filterPipe: FilterPipeByPrice,
    private ngZone: NgZone
  ) {
    // this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
    // console.log(this.datePipeString);
  }

  onBrandFilterChange(selectedBrand: string) {
    console.log('Selected Brand:', selectedBrand);
    this.filterByBrand = selectedBrand;
  }
  onPriceFilterChange(selectedPrice: string) {
    console.log('Selected Price:', selectedPrice);
    this.filterByPrice = selectedPrice;
    this.ngZone.run(() => {
      console.log("ZONE");

      this.handleFilterChange();
    });
    //remove
    this.handleFilterChange();
  }

  //remove 
  handleFilterChange() {
    // Perform actions here based on the updated filterByPrice
    // For example, you can update the displayed products or trigger any other logic.
    console.log(this.filterByPrice, 'Filter changed');

  }

  onSortChange(selectedOption: string) {
    this.sortByParam = selectedOption;
  }

  onSortDirectionChange(selectedSortDirection: string) {
    this.sortDirection = selectedSortDirection;
    console.log(this.sortDirection);

  }


  ngOnInit(): void {

    this.loadData()


  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.category = params['category'];
      let sliceNumber = null;
      this.numLoadedProducs = 0;


      this.filterByPrice = "choose";
      this.filterByBrand = "choose";

      this.isLoading = true;


      switch (this.category) {
        case 'sunglasses': sliceNumber = 28, this.categoryImage="https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; break
        case 'womens-jewellery': sliceNumber = 14,this.categoryImage="https://images.pexels.com/photos/7436133/pexels-photo-7436133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; break
        case 'skincare': sliceNumber = 25,this.categoryImage="https://images.pexels.com/photos/10999606/pexels-photo-10999606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; break
        case 'mens-watches': sliceNumber = 6,this.categoryImage='https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; break
        case 'womens-bags': sliceNumber = 0,this.categoryImage="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";break;
        case 'fragrances':sliceNumber=18,this.categoryImage="https://images.pexels.com/photos/672051/pexels-photo-672051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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

            const filteredValue = this.filterPipe.transform(this.products, [this.filterByPrice]);
            console.log(filteredValue, 'filteredValue');


            // console.log(this.products.length);
            if (this.products.length > 9) {
              this.noProductsInTheList = false;
              this.loadMore = true
              this.productsToLoad = this.products.slice(0, this.numProductsPerPage);

              this.numLoadedProducs = this.numLoadedProducs + this.numProductsPerPage


            } else if (this.products.length <= 9 && this.products.length !== 0) {
              this.productsToLoad = this.products.slice(0);
              this.numLoadedProducs = this.productsToLoad.length;
              this.loadMore = false;
              this.noProductsInTheList = false;
            } else if (this.products.length === 0) {
              this.noProductsInTheList = true;
              this.numLoadedProducs = this.productsToLoad.length
            }

            console.log(this.filterByPrice, 'filter');

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
    console.log(this.loadMore, 'loadmore');

  }

}
