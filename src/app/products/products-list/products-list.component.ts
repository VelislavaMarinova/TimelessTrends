import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../../api.service';
import { Product } from '../../types/product';
import { ProductResponse } from '../../types/productResponse';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] | undefined;
  productsToLoad: Product[] = [];
  isLoading: boolean = true;
  noProductsInTheList: boolean = false;
  category: string | undefined;

  loadMore: boolean = true;
  sortByParam: string | undefined;
  // sortDirection: string | undefined;
  filterByPrice: string;
  filterByBrand: string | undefined;
  categoryImage: string;
  filterdLength = 0;

  priceMin: number | undefined;
  priceMax: number | undefined;
  order: string;
  sortOption: string;
  page: number = 1;
  limit: number = 12;
  totalProducts: number = 0;
  totalPages: number = 0;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  handleFormFilterChange(formValues: any) {
    console.log('Form values:', formValues.value);

    if (formValues && formValues.value.priceRange) {
      this.filterByPrice = formValues.value.priceRange;
      const [priceMinStr, priceMaxStr] = this.filterByPrice.split("-");
      this.priceMin = Number(priceMinStr);
      this.priceMax = Number(priceMaxStr);
    }

    if (formValues && formValues.value.brand && formValues.value.brand !== '') {
      this.filterByBrand = formValues.value.brand;
    } else {
      this.filterByBrand = undefined;
    }
    console.log(this.priceMin, this.priceMax);
    console.log(this.filterByBrand);


    this.page = 1;
    this.loadData();

  }

  onSortChange(selectedOption: string) {
    this.sortByParam = selectedOption;
    const [sortOption, order] = this.sortByParam.split(" ")
    this.sortOption = sortOption;
    this.order = order;
    this.page = 1;
    this.loadData()

  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      console.log("onInit");

      this.category = params.get('category'); 
      this.isLoading = true;

      this.priceMax = undefined;
      this.priceMin = undefined;
      this.filterByBrand = undefined;
      this.sortByParam = undefined;
      this.sortOption=undefined;
      this.order=undefined;
      // this.sortDirection = "asc";

      // Load data for the new category
      this.loadData();
    });
  }

  loadData() {
  
      this.apiService.getProductsByCategoryPaginate(
        this.category,
        this.sortOption,
        this.order,
        this.priceMin,
        this.priceMax,
        this.filterByBrand,
        this.page,
        this.limit
      ).subscribe(
        {
          next: (response: HttpResponse<Product[]>) => {
            const totalCountHeader = response.headers.get('X-Total-Count');
            this.totalProducts = Number(totalCountHeader);

            this.totalPages = Math.ceil(Number(totalCountHeader) / this.limit)
         
            this.products = response.body
          
          

            if (this.products.length === 0) {
              this.noProductsInTheList = true;
              this.loadMore = false;
            } else if (this.products.length < this.limit) {
              this.noProductsInTheList = false;
              this.loadMore = false
            } else {
              this.loadMore = true;
              this.noProductsInTheList = false;
            }

            this.isLoading = false;

          },
          error: (err) => {
            this.isLoading = false
            console.log(`Error ${err}`);
          }
        })
    
  }

  onLoadMore() {
    this.page++;
    this.loadMore = this.page < this.totalPages;
    this.loadMoreProducts();

  }

  loadMoreProducts() {
    if (this.page <= this.totalPages) {
      this.apiService.getProductsByCategoryPaginate(
        this.category!,
        this.sortOption,
        this.order,
        this.priceMin,
        this.priceMax,
        this.filterByBrand,
        this.page,
        this.limit
      ).subscribe(res => {

        this.products = [...this.products, ...res.body]
        console.log(this.products);
      });
    }
  }

};
