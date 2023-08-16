import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from 'src/app/types/product';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('f', { static: false }) filterForm: NgForm;
  @Input() products: Product[];
  @Input() category:string;
  @Output() brandFilterChange = new EventEmitter<string>();
  @Output() priceFilterChange = new EventEmitter<string>();
  uniqueBrands: string[] = [];
  priceRanges:string[] =["0-49","50-99","100-149","150-199","more than 199"] 
  filterByPrice: string;
  filterByBrand: string = 'choose';
  priceFilterSelections: { [key: string]: boolean } = {}

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUniqueBrandsByCategory(this.category).subscribe(brands => {
      this.uniqueBrands = brands;
    });
  }

  onSubmit(){
console.log(this.filterForm.value);

  }

  onBrandFilterChange() {
    this.brandFilterChange.emit(this.filterByBrand);
  }

  // onPriceFilterChange() {
  //   console.log(this.filterByPrice);
    
  //   this.priceFilterChange.emit(this.filterByPrice);
  // }
  // onPriceFilterChange() {
  //   console.log(this.filterByPrice);
    
  //   if (this.filterByPrice === 'remove') {
  //     this.filterByPrice = 'choose'; // Reset to default value when removing filter
  //   }
  //   this.priceFilterChange.emit(this.filterByPrice);
  // }
  // onPriceFilterChange() {
  //   this.priceFilterChange.emit(this.filterByPrice);
  // }

}
