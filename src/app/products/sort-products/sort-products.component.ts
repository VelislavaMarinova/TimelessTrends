import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-products',
  templateUrl: './sort-products.component.html',
  styleUrls: ['./sort-products.component.css']
})
export class SortProductsComponent {
  @Output() sortChange = new EventEmitter<string>();
  @Output() sortDirectionChange=new EventEmitter<string>();

  sortByParam: string = '';
  sortDirection = "asc";

  onSortDirection() {
    this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
    this.sortDirectionChange.emit(this.sortDirection)
  }

  onSortChange() {
    this.sortChange.emit(this.sortByParam)
  }
}
