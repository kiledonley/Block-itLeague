import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'blocket-league',
  templateUrl: './blocket-league.component.html',
  styleUrls: ['./blocket-league.component.scss']
})
export class BlocketLeagueComponent implements OnInit {

  KEY_CODES = [`KeyW`, `KeyS`, 'KeyA', `KeyD`, 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space']; 
  KEY_DOWN: Array<boolean> = [false, false, false, false, false, false, false, false, false, false]
  
  
  playerOne: HTMLElement;
  playerTwo: HTMLElement;
  ball: HTMLElement;
  arena: HTMLElement;
  netBlue: HTMLElement;
  netOrange: HTMLElement;
  
  ballStart: boolean
  ballContinue: boolean
  ballmove: boolean;
  ballX: number;
  ballY: number;
  playerSpeed: number;
  blueScore: number;
  orangeScore: number;
  timer;

  ballInterval: any;
  playerInterval: any;

  ballCollisionmodifier: number;
  banner: any;
  subbanner: any;

  pause : boolean

  constructor() { 

    setInterval(() => {
      if(!this.pause){
      this.ballMove();
      this.goal();
      }
    }, 1000 * .01);
   
    setInterval(() => { 
      if(!this.pause){
      this.handleKeyPress(); 
      }
    }, 1000 * .01);

      setInterval(() => { 
        if(!this.pause){
         this.timer--
        }
        if(this.timer === 0){this.gameStop("gameEnd"); 
        }
    }, 1000 * 1);

  }

  ngOnInit() {

    this.playerOne = document.getElementById('playerOne');
    this.playerTwo = document.getElementById('playerTwo');
    this.ball = document.getElementById('ball');
    this.arena = document.getElementById('arena');
    this.netBlue = document.getElementById('goalBlue');
    this.netOrange = document.getElementById('goalOrange');

    this.timer = 10;

    this.ballX = 0;
    this.ballY = 0; 
    this.playerSpeed = 1;

    this.blueScore = 0;
    this.orangeScore = 0;

    this.pause = true;


    this.ballCollisionmodifier = 1;
    this.banner = "BLOCK-IT LEAGUE";
    this.subbanner = "PRESS ENTER OR SPACE TO START";
    
      document.addEventListener(`keydown`, event => {

      for(let i = 0; i < this.KEY_CODES.length; i++){
          
          if(event.code === this.KEY_CODES[i]){
            this.KEY_DOWN[i] = true
          }
        }

          if(this.KEY_DOWN[8] || this.KEY_DOWN[9]){
            if(this.pause){
              this.gameStart();
            }
            else{this.gameStop("pause")}
                      }
    });
    document.addEventListener(`keyup`, event => {
    
        for(let i = 0; i < this.KEY_CODES.length; i++){
            if(event.code === this.KEY_CODES[i]){
              this.KEY_DOWN[i] = false
            }
          }
    });
  }

  public handleKeyPress(){  

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

  gameStart(){
    this.banner = 3;
    console.log(this.banner);
    this.subbanner = "";
    let countInterval : any;
    console.log("gameStart")


    countInterval = setInterval(() => { 
        this.banner--
        console.log("countinterval")
        if(this.banner <= 0){
          this.banner = "";
          this.pause = false;
          clearInterval(countInterval)
        }
    }, 1000 * 1);
  }


  gameStop(reason){
    this.pause = true;
    console.log(this.pause, "gameStop", reason)
    if(reason === "pause"){
      this.banner = "PAUSE"
      this.subbanner = "press space or enter to continue"
    }

    if(reason === "gameEnd"){
      console.log("final Score ",this.blueScore,this.orangeScore)
      if(this.blueScore == this.orangeScore){this.banner = "Everyone is a Winner!"}
      else{ 
      this.banner = this.blueScore > this.orangeScore ? "Blue gets the Win!" : "Orange gets the Win!"
      } 
      this.subbanner = "press enter or space to play again!";
      this.timer = 300;
      this.blueScore = 0;
      this.orangeScore = 0;
      this.reset(0, false);
  }

    if(reason === "goalBlue" || reason === "goalOrange"){
        this.banner = reason === "goalBlue" ? "Blue Scores!" : "Orange Scores!";
        this.subbanner= "Gooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaallllllllllll"
        this.reset(3, true)
    }
  }

    reset(gloat, start){
      
    let countInterval: any;
    countInterval = setInterval(() => {
      gloat--
      if(gloat <= 0){
        this.ball.style.left = `calc(50% - 50px)`;
        this.ball.style.top = `calc(50% - 50px)`;
        this.playerOne.style.left = `100px`;
        this.playerOne.style.top = `calc(50% - 25px)`;
        this.playerTwo.style.left = `${this.arena.offsetWidth - 150 }px`;
        this.playerTwo.style.top = `calc(50% - 25px)`;
        this.ballX = 0;
        this.ballY = 0;
        if(start){
        this.gameStart(); 
        }
        clearInterval(countInterval)
      }
    }, 1000 * 1);


  }

  

   ballMove(){
    let Player1: Array<number> = [this.playerOne.offsetTop + this.playerOne.offsetHeight / 2, this.playerOne.offsetLeft + this.playerOne.offsetHeight / 2, this.playerOne.offsetHeight / 2]
    let Player2: Array<number> = [this.playerTwo.offsetTop + this.playerTwo.offsetHeight / 2, this.playerTwo.offsetLeft + this.playerTwo.offsetHeight / 2, this.playerTwo.offsetHeight / 2]
    let ball: Array<number> = [this.ball.offsetTop + this.ball.offsetHeight / 2, this.ball.offsetLeft + this.ball.offsetHeight / 2, this.ball.offsetHeight / 2]
    let border: Array<number> = [0,this.arena.offsetHeight,0,this.arena.offsetWidth];
    
    if(ball[1] - ball[2] + this.ballX <= border[2] || ball[1] + ball[2] + this.ballX >= border[3] ||
       ball[0] - ball[2] + this.ballY <= border[0] || ball[0] + ball[2] + this.ballY >= border[1]){

        if(ball[1] - ball[2] + this.ballX <= border[2] || ball[1] + ball[2] + this.ballX >= border[3]){
          this.ballX *= -1; 
          console.log("border collision");
        
            if(Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player2[1], 2)) <= ball[2] + Player2[2] ||
           Math.sqrt(Math.pow(ball[0] - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player1[1], 2)) <= ball[2] + Player1[2]){
             this.ballX = 0;
             console.log("ball pinned");
           }
        }
        if(ball[0] - ball[2] + this.ballY <= border[0] || ball[0] + ball[2] + this.ballY >= border[1]){
        this.ballY *= -1; 
        console.log("border collision");
    
          if(Math.sqrt(Math.pow(ball[0] + this.ballY - Player2[0], 2) + Math.pow(ball[1] - Player2[1], 2)) <= ball[2] + Player2[2] ||
            Math.sqrt(Math.pow(ball[0] + this.ballY - Player2[0], 2) + Math.pow(ball[1] - Player1[1], 2)) <= ball[2] + Player1[2]){
              this.ballY = 0;
              console.log("ball pinned");
            }
          }
        } 
    else{
      if(Math.sqrt(Math.pow(ball[0] + this.ballY  - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player2[1], 2)) <= ball[2] + Player2[2] + this.ballCollisionmodifier  &&
      Math.sqrt(Math.pow(ball[0] + this.ballY - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player1[1], 2)) <= ball[2] + Player1[2] + this.ballCollisionmodifier){
        this.ballX = ball[1] - ((Player1[1]+Player2[1])/2)/83;
        this.ballY = ball[0] - ((Player1[0]+Player2[0])/2/83);
        console.log("both players touched")
      }
        else{
            if(Math.sqrt(Math.pow(ball[0] + this.ballY  - Player2[0], 2) + Math.pow(ball[1] + this.ballX - Player2[1], 2)) <= ball[2] + Player2[2] + this.ballCollisionmodifier){
              this.ballX = (ball[1] - Player2[1])/20; 
              this.ballY = (ball[0] - Player2[0])/20; 
              console.log("player 2 touched")
            }
            if(Math.sqrt(Math.pow(ball[0] + this.ballY  - Player1[0], 2) + Math.pow(ball[1] + this.ballX - Player1[1], 2)) <= ball[2] + Player1[2] + this.ballCollisionmodifier){
              this.ballX = (ball[1] - Player1[1])/20;
              this.ballY = (ball[0] - Player1[0])/20; 
              console.log("player 1 touched")
            }
          }
        }
            

            this.ball.style.left = `${ball[1] - ball[2] + this.ballX}px`;
            this.ball.style.top = `${ball[0] - ball[2] + this.ballY}px`;
            console.log(this.ballX,this.ballY); 
      }

      goal(){
        let blueScores = [this.netBlue.offsetLeft + this.netBlue.offsetWidth, this.netBlue.offsetTop, this.netBlue.offsetTop + this.netBlue.offsetHeight]
        let orangeScores = [this.netOrange.offsetLeft, this.netOrange.offsetTop, this.netOrange.offsetTop + this.netOrange.offsetHeight]
        let ballLeft = [this.ball.offsetLeft, this.ball.offsetTop + this.ball.offsetHeight/2]
        let ballRight = [this.ball.offsetLeft + this.ball.offsetWidth, this.ball.offsetTop + this.ball.offsetHeight/2]

        if(ballLeft[0] < blueScores[0] && 
          ballLeft[1] > blueScores[1] &&
          ballLeft[1] < blueScores[2]         
        )
        { console.log("Orange Scores")
        this.orangeScore++
        this.gameStop("goalOrange");
        }
          if(ballRight[0] > orangeScores[0] && 
            ballRight[1] > orangeScores[1] &&
            ballRight[1] < orangeScores[2]         
          ){
            console.log("Blue Scores")
            this.blueScore++
            this.gameStop("goalBlue");
          }
      }
  }
      

  


    
