import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textfilter'
})
export class TextfilterPipe implements PipeTransform {

  transform(value: any, args?: string[]): any {
    //console.log(args);
    //default 10 character
    let limit = args.length > 0 ? parseInt(args[0]) : 10;
    let trail = args.length > 1 ? args[1] : "...";
    return value.length > limit ? value.substring(0,limit) + trail : value;
  }

}
