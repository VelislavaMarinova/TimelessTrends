import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { DropdownDirective } from '../shared/dropdown.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    RouterLink
  ], 
  exports:[
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
