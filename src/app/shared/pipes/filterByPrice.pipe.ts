import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { CartCountService } from 'src/app/cartCount.service';
import { FilterUpdateService } from 'src/app/filterUpdate.service';
import { Product } from 'src/app/types/product';
@Injectable({
    providedIn:'root'
  })
@Pipe({
    name: 'filterByPrice'
})
export class FilterPipeByPrice implements PipeTransform {
    constructor(private service: FilterUpdateService){}

    transform(value: Product[], args: any[]): any {
        const filterField = args[0];
        let filteredValue = []
        // console.log(filterField,"filterField");
        
     

           switch(filterField){
               case 'remove': return value;
               case '0-49': filteredValue = value.filter(v=>v.price<50),this.service.updateLength(filteredValue.length);return filteredValue;
               case '50-99': filteredValue = value.filter(v=>v.price<100 && v.price>49 );  return filteredValue;
               case '100-149': filteredValue = value.filter(v=>v.price<150 && v.price>99); return filteredValue;
               case '150-199': filteredValue = value.filter(v=>v.price<200 && v.price>149); return filteredValue;
               case 'more than 199': filteredValue = value.filter(v=>v.price>=200); return filteredValue;

              
   
           }
           return value
    }

}