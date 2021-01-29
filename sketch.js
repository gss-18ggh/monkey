var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaG, obstacleG;
var score;
var ground, groundImage, bgI;
var invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgI=loadImage("jungle.jpg");

}



function setup() {
  createCanvas(500, 400)

  
  ground = createSprite(100, 150, 10, 10);
  ground.addImage(bgI);
  
  ground.velocityX=-5;
  ground.x=ground.width/2;
  
  invisibleGround = createSprite(300, 360, 600, 10)
  invisibleGround.visible = false;

  monkey = createSprite(30, 350, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  bananaG=createGroup();
  obstacleG=createGroup();
}





function draw() {
//    background("black")

  if (ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(gameState===PLAY){
  
  if (keyDown("space") && monkey.y>=50){
    monkey.velocityY = -6;
  }
  if (bananaG.isTouching(monkey)){
var rand=Math.round(random(10, 40));
    switch(rand){
      case 10: monkey.scale=0.13;
        break;
        case 20:monkey.scale=0.16;
        break;
        case 30:monkey.scale=0.19;
        break;
        case 40:monkey.scale=0.22;
        break;
      default: break;
        
    }
    bananaG.destroyEach();
      }
  
  
  if (obstacleG.isTouching(monkey)){


//    monkey.scale=0.1;
    gameState = END;
    
  }
  }
  
  
  monkey.velocityY = monkey.velocityY + 0.2

  monkey.collide(invisibleGround);
 
  obstaclesF();
  bananaF();
  

  drawSprites();
  textSize(20)
  fill("black")
  score=Math.ceil(frameCount/frameRate());
  text("score: "+score, 310, 30 );

  if(gameState===END){

    fill("white");
    stroke("black")
    textSize(25);
    text("GAME OVER", 200, 200)    
        bananaG.destroyEach();
    obstacleG.destroyEach();
ground.velocityX = 0
monkey.visible = false;
score = 0
    
  }
  
}

function bananaF() {
  if(frameCount%120===0){
  banana=createSprite(610, Math.round(random(120, 200)), 10, 10);
  banana.addImage(bananaImage);
  banana.velocityX=-3;
  banana.scale=0.06;
  banana.lifetime=300;
  bananaG.add(banana);
  }
}

function obstaclesF(){
 if (frameCount%180===0){
  obstacle=createSprite(Math.round(random(500, 600)), 330, 10, 10)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.2;
  obstacle.velocityX=-5
obstacle.lifetime=300
  obstacleG.add(obstacle);
   obstacle.debug=false
   obstacle.setCollider("circle", 0, 0, 170)
}
}