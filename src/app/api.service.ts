import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './types/product';
import { Observable, map } from 'rxjs';

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
    sort:string,
    order:string,
    priceMin:number,
    priceMax:number, 
    page:number,
    limit:number): Observable<HttpResponse<Product[]>>  {
    const { apiUrl } = environment;
    return this.http.get<Product[]>(`${apiUrl}?category=${category}&_sort=${sort}&_order=${order}&price_gte=${priceMin}&price_lte=${priceMax}&_page=${page}&_limit=${limit}`, { observe: 'response' });
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
}
