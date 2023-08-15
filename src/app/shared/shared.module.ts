import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { RatingComponent } from './rating/rating.component';
import { SortPipe } from './pipes/sort.pipe';
import { LoaderComponent } from './loader/loader.component';
import { FilterPipeByBrand } from './pipes/filterByBrand.pipe';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    ShortenPipe,
    FilterPipeByBrand,
    RatingComponent,
    SortPipe,
    LoaderComponent,
    DropdownDirective,
    
  ],
  imports: [
    CommonModule,
  
  ],
  exports: [
    ShortenPipe,
    RatingComponent,
    SortPipe,
    LoaderComponent,
    FilterPipeByBrand,DropdownDirective
  ]
})
export class SharedModule { }
