import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  categories: string[] = [
    'sunglasses',
    'womens-jewellery',
    'fragrances',
    'skincare',
    'mens-watches',
    'womens-bags'
  ]

  onCloseMenuClick(){
    this.isMenuOpen=!this.isMenuOpen;
    console.log(this.isMenuOpen);
  }
  setIsOpenedToTrue(){
    this.isMenuOpen=true;
  }
}
