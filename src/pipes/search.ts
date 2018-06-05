import { Injectable, Pipe , PipeTransform } from '@angular/core';

/*
  Generated class for the Search pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'search',
  pure : true
})
@Injectable()
export class Search  implements PipeTransform{
  /*transform(list: any[], searchTerm: string): any[] { 
     if (searchTerm) {
      console.log(searchTerm);
        searchTerm = searchTerm.toUpperCase();
        return list.filter(item => {
          console.log(list);
          //return item[0].fullname.toUpperCase().indexOf(searchTerm) !== -1 
        });
      } else {
        return list;
      }
  }*/
  transform(items: Array<any>, conditions: string): Array<any> {
        return items.filter(item => {
          console.log(conditions);
            /*for (let field in conditions) {
                if (item[field] !== 'ATA') {
                    return false;
                }
            }
            return true;*/
        });
    }
}
