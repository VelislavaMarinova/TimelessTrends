import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from 'src/app/types/product';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) filterForm: NgForm;
  @Input() products: Product[];
  @Input() category: string;
  @Output() formFilterCange = new EventEmitter<{}>()

  private subscription: Subscription | undefined;

  uniqueBrands: string[] = ["remove filter"];
  priceRanges: string[] = ["0-49", "50-99", "100-149", "150-199", "more than 199", "remove filter"]

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.subscription = this.apiService.getUniqueBrandsByCategory(this.category).subscribe(brands => {
      console.log(brands);
      
      this.uniqueBrands = [...brands,...this.uniqueBrands];
    });
  }

  onSubmit() {
    this.formFilterCange.emit(this.filterForm)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
