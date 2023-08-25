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
  
  loadMore: boolean = false;
  sortByParam: string | undefined;
  filterByPrice: string;
  filterByBrand: string | undefined;
  categoryImage: string;
  filterdLength = 0;
  
  priceMin: number | undefined;
  priceMax: number | undefined;
  order: string;
  sortOption: string;
  page: number = 1;
  limit: number = 8;
  totalProducts: number = 0;
  totalPages: number = 0;
  isFilterAdded = false;
  totalProductsAfterFilter: number;



  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {

      this.category = params.get('category');
      this.isLoading = true;
      this.loadMore = false
      this.priceMax = undefined;
      this.priceMin = undefined;
      this.filterByBrand = undefined;
      this.sortByParam = undefined;
      this.sortOption = undefined;
      this.order = undefined;
      this.totalProducts = 0;
      this.isFilterAdded = false;
      this.page = 1;
      this.limit = 8;
     
      this.loadData();
    });
  }
  
  loadData() {
  
    this.apiService.getProductsByCategoryFilterSortPaginate(
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
          this.products = response.body
  
  
          if (!this.isFilterAdded) {
            this.totalProducts = Number(totalCountHeader);
            this.totalPages = Math.ceil(Number(totalCountHeader) / this.limit);
            if (this.products.length === 0) {
              this.noProductsInTheList = true;
            }
          } else {
            this.totalPages = Math.ceil(Number(this.totalProductsAfterFilter) / this.limit)
  
          }
          if (this.totalPages > this.page) {
            this.loadMore = true
          }
  
          this.isLoading = false;
  
        },
        error: (err) => {
          this.isLoading = false
          console.log(`Error ${err}`);
        }
      })
  
  }

  onPerPageChange() {
    this.page = 1
    this.loadData()

  }

  handleFormFilterChange(formValues: any) {
    this.isFilterAdded = true;

    if (formValues.value.priceRange) {
      this.filterByPrice = formValues.value.priceRange;
      if (this.filterByPrice === 'more than 199') {
        this.priceMin = Number(this.filterByPrice.split(" ")[2]);
        this.priceMax = 10000;

      } else if (this.filterByPrice === 'remove filter') {
        this.filterByPrice = undefined
        this.priceMin = undefined;
        this.priceMax = undefined;
      }
      else {
        const [priceMinStr, priceMaxStr] = this.filterByPrice.split("-");
        this.priceMin = Number(priceMinStr);
        this.priceMax = Number(priceMaxStr);
      }

    }

    if (formValues.value.brand) {
      if (formValues.value.brand !== 'remove filter') {
        this.filterByBrand = formValues.value.brand;
      } else {
        this.filterByBrand = undefined;
      }
    } else {
      this.filterByBrand = undefined;
    }

    if (this.filterByBrand === undefined && this.filterByPrice === undefined) {
      this.isFilterAdded = false
    }

    this.page = 1;

    this.apiService.getTotalProductsCountIfFilter(
      this.category,
      this.priceMin,
      this.priceMax,
      this.filterByBrand
    ).subscribe(totalCount => {
      this.totalProductsAfterFilter = totalCount;
    })

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





  onLoadMore() {
    this.page++;
    this.loadMore = this.page < this.totalPages;
    this.loadMoreProducts();

  }

  loadMoreProducts() {
    if (this.page <= this.totalPages) {
      this.apiService.getProductsByCategoryFilterSortPaginate(
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
      });
    }
  }

};
