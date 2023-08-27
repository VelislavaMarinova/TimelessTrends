import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { RatingComponent } from './rating/rating.component';
import { LoaderComponent } from './loader/loader.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    ShortenPipe,
    RatingComponent,
    LoaderComponent,
    DropdownDirective,
    
  ],
  imports: [
    CommonModule,
  
  ],
  exports: [
    ShortenPipe,
    RatingComponent,
    LoaderComponent,
  ]
})
export class SharedModule { }
