import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './types/product';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { };

  // getProductsByCategory(category: string) {//
  //   const { apiUrl } = environment;
  //   // return this.http.get(`${apiUrl}/category/womens-bags`);

  //   return this.http.get(`${apiUrl}?category=${category}`);
  // }

  getProductsByCategoryPaginate(
    category: string,
    sort: string,
    order: string,
    priceMin: number,
    priceMax: number,
    brand: string | undefined,
    page: number,
    limit: number): Observable<HttpResponse<Product[]>> {
    const { apiUrl } = environment;
    let url = `${apiUrl}?category=${category}` //`;

    if (sort !== undefined && order !== undefined) {
      url += `&_sort=${sort}&_order=${order}`
    }
    if (priceMin !== undefined && priceMax !== undefined) {
      url += `&price_gte=${priceMin}&price_lte=${priceMax}`
    }
    if (brand !== undefined) {
      url += `&brand=${brand}`
    }
    url += `&_page=${page}&_limit=${limit}`
    return this.http.get<Product[]>(url, { observe: 'response' });
    // return this.http.get<Product[]>(`${apiUrl}?category=${category}&_sort=${sort}&_order=${order}&price_gte=${priceMin}&price_lte=${priceMax}&brand=${brand}&_page=${page}&_limit=${limit}`, { observe: 'response' });
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const { apiUrl } = environment;
    const url = `${apiUrl}?category=${category}`;
    return this.http.get<Product[]>(url);
  }

  getUniqueBrandsByCategory(category: string): Observable<string[]> {
    return this.getProductsByCategory(category).pipe(
      map(products => [...new Set(products.map(product => product.brand))])
    );
  }

  getTotalProductsCountIfFilter(
    category: string,
    priceMin: number,
    priceMax: number,
    brand: string | undefined
  ): Observable<number> {
    const { apiUrl } = environment;
    let url = `${apiUrl}?category=${category}`;
  
   
    if (priceMin !== undefined && priceMax !== undefined) {
      url += `&price_gte=${priceMin}&price_lte=${priceMax}`;
    }
    if (brand !== undefined) {
      url += `&brand=${brand}`;
    }
  
    return this.http.get<Product[]>(url, { observe: 'response' }).pipe(
      map(response => {
        const totalCount = response.body.length
       
        
        return totalCount;
      })
    );
  }
}
