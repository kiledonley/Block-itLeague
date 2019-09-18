import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(timer: any): any {

    let minutes = Math.floor(timer/60);
    let seconds = timer % 60;
    let zero: string = seconds < 10 ? "0": "";
    let timedisplay: string = `${minutes}:${zero}${seconds}`

    return timedisplay;
  }

}
