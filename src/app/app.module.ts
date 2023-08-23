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
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './products/sidebar/sidebar.component';
import { SortProductsComponent } from './products/sort-products/sort-products.component';
import { FilterPipeByPrice } from './shared/pipes/filterByPrice.pipe';
import { CartCountService } from './cartCount.service';
import { ApiService } from './api.service';
import { ProductDetailsComponent } from './products/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductsListComponent,
    ProductCardComponent,
    SidebarComponent,
    SortProductsComponent,
    FilterPipeByPrice,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    FormsModule
    
  ],
  providers: [CartCountService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
