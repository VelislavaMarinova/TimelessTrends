import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { RatingComponent } from './rating/rating.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [

    ShortenPipe,
     RatingComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ShortenPipe,
    RatingComponent
  ]
})
export class SharedModule { }
