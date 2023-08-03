import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() products: Product[];
 
  @Output() brandFilterChange = new EventEmitter<string>();
  @Output() priceFilterChange = new EventEmitter<string>();
  brands:string[]=[];
  priceRanges:string[] =["0-49","50-99","100-149","150-199","more than 199"] 

  filterByPrice: string = "choose";
  filterByBrand: string = 'choose';



  ngOnInit(): void {
    this.products?.forEach(p => {
      if (!this.brands.includes(p.brand)) {
        this.brands.push(p.brand)
      }
    })
  }

  onBrandFilterChange() {
    this.brandFilterChange.emit(this.filterByBrand);
  }
  onPriceFilterChange() {
    this.priceFilterChange.emit(this.filterByPrice);
  }

}
