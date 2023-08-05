import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartCountService {
    private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    updateCartCount(count: number) {
        this.cartCountSubject.next(count);
  }

  get cartCount$() {
    return this.cartCountSubject.asObservable();
  }
}