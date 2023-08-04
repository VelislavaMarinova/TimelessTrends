import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartCountService } from 'src/app/cartCount.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  categories: string[] = [
    'sunglasses',
    'womens-jewellery',
    'fragrances',
    'skincare',
    'mens-watches',
    'womens-bags'
  ];
  cartCount: number = 0
  private cartCountSubscription: Subscription;
  constructor(private cartCountService: CartCountService) { };

  ngOnInit() {
    this.cartCountSubscription = this.cartCountService.cartCount$.subscribe(count => {
      this.cartCount += count;
    });
  }

    onCloseMenuClick(){
      this.isMenuOpen = !this.isMenuOpen;
      console.log(this.isMenuOpen);
    }
    setIsOpenedToTrue(){
      this.isMenuOpen = true;
    }
    ngOnDestroy() {
      this.cartCountSubscription.unsubscribe();
    }
  }
