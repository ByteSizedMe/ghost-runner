var ghost,ghostImage;
var tower,towerImage;
var door, doorImage;
var climber,climberImage;

var doorGroup;
var climberGroup;

var invisbleBlock,invisbleBlockGroup;

var gameState = "PLAY";

function preload(){
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  
}

function setup(){
  createCanvas(600,600);
  doorGroup = new Group();

  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImage);
  
  ghost.scale = 0.3;
  
  
}

function spawnObstacles(){
  if(frameCount%150=== 0){
    door = createSprite(200,-50);
    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15);
    
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(100,500));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage(doorImage);
    climber.addImage(climberImage);
    
    door.velocityY = 2;
    climber.velocityY = 2;
    invisibleBlock.velocityY = 2;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    door.lifetime = 350;
    climber.lifetime = 350;
    invisibleBlock.lifetime = 350;
    
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    
   
    
    
  }
}

function draw(){
  if(gameState === "PLAY"){
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    
    ghost.velocityY += 0.8;
    
    if(keyDown("RIGHT_ARROW")){
      ghost.x += 5;
      
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x -= 5;
    }
    if(tower.y > 600){
      tower.y = 300;
    }
    spawnObstacles();
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
      
      gameState = "END";
    }
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
   drawSprites(); 
    
  }
  if(gameState === "END"){
    fill("black");
    textSize(30);
    text("Game Over",230,250);
    
  }
  
  
  
  
}
