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
  ball: HTMLElement;
  arena: HTMLElement;
  

  ballmove: boolean;
  ballX: number;
  ballY: number;
  playerSpeed: number;

  constructor() { 
    setInterval(() => { 
      this.ballMoveX();

    }, 1000 * .001);
  }

  ngOnInit() {

    this.playerOne = document.getElementById('playerOne');
    this.playerTwo = document.getElementById('playerTwo');
    this.ball = document.getElementById('ball');
    this.arena = document.getElementById('arena');

    this.ballX = 1;
    this.ballY = 1; 
    this.playerSpeed = 1;

      document.addEventListener(`keydown`, event => {

      for(let i = 0; i < this.KEY_CODES.length; i++){
          
          if(event.code === this.KEY_CODES[i]){
            this.KEY_DOWN[i] = true
          }
      }
    this.handleKeyPress();

    });
    document.addEventListener(`keyup`, event => {
    

        for(let i = 0; i < this.KEY_CODES.length; i++){
            
            if(event.code === this.KEY_CODES[i]){
              this.KEY_DOWN[i] = false
            }
        }
    this.handleKeyPress();
    });
  }


  handleKeyPress() {  

    let Player1: Array<number> = [this.playerOne.offsetTop + this.playerOne.offsetHeight / 2, this.playerOne.offsetLeft + this.playerOne.offsetHeight / 2, this.playerOne.offsetHeight / 2]
    let Player2: Array<number> = [this.playerTwo.offsetTop + this.playerTwo.offsetHeight / 2, this.playerTwo.offsetLeft + this.playerTwo.offsetHeight / 2, this.playerTwo.offsetHeight / 2]
    let ball: Array<number> = [this.ball.offsetTop + this.ball.offsetHeight / 2, this.ball.offsetLeft + this.ball.offsetHeight / 2, this.ball.offsetHeight / 2]
    let border: Array<number> = [0,this.arena.offsetHeight,0,this.arena.offsetWidth];


      
      if(this.KEY_DOWN[0] && 
        Player1[0] - Player1[2] - this.playerSpeed >= border[0] &&
        Math.sqrt(Math.pow(Player1[0] - this.playerSpeed - Player2[0], 2) + Math.pow(Player1[1]- Player2[1], 2)) >= Player1[2] + Player2[2] &&
        Math.sqrt(Math.pow(Player1[0] - this.playerSpeed - ball[0], 2) + Math.pow(Player1[1]- ball[1], 2)) >= Player1[2] + ball[2]
        ) {this.playerOne.style.top = `${Player1[0] - Player1[2] - this.playerSpeed}px`};     
        
      if(this.KEY_DOWN[1] && 
        Player1[0] + Player1[2] + this.playerSpeed <= border[1] &&
        Math.sqrt(Math.pow(Player1[0] + this.playerSpeed - Player2[0], 2) + Math.pow(Player1[1]- Player2[1], 2)) >= Player1[2] + Player2[2] &&
        Math.sqrt(Math.pow(Player1[0] + this.playerSpeed - ball[0], 2) + Math.pow(Player1[1]- ball[1], 2)) >= Player1[2] + ball[2]
        ) {this.playerOne.style.top = `${Player1[0] - Player1[2] + this.playerSpeed}px`};  

      if(this.KEY_DOWN[2] && 
        Player1[1] - Player1[2] - this.playerSpeed >= border[2] &&
        Math.sqrt(Math.pow(Player1[0] - Player2[0], 2) + Math.pow(Player1[1]- this.playerSpeed  - Player2[1], 2)) >= Player1[2] + Player2[2] &&
        Math.sqrt(Math.pow(Player1[0] - ball[0], 2) + Math.pow(Player1[1] - this.playerSpeed - ball[1], 2)) >= Player1[2] + ball[2]
        ) {this.playerOne.style.left = `${Player1[1] - Player1[2]- this.playerSpeed}px`};  

        if(this.KEY_DOWN[3] && 
          Player1[1] + Player1[2] + this.playerSpeed <= border[3] &&
          Math.sqrt(Math.pow(Player1[0] - Player2[0], 2) + Math.pow(Player1[1] + this.playerSpeed  - Player2[1], 2)) >= Player1[2] + Player2[2] &&
          Math.sqrt(Math.pow(Player1[0] - ball[0], 2) + Math.pow(Player1[1] + this.playerSpeed - ball[1], 2)) >= Player1[2] + ball[2]
          ) {this.playerOne.style.left = `${Player1[1] - Player1[2] + this.playerSpeed}px`};  

          if(this.KEY_DOWN[4] && 
            Player2[0] - Player2[2] - this.playerSpeed >= border[0] &&
            Math.sqrt(Math.pow(Player2[0] - this.playerSpeed - Player1[0], 2) + Math.pow(Player2[1] - Player1[1], 2)) >= Player1[2] + Player2[2] &&
            Math.sqrt(Math.pow(Player2[0] - this.playerSpeed - ball[0], 2) + Math.pow(Player2[1] - ball[1], 2)) >= Player2[2] + ball[2]
            ) {this.playerTwo.style.top = `${Player2[0] - Player2[2] - this.playerSpeed}px`};     
            
          if(this.KEY_DOWN[5] && 
            Player2[0] + Player2[2] + this.playerSpeed <= border[1] &&
            Math.sqrt(Math.pow(Player2[0] + this.playerSpeed - Player1[0], 2) + Math.pow(Player2[1]- Player1[1], 2)) >= Player1[2] + Player2[2] &&
            Math.sqrt(Math.pow(Player2[0] + this.playerSpeed - ball[0], 2) + Math.pow(Player2[1]- ball[1], 2)) >= Player2[2] + ball[2]
            ) {this.playerTwo.style.top = `${Player2[0] - Player2[2] + this.playerSpeed}px`};  
    
          if(this.KEY_DOWN[6] && 
            Player2[1] - Player2[2] - this.playerSpeed >= border[2] &&
            Math.sqrt(Math.pow(Player2[0] - Player1[0], 2) + Math.pow(Player2[1] - this.playerSpeed  - Player1[1], 2)) >= Player1[2] + Player2[2] &&
            Math.sqrt(Math.pow(Player2[0] - ball[0], 2) + Math.pow(Player2[1] - this.playerSpeed - ball[1], 2)) >= Player2[2] + ball[2]
            ) {this.playerTwo.style.left = `${Player2[1] - Player2[2] - this.playerSpeed}px`};  
    
            if(this.KEY_DOWN[7] && 
              Player2[1] + Player2[2] + this.playerSpeed <= border[3] &&
              Math.sqrt(Math.pow(Player2[0] - Player1[0], 2) + Math.pow(Player2[1] + this.playerSpeed  - Player1[1], 2)) >= Player1[2] + Player2[2] &&
              Math.sqrt(Math.pow(Player2[0] - ball[0], 2) + Math.pow(Player2[1] + this.playerSpeed - ball[1], 2)) >= Player2[2] + ball[2]
              ) {this.playerTwo.style.left = `${Player2[1] - Player2[2] + this.playerSpeed}px`}; 
  }

  ballMoveX(){
    let Player1: Array<number> = [this.playerOne.offsetTop + this.playerOne.offsetHeight / 2, this.playerOne.offsetLeft + this.playerOne.offsetHeight / 2, this.playerOne.offsetHeight / 2]
    let Player2: Array<number> = [this.playerTwo.offsetTop + this.playerTwo.offsetHeight / 2, this.playerTwo.offsetLeft + this.playerTwo.offsetHeight / 2, this.playerTwo.offsetHeight / 2]
    let ball: Array<number> = [this.ball.offsetTop + this.ball.offsetHeight / 2, this.ball.offsetLeft + this.ball.offsetHeight / 2, this.ball.offsetHeight / 2]
    let border: Array<number> = [0,this.arena.offsetHeight,0,this.arena.offsetWidth];
    
    if(ball[1] - ball[2] + this.ballX <= border[2] || ball[1] + ball[2] + this.ballX >= border[3]){
        if(Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player2[1], 2)) <= ball[2] + Player2[2] ||
           Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player1[1], 2)) <= ball[2] + Player1[2]){
             this.ballX = 0;
             console.log("ball pinned");
             ;
        }   
        else{this.ballX *= -1; 
          console.log("border collision");
          }
      }
    else{
      if(Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player2[1], 2)) <= ball[2] + Player2[2] &&
      Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player1[1], 2)) <= ball[2] + Player1[2]){
        this.ballX = ball[1] - ((Player1[1]+Player2[1])/2);
        console.log("both players touched")
      }
        else{
            if(Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player2[1], 2)) <= ball[2] + Player2[2]){
              this.ballX = (ball[1] - Player2[1])/83; 
              console.log("player 2 touched")
              console.log(Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player2[1], 2)) , ball[2] + Player2[2])
            }
            if(Math.sqrt(Math.pow(ball[0] - Player1[0], 2) + Math.pow(ball[1] + this.ballX - Player1[1], 2)) <= ball[2] + Player1[2]){
              this.ballX = (ball[1] - Player1[1])/83 
              console.log("player 1 touched")
            }
          }
        }
         
//BallmoveY
        if(ball[0] - ball[2] + this.ballY <= border[0] || ball[0] + ball[2] + this.ballY >= border[1]){
            if(Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballY - Player2[1], 2)) <= ball[2] + Player2[2] ||
               Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballY - Player1[1], 2)) <= ball[2] + Player1[2]){
                 this.ballY = 0;
                 console.log("ball pinned");
                 ;
            }   
            else{this.ballY *= -1; 
              console.log("border collision", this.ballY);
              
              }
          }
        else{
          if(Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballY - Player2[1], 2)) <= ball[2] + Player2[2] &&
          Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballY - Player1[1], 2)) <= ball[2] + Player1[2]){
            this.ballY = ball[1] - ((Player1[1]+Player2[1])/2);
            console.log("both players touched")
          }
            else{
                if(Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballY - Player2[1], 2)) <= ball[2] + Player2[2]){
                  this.ballY = (ball[0] - Player2[1])/83; 
                  console.log("player 2 touched")
                  console.log(Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballY - Player2[1], 2)) , ball[2] + Player2[2])
                }
                if(Math.sqrt(Math.pow(ball[0] - Player1[0], 2) + Math.pow(ball[1] + this.ballY - Player1[1], 2)) <= ball[2] + Player1[2]){
                  this.ballY = (ball[0] - Player1[1])/83 
                  console.log("player 1 touched")
                }
              }
            }
            this.ball.style.left = `${ball[1] - ball[2] + this.ballX}px`;
            this.ball.style.top = `${ball[0] - ball[2] + this.ballY}px`;

          }

      }


    
