import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: number): any {
    let timerstring: string;
    let zero: string;
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    if(seconds<10){
      zero = "0";
    }
    else{zero = ""};

    timerstring = `${minutes}:${zero}${seconds}`
    return timerstring
  }

}
