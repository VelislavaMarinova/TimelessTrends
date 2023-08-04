import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/types/product';

@Pipe({
    name: 'filterByBrand'
})
export class FilterPipeByBrand implements PipeTransform {

    transform(value: Product[], args: any[]): any {
        const filterField = args[0];
        // console.log(filterField);
        
        let filterResult
      
        if (filterField=='choose') {
           
            return value
        }else if(filterField === 'remove'){
            return value
        }
        filterResult = value.filter(p => p.brand === filterField)
        return filterResult

    }

}