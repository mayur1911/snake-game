
    /* fvariables */
let inputDir = {x: 0,y:0}; /* to make snake stable at start */
const foodsound = new Audio('music/gunshot-01.mp3');
const gameoversound = new Audio('music/game_over.mp3');
const movesound = new Audio('music/move.mp3');
const backgroundsound = new Audio('music/background_ambient.mp3');
let speed =3;
let count=0;
let score =0;
let lastPaintTime =0;
let a =2;
let b=16;
let snakeArr =[
    {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())  }    /* head will point first here */
]
food ={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())  }; /* food is not array  */

/* game functions */

function main(ctime){   /* ctime is curretn time */
    window.requestAnimationFrame(main);
   // console.log(ctime)

    if((ctime - lastPaintTime)/1000 < 1/speed){      /* to control fps */
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){
    scoreBox.innerHTML ="Score :"+score;
    // if snake touches itself
    for(let i=1; i<snakeArr.length;i++){
        if(snakeArr[0].x === snakeArr[i].x &&  snakeArr[0].y === snakeArr[i].y) 
        {  food ={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())  };
            return true;
        }
    }

    //if snake touches wall
    if(snakeArr[0].x >=18 || snakeArr[0].x<=0 || snakeArr[0].y >=18 || snakeArr[0].y<=0){
        food ={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())  };

            return true;
        }
    

    
}

function gameEngine(){
    /* Part 1: updating snake variable (array) & food */
    if(isCollide(snakeArr)){
        gameoversound.play();
        backgroundsound.pause();
        inputDir = {x: 0,y:0};      /* make velocity zero */
        alert("game over press any key to play");
        snakeArr =[   {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())  }
        ]     /* empty the snake array i.e. only head in snake */
        backgroundsound.play();
        score =0;
        speed = 3;
        count =0 ;
        SpeedBox.innerHTML ="Speed :"+speed;
    }
    
    // if you have eaten food increment score and regenerate the food
    // it will eat when head and food have same coordinates
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x){
    
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});    //to increment lenght of snake
        foodsound.play();
        score+=1;
        if(score > highscoreval){
            highscoreval = score;
            localStorage.getItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score :"+highscoreval;
        }
        scoreBox.innerHTML ="Score :"+score;
        SpeedBox.innerHTML ="Speed :"+speed;
        count+=1;
        if(count === 3){
            speed+=1;
            count=0;
        }
        
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())  }    /* generate new food  randomly between 
        grid 2 - 16*/
        
    }

    // moving the snake

    for(let i=snakeArr.length-2 ; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};   //new object
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //  Part 2: display & render the sanke 

    board.innerHTML = "";
    snakeArr.forEach((e,index) =>{
        snakeElement = document.createElement('div');   /* adding style to snakeArr in jv script */
        snakeElement.style.gridRowStart = e.y;      /* position */
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Display the food
    foodElement = document.createElement('div');   
    foodElement.style.gridRowStart = food.y;      
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    
}



//  main login starts here

let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval  =0 ;
    
    localStorage.getItem("highscore", JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "Hi Score :"+highscore;
}
window.requestAnimationFrame(main); /* to render animations */
window.addEventListener('keydown',e=>{
    inputDir = {x: 0,y:1}   //start the game
    movesound.play();
    switch(e.key){      /* inputdir is velocity */
        case "ArrowUp":
            console.log("arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowLeft":
            console.log("arrowleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("arrowright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowDown":
            console.log("arrowdown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        default:
            break;
    }
});