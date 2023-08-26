import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './products/main/main.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import {HttpClientModule}from '@angular/common/http';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './products/filter-component/filter.component';
import { SortProductsComponent } from './products/sort-products/sort-products.component';
import { CartCountService } from './cartCount.service';
import { ApiService } from './api.service';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductReviewsComponent } from './products/product-reviews/product-reviews.component';
import { ProductReviewComponent } from './products/product-review/product-review.component';
import { AddReviewComponent } from './products/add-review/add-review.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductsListComponent,
    ProductCardComponent,
    FilterComponent,
    SortProductsComponent,
    ProductDetailsComponent,
    ProductReviewsComponent,
    ProductReviewComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [CartCountService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
