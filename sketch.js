const PLAY = 1;
const END = 0;
var gameState = PLAY;
var destroyer;
var destroyerImage,groundImage;
var bulletsGroup;
var bulletImage;
var trashGroups;
var obstacle1Image,obstacle2Image;
var ground,backgroundImage;
var bulletsGroupImage,trashGroupsImage;
var score=0;
var gameOver,restart,gameOverImage,restartImage;
var pellet1,pellet2,pellet1Image,pellet2Image;
var pellet1Groups,pellet2Groups;
var powerTimer = 0;
var life = 3;
var flag = 0;
var startGame = 0;
var nameGame;

function preload()
{
  destroyerImage = loadImage("sprites/destroyer.png");
  backgroundImage = loadImage("sprites/space background.jpeg");
  obstacle1Image = loadImage("sprites/obstacle1.png");
  obstacle2Image = loadImage("sprites/obstacle2.png");
  bulletImage = loadImage("sprites/bullet1.png");
  gameOverImage = loadImage("sprites/game over.png");
  restartImage = loadImage("sprites/restart.png");
  pellet1Image = loadImage("sprites/powerPellet1.png");
  pellet2Image = loadImage("sprites/powerPellet2.png");


}
function setup() 
{
  createCanvas(displayWidth,displayHeight);

  ground = createSprite(displayWidth/2,displayHeight,displayWidth,25);
  destroyer = createSprite(200,displayHeight-40,40,40);
  destroyer.addImage(destroyerImage);
  destroyer.debug = true;
  
  
  
  bulletsGroup = new Group();
  trashGroups = new Group();

  pellet1Groups = new Group();
  pellet2Groups = new Group();
start();

}
function start()
{
  background(backgroundImage);
  nameGame = new gameName();
  nameGame.displayName();

}
function draw() 
{

  if(startGame === 1)
  {
  background(backgroundImage);
  nameGame.hideElements();
  textSize(20);
  fill("white");
  text("Score: "+ score, 1340,50);
  text("Life: " + life, 55,50);

  destroyer.scale = 0.3;
  destroyer.collide(ground);

  if(gameState === PLAY)
  {

    destroyer.x = mouseX;
    spawnTrash();
    powerPellets();
    createBullet(destroyer.x,destroyer.y);
    if(trashGroups.isTouching(destroyer))
    {
      reduceLife();
    }
    if(life===0)
    {
      gameOver = createSprite(800,450,30,30);
      gameOver.addImage(gameOverImage);
      gameState = END;
      restart = createSprite(800,570,40,40);
    restart.addImage(restartImage);
    restart.scale = 0.2;
      }
  }
  else if(gameState === END)
  {
    trashGroups.setVelocityYEach(0);
    trashGroups.setLifetimeEach(0);
    
      if(mousePressedOver(restart))
      {
        reset();
      }
  }
  
  
  drawSprites();
}
}
function spawnTrash()
{
  if(frameCount%80 === 0)
  {
  var trash = createSprite(random(10,displayWidth),0,25,25);
  trashGroups.add(trash);
  trash.velocityY = (4 + getFrameRate()/30) + trash.velocityY;
  console.log(trash.velocityY);
  console.log(getFrameRate());
  trash.scale = 0.3;
  var rand = Math.round(random(1,2));
  switch(rand)
  {
    case 1: trash.addImage(obstacle1Image);
      break;
    case 2: trash.addImage(obstacle2Image);
      break;
  }

  }


}

function createBullet(x,y)
  {
if(keyWentDown("space"))
{
  var bullet = createSprite(x,y,20,20);
  bulletsGroup.add(bullet);
  bullet.addImage(bulletImage);
  bullet.velocityY = -5;
  bullet.scale = 0.3;
}

  for(var i=0;i<bulletsGroup.length;i++)
  {
    for(var j=0;j<trashGroups.length;j++)
    {
      if(bulletsGroup.isTouching(trashGroups.get(j)))
      {
        trashGroups.get(j).destroy();
        bulletsGroup.get(i).destroy();
        score = score + 1;
      }
    }
  }

    }
  

  function reduceLife()
    {
      life = life-1;
      console.log(life);
      for(var i=0;i<trashGroups.length;i++ )
      {
        if(destroyer.isTouching(trashGroups.get(i)))
        {
          trashGroups.get(i).destroy();
         // console.log(trashGroups.get(i).y);
          //trashGroups.get(i).velocityY = 0;

        }
      }
    }

    function reset()
    {
      score = 0;
      life = 3;
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
    }

    function powerPellets()
    {
     if(frameCount % 307 === 0)
      {

      
      pellet1 = createSprite(random(10,displayWidth),150,20,20);
      pellet1.velocityY = 4;
      pellet1.shapeColor = "yellow";
      pellet1.addImage(pellet1Image);
      pellet1.scale = 0.1;
      pellet1Groups.add(pellet1);
      
      }
      for(var j=0;j<pellet1Groups.length;j++)
    {
      if(destroyer.isTouching(pellet1Groups.get(j)))
      {
          trashGroups.destroyEach();
          score = score+2;
      }
    }

      if(frameCount % 607 === 0)
      {
      pellet2 = createSprite(random(10,displayWidth),150,20,20);
      pellet2.velocityY = 4;
      pellet2.shapeColor = "orange";
      pellet2.addImage(pellet2Image);
      pellet2.scale = 0.1;
      pellet2Groups.add(pellet2);
      }

      for(var j=0;j<pellet2Groups.length;j++)
      {
        if(destroyer.isTouching(pellet2Groups.get(j)))
        {
            powerTimer = 30;
          
        }
      }
    

      if(powerTimer > 0)
      {
        if(keyDown("space"))
        {
        var bullet = createSprite(destroyer.x,destroyer.y,20,20);
        bulletsGroup.add(bullet);
        bullet.addImage(bulletImage);
        bullet.velocityY = -5;
        bullet.scale = 0.3;
        }
        powerTimer = powerTimer-1;
      }
    }

  
    