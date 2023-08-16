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
  sortByParam:string;
  sortDirection = "asc";
  filterByPrice = "choose";
  filterByBrand = "choose";
  categoryImage: string;
  filterdLength = 0;

  priceMin: number = 1;
  priceMax: number = 200;
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

  onBrandFilterChange(selectedBrand: string) {
    this.filterByBrand = selectedBrand;
    console.log(this.filterByBrand.split('-'));

  }

  onPriceFilterChange(selectedPrice: string) {
    this.filterByPrice = selectedPrice;
    const [priceMinStr, priceMaxStr] = this.filterByPrice.split("-");
    this.priceMin = Number(priceMinStr);
    this.priceMax = Number(priceMaxStr);
    this.page = 1;
    this.loadData();
    console.log(this.filterByPrice.split("-"));

  }

  onSortChange(selectedOption: string) {
    this.sortByParam = selectedOption;
    const [sortOption, order] = this.sortByParam.split(" ")
    this.sortOption = sortOption;
    this.order = order;
    this.page = 1;
    this.loadData()

  }

  onSortDirectionChange(selectedSortDirection: string) {
    this.sortDirection = selectedSortDirection;
    console.log(this.sortDirection); this.loadData()
  }

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.category = params['category'];
      this.isLoading = true;

      console.log(this.sortByParam, "sort");
      console.log(this.sortDirection, "direction");


      this.apiService.getProductsByCategoryPaginate(
        this.category!,
        this.sortOption,
        this.order,
        this.priceMin,
        this.priceMax,
        this.page,
        this.limit
      ).subscribe(
        {
          next: (response: HttpResponse<Product[]>) => {
            const totalCountHeader = response.headers.get('X-Total-Count');
            this.totalProducts = Number(totalCountHeader);
            this.totalPages = Math.ceil(Number(totalCountHeader) / this.limit)
            console.log(this.totalPages);
            this.products = response.body
            // this.products = response;
            console.log(this.products);

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
        this.page,
        this.limit
      ).subscribe(res => {

        this.products = [...this.products, ...res.body]
        console.log(this.products);
      });
    }
  }

};
