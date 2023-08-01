import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { RatingComponent } from './rating/rating.component';
import { MatIconModule } from '@angular/material/icon';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    ShortenPipe,
    RatingComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ShortenPipe,
    RatingComponent,
    SortPipe
  ]
})
export class SharedModule { }
