import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blocket-league',
  templateUrl: './blocket-league.component.html',
  styleUrls: ['./blocket-league.component.scss']
})
export class BlocketLeagueComponent implements OnInit {

  KEY_CODES = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', `KeyW`, `KeyS`, 'KeyA', `KeyD` ]; 
  KEY_DOWN: Array<boolean> = [false, false, false, false, false, false, false, false]
  
  playerOne: HTMLElement;
  playerTwo: HTMLElement;
  

  constructor() { }

  ngOnInit() {
      document.addEventListener(`keydown`, event => {

      for(let i = 0; i < this.KEY_CODES.length; i++){
          
          if(event.code === this.KEY_CODES[i]){
            this.KEY_DOWN[i] = true
          }
      }
    this.handleKeyPress();
    console.log(this.KEY_CODES);
    });
    document.addEventListener(`keyup`, event => {
    

        for(let i = 0; i < this.KEY_CODES.length; i++){
            
            if(event.code === this.KEY_CODES[i]){
              this.KEY_DOWN[i] = false
            }
        }
    this.handleKeyPress();
    console.log(this.KEY_CODES);
    });
  }


  handleKeyPress() {  
    this.playerOne = document.getElementById('playerOne');
    this.playerTwo = document.getElementById('playerTwo');
    let Player1_currentTop = this.playerOne.offsetTop;
    let Player2_currentTop = this.playerTwo.offsetTop;
    let Player1_currentLeft = this.playerOne.offsetLeft;
    let Player2_currentLeft = this.playerTwo.offsetLeft;

      if(this.KEY_DOWN[0] === true) {this.playerOne.style.top = `${Player1_currentTop - 10}px`;}
      if(this.KEY_DOWN[1] === true) {this.playerOne.style.top = `${Player1_currentTop + 10}px`;}
      if(this.KEY_DOWN[2] === true) {this.playerOne.style.left = `${Player1_currentLeft - 10}px`;}
      if(this.KEY_DOWN[3] === true) {this.playerOne.style.left = `${Player1_currentLeft + 10}px`;}
      if(this.KEY_DOWN[4] === true) {this.playerTwo.style.top = `${Player2_currentTop - 10}px`;}
      if(this.KEY_DOWN[5] === true) {this.playerTwo.style.top = `${Player2_currentTop + 10}px`;}
      if(this.KEY_DOWN[6] === true) {this.playerTwo.style.left = `${Player2_currentLeft - 10}px`;}
      if(this.KEY_DOWN[7] === true) {this.playerTwo.style.left = `${Player2_currentLeft + 10}px`;}
  }



}
