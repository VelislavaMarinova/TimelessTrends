import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule}from'@angular/material/toolbar';
import{MatIconModule}from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'

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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductsListComponent,
    ProductCardComponent,
    SidebarComponent,
    SortProductsComponent,
    FilterPipeByPrice
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
    
  ],
  providers: [CartCountService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
