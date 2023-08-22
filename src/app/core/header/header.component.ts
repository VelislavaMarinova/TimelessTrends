import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartCountService } from 'src/app/cartCount.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  username: string | undefined;

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
  constructor(
    private cartCountService: CartCountService,
    private userService: UserService
  ) { };

  ngOnInit() {
    this.cartCountSubscription = this.cartCountService.cartCount$.subscribe(count => {
      this.cartCount += count;
    });

    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = user?.username;
      console.log(user);
      
    });
  }

  onCloseMenuClick() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen);
  }
  setIsOpenedToTrue() {
    this.isMenuOpen = true;
  }
  onLogout(){
    console.log('logout');
    
    this.userService.logout()
  }
  ngOnDestroy() {
    this.cartCountSubscription.unsubscribe();
    this.userSub.unsubscribe();
  }
}
