import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  arr: any=[];
  transform(value: any, args?: any): any {
    for(let i in value){
      this.arr.push({column: i, data: value[i]});
    }
    return this.arr;
  }

}
