document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);
const playBtn = document.getElementById("playBtn");
const gameContent = document.getElementById("gameContent");
const startManu = document.getElementById("startManu");
const myCar = document.getElementById("myCar");
const roadSction = document.getElementById("roadSction");
const line = document.querySelectorAll(".line");
const enimyCar = document.querySelectorAll(".enimyCar");
const score = document.querySelector(".score");
const gameOverScore = document.querySelector("#gameOverScore");
const gameEnd = document.querySelector(".gameEnd");
const close = document.querySelector("#close");

const musicCrash = document.getElementById("carCrash");
const manuBg = document.getElementById("manuBg");
const playBg = document.getElementById("playBg");
const click = document.getElementById("click");



let keys = {ArrowUp : false,ArrowRight : false,ArrowDown : false,ArrowLeft : false};

let player = {speed : 5};

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

let intervel;
let isSeore = 0;













function carCrash(a,b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return!((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function gamePlay(){

    let roadSize = roadSction.getBoundingClientRect();
    if(keys.ArrowUp && player.Y > 200){ player.Y -= player.speed }
    if(keys.ArrowRight && (player.X < roadSize.width - 50) ){ player.X += player.speed }
    if(keys.ArrowLeft && player.X > 0){ player.X -= player.speed }
    if(keys.ArrowDown && player.Y < (roadSize.bottom - 100) ){ player.Y += player.speed }

    myCar.style.top = player.Y + "px";
    myCar.style.left = player.X + "px";

    line.forEach(function(item){
        item.y += player.speed;
        item.style.top = item.y + "px";
        if(item.y >= 860){
            item.y = -300;
        }  
    })

    enimyCar.forEach(function(itam){
        itam.y += 7;
        itam.style.top = itam.y + "px"; 
        if(carCrash(myCar,itam)){
            player.start = false;
            clearInterval(intervel);
            gameEnd.style.display = "flex";
            musicCrash.play();
            playBg.pause()
        }
        if(itam.y >= 850){
            itam.y = -300;
            itam.style.left = Math.floor(Math.random() * 350) + "px"; 
        } 
    })





    if(player.start == true){
        window.requestAnimationFrame(gamePlay);
    }
}






playBtn.addEventListener("click",startGame);
close.addEventListener("click",closeGame);


function startGame(){

    playBg.play();
    playBg.loop = true;
    click.play();
    manuBg.pause();
    player.start = true;
    gameContent.style.display = "block";
    startManu.style.display = "none";
    gameEnd.style.display = "none";

    player.Y = myCar.offsetTop;
    player.X = myCar.offsetLeft;

    for(i = 0; i < line.length; i++){
        line[i].y = (i * 300);
        line[i].style.top = line[i].y+"px";
    }

    for(x = 0; x < enimyCar.length; x++){
        enimyCar[x].y = (x * 300)
        enimyCar[x].style.top = enimyCar [x].y+"px";
        enimyCar[x].style.left = Math.floor(Math.random() * 350) + "px";
    }

    function scoreCount(){
        isSeore++;
        score.innerHTML = "Score "+" "+" "+" "+ isSeore;
        gameOverScore.innerHTML = isSeore;
    }
    intervel = setInterval(scoreCount,40)







    window.requestAnimationFrame(gamePlay);
}
function closeGame(){
    click.play();
    location.reload();
}


manuBg.play();
manuBg.loop = true;