import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen: boolean = true;// Start with the menu open on larger screens
  categories: string[] = [
    'sunglasses',
    'womens-jewellery',
    'fragrances',
    'skincare',
    'mens-watches',
    'womens-bags'
  ]


}
