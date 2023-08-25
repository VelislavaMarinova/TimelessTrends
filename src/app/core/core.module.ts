import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { DropdownDirective } from '../shared/dropdown.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  
  ],
  imports: [
    CommonModule,
    RouterLink, 
    SharedModule
  ], 
  exports:[
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
