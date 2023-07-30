import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import {HttpClientModule}from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductsListComponent,
    FilterListComponent,
    HomeComponent,
    ProductCardComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
