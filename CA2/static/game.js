let canvas;
let context;
let bar;
let context2;

let fpsInternal = 1000/24;

let now;
let then = Date.now()

let mapWidth = 2000;
let mapHeight = 2000;

let tileSize = 50;

let player = {
    x : mapWidth / 2,
    y : mapHeight / 2,
    xSize:50,
    ySize:100,
    xSpeed:10,
    ySpeed:10,
    hp:10
}

let viewport = {
    x: 0,
    y: 0
};

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;

let healthBar;
let healthMax = 10;

document.addEventListener('DOMContentLoaded', init, false);


function init(){


    canvas = document.querySelector('#mainViewport');
    bar = document.querySelector('#bar')
    context = canvas.getContext('2d');
    context2 = bar.getContext('2d');
    window.addEventListener('keydown', activate, false);
    window.addEventListener('keyup', deactivate, false);
    viewportFollower()
    drawMain()
    drawCo()
}

function viewportFollower(){
    viewport.x = player.x - canvas.width/2
    viewport.y = player.y - canvas.height/2
}

function background() {
    context.clearRect(0, 0, map.width, map.height)
    context.fillStyle = '#657a9e'
    context.fillRect(0, 0, map.width, map.height)
}

function edgeCheck() {
    if (player.x === 0 || player.x === mapWidth){
        player.xSpeed = 0
    }
    if (player.y === 0 || player.y === mapWidth){
        player.ySpeed = 0
    }
    console.log('hit')
}

function healthCheck(){
    if (player.hp === 0){

    }
}

function drawMain(){
    window.requestAnimationFrame(drawMain);
    // background()
    viewportFollower();
    edgeCheck();
    // healthCheck()
    console.log('start')
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInternal) {
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'red';
    let positionX = player.x - viewport.x - player.xSize/2;
    let positionY = player.y - viewport.y - player.ySize/2;
    context.fillRect(positionX, positionY, player.xSize, player.ySize);
    if (moveDown){
        player.y = player.y + player.ySpeed;
    };
    if (moveUp){
        player.y = player.y - player.ySpeed;
    };
    if (moveLeft){
        player.x = player.x - player.xSpeed;
    };
    if (moveRight){
        player.x = player.x + player.xSpeed;
    }
} 

function drawCo(){
    window.requestAnimationFrame(drawCo);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInternal) {
        return;
    }
    context.clearRect(0, 0, bar.width, bar.height);
    context.fillStyle = '#ddc797';
    context.fillRect(60, 15, 170, 35);
    let currentHealthBar = 100 * (player.hp / healthMax);
    context.fillStyle = 'red';
    context.fillRect(60, 15, currentHealthBar, 35);
}

function activate(event){
    let key = event.key;
    if (event.key === 'w' || 
        event.key === 'a' ||
        event.key === 's' ||
        event.key === 'd'    
        ) {
        event.preventDefault();
        player.xSize=100;
        }
    if (event.key === 'w'){
        moveUp = true;
    } else if (event.key === 'a'){
        moveLeft = true;
    } else if (event.key === 'd'){
        moveRight = true;
    } else if (event.key === 's'){
        moveDown = true;
    }
}

function deactivate(event){
    let key = event.key;
    if (event.key === 'w' || 
        event.key === 'a' ||
        event.key === 's' ||
        event.key === 'd'    
        ) {
        event.preventDefault();
        player.xSize=50;
        };
    if (event.key === 'w'){
        moveUp = false;
    } else if (event.key === 'a'){
        moveLeft = false;
    } else if (event.key === 'd'){
        moveRight = false;
    } else if (event.key === 's'){
        moveDown = false;
    }
}