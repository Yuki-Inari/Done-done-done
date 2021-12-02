var bg,bgimg
var shooter,shooterImg,shootershooting
var zombie,zombieImg
var zombieGroup
var heart1,heart2,heart3
var heart1Img,heart2Img,heart3Img
var bullets,bullet
bullets = 70
var bulletsGroup
var gameState = "fight"
var life = 3
var score = 0

function preload() {
  bgimg = loadImage("./assets/bg.jpeg")
  shooterImg = loadImage("./assets/shooter_2.png")
  shootershooting = loadImage("./assets/shooter_3.png")
  zombieImg = loadImage("./assets/zombie.png")
  heart1Img = loadImage("./assets/heart_1.png")
  heart2Img = loadImage("./assets/heart_2.png")
  heart3Img = loadImage("./assets/heart_3.png")
} 

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgimg)
  bg.scale = 1.1

  shooter = createSprite(displayWidth-1150,displayHeight-300,50,50)
  shooter.addImage(shooterImg)
  shooter.scale = 0.3
  shooter.setCollider("rectangle",0,0,300,300)
  zombieGroup=new Group()
  bulletsGroup = new Group()

  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.addImage("heart1",heart1Img)
  heart1.visible = false
  heart1.scale=0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.addImage("heart2",heart2Img)
  heart2.visible = false
  heart2.scale=0.4

  heart3 = createSprite(displayWidth-200,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale=0.4
}

function draw() {
  background(255,255,255);  
  if(gameState === "fight"){

  if(life === 3){
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
  }
  else if(life === 2){
    heart3.visible = false
    heart2.visible = true
    heart1.visible = false
  }
  else if(life === 1){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = true
  }
  if(life === 0){
    gameState = "lost"
  }
  if(score === 100){
    gameState = "won"
  }

  if(keyDown("UP_ARROW")&&shooter.y>100){
    shooter.y= shooter.y-30
  }
  if(keyDown("DOWN_ARROW")&&shooter.y<displayHeight){
    shooter.y= shooter.y+30
  }
  if(keyWentDown("space")){
    bullet = createSprite(displayWidth-1050,shooter.y-30,20,10)
    bullet.velocityX = 20
    bulletsGroup.add(bullet)
    shooter.depth = bullet.depth
    shooter.depth = shooter.depth+2
    bullets = bullets-1
    shooter.addImage(shootershooting)
  }
  if(bullets===0){
    gameState = "bullet"
  }
  if(keyWentUp("space")){
    shooter.addImage(shooterImg) 
  }
  if(zombieGroup.isTouching(shooter)){
    for(var i=0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(shooter)){
        zombieGroup[i].destroy()
        life = life-1
      }
    }
  }
  if(zombieGroup.isTouching(bulletsGroup)){
    for(var i = 0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletsGroup) ){
        zombieGroup[i].destroy()
        bulletsGroup.destroyEach()
        score = score+2
      }
    }
  }
  enemy()
}
drawSprites();

if(gameState === "bullet"){
  textSize(50)
  fill("yellow")
  text("you ran out of bullets!",470,410)
  zombieGroup.destroyEach()
  shooter.destroy()
  bulletsGroup.destroyEach()
}
else if(gameState === "won"){
  textSize(100)
  fill("yellow")
  text("YoU WoN",400,400)
  zombieGroup.destroyEach()
  shooter.destroy()
  bulletsGroup.destroyEach()
}
else if(gameState === "lost"){
  textSize(100)
  fill("red")
  text("YoU LoST",400,400)
  zombieGroup.destroyEach()
  shooter.destroy()
  bulletsGroup.destroyEach()
}
  textSize(20)
  fill("white")
  text("Bullets = "+bullets,displayWidth-210,displayHeight/2-250)
  text("Score = "+score,displayWidth-200,displayHeight/2-220)
  text("Life = "+life,displayWidth-200,displayHeight/2-280)


}

function enemy(){
  if(frameCount%100===0){
    zombie=createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.scale=0.15
    zombie.velocityX=-3
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime=400
     zombieGroup.add(zombie)
  }
}