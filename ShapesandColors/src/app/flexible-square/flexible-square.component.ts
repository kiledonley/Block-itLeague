import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'flexible-square',
  templateUrl: './flexible-square.component.html',
  styleUrls: ['./flexible-square.component.scss']
})
export class FlexibleSquareComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


coordinates(){
  console.log("click")
}

}

