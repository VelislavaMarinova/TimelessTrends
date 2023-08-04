import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterUpdateService {
    private filteredLengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
 

    updateLength(count: number) {
        this.filteredLengthSubject.next(count);
  }

  get filteredLength$() {
    return this.filteredLengthSubject.asObservable();
  }
}