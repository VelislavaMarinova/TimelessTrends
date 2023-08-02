import { Component,EventEmitter,Input, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
@Input() brands: string[];
@Output() brandFilterChange = new EventEmitter<string>();
@Output() priceFilterChange = new EventEmitter<string>();

filterByPrice:string = "choose";
filterByBrand: string = 'choose';


onBrandFilterChange() {
  this.brandFilterChange.emit(this.filterByBrand);
}
onPriceFilterChange() {
  this.priceFilterChange.emit(this.filterByPrice);
}

}
