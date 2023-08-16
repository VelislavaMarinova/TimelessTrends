import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sort-products',
  templateUrl: './sort-products.component.html',
  styleUrls: ['./sort-products.component.css']
})
export class SortProductsComponent implements OnChanges {
  @Input() selectedOption: string; 
  @Output() sortChange = new EventEmitter<string>();

  sortByParam: string = 'choose';

  ngOnChanges(changes: SimpleChanges) {
  if (changes.selectedOption && changes.selectedOption.currentValue !== undefined) {
      this.sortByParam = this.selectedOption;
    }}

  onSortChange() {
    this.sortChange.emit(this.sortByParam)
  }
}
