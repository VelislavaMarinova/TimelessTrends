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
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { SharedModule } from './shared/shared.module';
import { FilterListComponent } from './filter-list/filter-list.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './products/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductsListComponent,
    FilterListComponent,
    HomeComponent,
    ProductCardComponent,
    SidebarComponent,
   
 

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
