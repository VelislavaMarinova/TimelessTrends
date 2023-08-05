import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/types/product';

@Pipe({
    name: 'filterByPrice'
})
export class FilterPipeByPrice implements PipeTransform {


    transform(value: Product[], args: any[]): any {
        const filterField = args[0];
        let filteredValue = []

        switch (filterField) {
            case 'remove': return value;
            case '0-49': filteredValue = value.filter(v => v.price < 50); return filteredValue;
            case '50-99': filteredValue = value.filter(v => v.price < 100 && v.price > 49); return filteredValue;
            case '100-149': filteredValue = value.filter(v => v.price < 150 && v.price > 99); return filteredValue;
            case '150-199': filteredValue = value.filter(v => v.price < 200 && v.price > 149); return filteredValue;
            case 'more than 199': filteredValue = value.filter(v => v.price >= 200); return filteredValue;

        }
        return value;
    }

}