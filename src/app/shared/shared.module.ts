import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { RatingComponent } from './rating/rating.component';
import { MatIconModule } from '@angular/material/icon';
import { SortPipe } from './pipes/sort.pipe';
// import { FilterPipeByPrice } from './pipes/filterByPrice.pipe';
import { LoaderComponent } from './loader/loader.component';
import { FilterPipeByBrand } from './pipes/filterByBrand.pipe';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    ShortenPipe,
    // FilterPipeByPrice,
    FilterPipeByBrand,
    RatingComponent,
    SortPipe,
    LoaderComponent,
    DropdownDirective,
    
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ShortenPipe,
    RatingComponent,
    SortPipe,
    LoaderComponent,
    // FilterPipeByPrice,
    FilterPipeByBrand,DropdownDirective
  ]
})
export class SharedModule { }
