

class LevelThree {

  Platform[] p;
  Car[] cOne;
  Car[] cTwo;
  Car[] cThree;
  Car[] cFour;
  Car[] cFive;
  Log[] lOne;

  float[] timer, wait;
  Boolean loseGame, winGame;

  //hover variables
  int continueTextSize, tryAgainTextSize;
  Boolean overContinue, overTryAgain;
  
  //start Delay
  Boolean beginStartDelay;
  int startDelayStart;
  int tip;


  LevelThree () {
    p = new Platform[48];
    p[0] = new Platform(390, 730, 10);
    p[1] = new Platform(470, 730, 30);
    p[2] = new Platform(50, 720, 20);
    p[3] = new Platform(130, 720, 20);
    p[4] = new Platform(350, 720, 10);
    p[5] = new Platform(50, 680, 10);
    p[6] = new Platform(210, 680,20);
    p[7] = new Platform(120, 660, 20);
    p[8] = new Platform(330, 660,20);
    p[9] = new Platform(410, 660, 20);
    p[10] = new Platform(190, 650,10);
    p[11] = new Platform(270, 640, 10);
    p[12] = new Platform(520, 620, 10);
    p[13] = new Platform(110, 600, 10);
    p[14] = new Platform(180, 600, 30);
    p[15] = new Platform(460, 600, 50);
    p[16] = new Platform(290, 590, 10);
    p[17] = new Platform(50, 580, 10);
    p[18] = new Platform(350, 570, 20);
    p[19] = new Platform(450, 550, 10);
    p[20] = new Platform(520, 550, 10);
    p[21] = new Platform(140, 530, 39);
    p[22] = new Platform(220, 530, 20);
    p[23] = new Platform(80, 510, 20);
    p[24] = new Platform(320, 510, 40);
    p[25] = new Platform(430, 490, 10);
    p[26] = new Platform(220, 470, 10);
    p[27] = new Platform(370, 470, 10);
    p[28] = new Platform(120, 460, 10);
    p[29] = new Platform(150, 460, 20);
    p[30] = new Platform(480, 460, 20);
    p[31] = new Platform(50, 440, 10);
    p[32] = new Platform(280, 430, 30);
    p[33] = new Platform(410, 430, 10);
    p[34] = new Platform(540, 420, 10);
    p[35] = new Platform(190, 400, 10);
    p[36] = new Platform(90, 390, 10);
    p[37] = new Platform(300, 390, 20);
    p[38] = new Platform(460, 370, 40);
    p[39] = new Platform(220, 360, 10);
    p[40] = new Platform(360, 360, 40);
    p[41] = new Platform(100, 350, 50);
    p[42] = new Platform(310, 330, 10);
    p[43] = new Platform(210, 310, 20);
    p[44] = new Platform(500, 310, 10);
    p[45] = new Platform(150, 280, 10);
    p[46] = new Platform(260, 280, 10);
    p[47] = new Platform(400, 280, 20);
    

    cOne = new Car[6];
    for (int i = 0; i < 6; i ++) {
      cOne[i] = new Car(665, "truck", true);
    }
    cTwo = new Car[6];
    for (int i = 0; i < 6; i ++) {
      cTwo[i] = new Car(595, "bulldozer", false);
    }
    cThree = new Car[6];
    for (int i = 0; i < 6; i ++) {
      cThree[i] = new Car(505, "mini", false);
    }
    cFour = new Car[6];
    for (int i = 0; i < 6; i ++) {
      cFour[i] = new Car(455, "racecar", true);
    }
    cFive = new Car[6];
    for (int i = 0; i < 6; i ++) {
      cFive[i] = new Car(355, "suv", false);
    }
    lOne = new Log[7];
    for (int i = 0; i < 7; i ++) {
      lOne[i] = new Log(220, "long", false);
    }



    timer = new float[5];
    for (int i = 0; i < 5; i ++) {
      timer[i] = 0;
    }
    wait = new float[5];
    for (int i = 0; i < 5; i ++) {
      wait[i] = 0;
    }

    loseGame = false;
    winGame = false;

    continueTextSize = 20;
    tryAgainTextSize = 25;
    overContinue = false;
    overTryAgain = false;
    
    beginStartDelay = false;
    tip = 0;
    startDelayStart = 0;
  }

  void run() {
    
    //frog update
    if (!frog.gameOver && !beginStartDelay) {
      frog.update();
    }
    //collisions with side walls
    frog.collisions("routine");
    //collisions with platforms
    int bottomAmount = 0;
    for (int i = 0; i < p.length; i ++) {
      p[i].display();
      objectCollisionsPlatform(frog, p[i]);
      if (frog.collisionSide == "bottom") {
        bottomAmount += 1;
      }
    }
    if (bottomAmount > 0 ) {
      frog.collisionSide = "bottom";
    }
    frog.collisions("platform");

    //cars
    //carlane 1a
    doCar(cOne, 1, 120, 250);

    //carlane 2
    doCar(cTwo, 2, 120, 250);

    //carlane 3
    doCar(cThree, 3, 75, 150);

    //carLane 4
    doCar(cFour, 4, 80, 200);
    
    //carLane 5
    doCar(cFive, 5, 100, 200);

    //log lane 1
    if (timer[4] > wait[4]) {
      for (int i = 0; i < lOne.length; i ++) {
        if (!lOne[i].isMove) {
          lOne[i].initiate();
          timer[4] = 0;
          wait[4] = random(70, 150);
          break;
        }
      }
    }
    timer[4] ++;
    int bottomsAmount = 0;
    for (int i = 0; i < lOne.length; i ++) {
      lOne[i].move();
      lOne[i].display();
      objectCollisionsLog(frog, lOne[i]);
      if (frog.collisionSide == "bottom" && !frog.onLog ) {
        bottomsAmount +=1;
        frog.logSpeed =-1 *lOne[i].speed;
      }
    } 
    if (bottomsAmount >0) {
      frog.collisionSide = "bottom";
    }
    frog.collisions("log");

    //end goal
    fill(143, 59, 27);
    noStroke();
    beginShape();
    vertex(50, 100);
    for (int i = 0; i <= 5; i ++) {
      vertex(50 + (i * 90), 155);
      vertex(100+ (i * 90), 155);
      vertex(100+ (i * 90), 125);
      vertex(140+ (i * 90), 125);
      vertex(140 + (i * 90), 155);
    }
    vertex(550, 155);
    vertex(550, 100);
    endShape();
    fill(0, 255, 0);
    for (int i = 0; i < 5; i ++) {
      if (frog.filled[i]) {
        rect(104 + 90 * i, 129, 32, 22);
      }
    }
    noStroke();
    frog.display();
    
    //startDelay
    if(beginStartDelay){
      int millisNow = millis();
      if(millisNow - startDelayStart < 3000){
        fill(255);
        rect(50, 100, 500, 700);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(30);
        text("Loading...", 300, 400);
        textSize(15);
        text("Tip: " + tips[tip], 300, 500);
      } else{
        beginStartDelay = false;
      }
    }
    

    //win game Screen
    if (winGame) {
      
      fill(255, 244, 224);
      rect(150, 300, 300, 300, 10);
      fill(255);
      rect(160, 310, 280,280, 10);
      fill(0,255,0);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("You Win!", 300, 350);
      textSize(15);
      fill(0);
      text("Score: " + str(frog.score), 300, 400);
      text("HiScore: " + str(levelThreeNormalHighScore), 300, 420);
      textSize(continueTextSize);
      text("Continue to FreePlay", 300, 475);
      fill(255);
      stroke(0);
      ellipse(250, 550, 50, 50);
      image(levelSelectIcon, 226, 526);
      ellipse(350, 550, 50, 50);
      image(mainScreenIcon, 325, 526);
      

      if (mouseX >= 200 && mouseX <= 400 && mouseY >= 468 && mouseY <= 488) {
        overContinue = true;
        continueTextSize = 25;
      } else {
        overContinue = false;
        continueTextSize = 20;
      }
      
    } else if (loseGame) {
      fill(255, 244, 224);
      rect(150, 300, 300, 300, 10);
      fill(255);
      rect(160, 310, 280,280, 10);
      fill(255, 0,0);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("You Lose :(", 300, 350);
      textSize(15);
      fill(0);
      text("Score: " + str(frog.score), 300, 400);
      text("HiScore: " + str(levelThreeNormalHighScore), 300, 420);
      textSize(tryAgainTextSize);
      text("Try Again", 300, 475);
      fill(255);
      stroke(0);
      ellipse(250, 550, 50, 50);
      image(levelSelectIcon, 226, 526);
      ellipse(350, 550, 50, 50);
      image(mainScreenIcon, 325, 526);
      
      if (mouseX >=243 && mouseX <= 357 && mouseY >= 468 && mouseY <= 488) {
        overTryAgain = true;
        tryAgainTextSize = 30;
      } else {
        overTryAgain = false;
        tryAgainTextSize = 25;
      }
    }

    //borders
    noStroke();
    fill(200);
    rect(0, 0, 50, 800);
    rect(550, 0, 50, 800);
    fill(143, 59, 27);
    rect(50, 780, 500, 20);

    //top info board
    textAlign(CENTER);
    textSize(15);
    fill(0);
    rect(50, 0, 500, 100); 
    fill(255, 255, 0);
    text("Lives: " + str(frog.lives), 150, 25);
    text("Time: ", 300, 25);
    text("Score: " + str(frog.score), 150, 75);
    text("HiScore: " + str(levelThreeNormalHighScore), 400, 75);

    //timer
    stroke(255, 255, 0);
    fill(0);
    //rect(330, 10, 200, 20);
    fill(0, 255, 0);
    if (frog.timeState == "yellow") {
      fill(255, 215, 0);
    } else if (frog.timeState == "red") {
      fill(255, 0, 0);
    }
    rect(330, 10, frog.timeLeft/frog.timeStart * 200, 20);
    noStroke();

    //time text that pops up when you score
    if (frog.showTime) {
      textSize(20);
      fill(0);
      textAlign(CENTER, CENTER);
      text("Time: " + str(frog.timeToShow), 300, 500);
      if (millis() - frog.showTimeBegan > 1500) {
        frog.showTime = false;
      }
    }

    //exit button
    fill(255, 50, 0);
    textSize(15);
    text("EXIT", 575, 25);

    //if gameOver
    if (frog.gameOver) {
      if (frog.lives <= 0) {
        loseGame = true;
      } else {
        winGame = true;
      }
    }
  }

  void commence() {
    frog.reset();
    frog.lives = 6;
    frog.score = 0;
    frog.gameOver = false;
    frog.freePlayMode = false;
    for (int i = 0; i < 5; i++){
      frog.filled[i] = false;
    }
    for (int i = 0; i < cOne.length; i++) {
      cOne[i].reset();
    }
    for (int i = 0; i < cTwo.length; i++) {
      cTwo[i].reset();
    }
    for (int i = 0; i < cThree.length; i++) {
      cThree[i].reset();
    }
    for (int i = 0; i < cFour.length; i++) {
      cFour[i].reset();
    }
    for (int i = 0; i < lOne.length; i++) {
      lOne[i].reset();
    }
    
    timer = new float[5];
    for (int i = 0; i < 5; i ++) {
      timer[i] = 0;
    }
    wait = new float[5];
    for (int i = 0; i < 5; i ++) {
      wait[i] = 0;
    }
    
    loseGame = false;
    winGame = false;

    continueTextSize = 20;
    tryAgainTextSize = 20;
    overContinue = false;
    overTryAgain = false;
    
    beginStartDelay = true;
    startDelayStart = millis();
     tip = int(random(0, tips.length));
  }

  void doCar(Car[] carList, int place, int ranStart, int ranEnd) {
    if (timer[place-1] > wait[place-1]) {
      for (int i = 0; i < carList.length; i ++) {
        if (!carList[i].isMove) {
          carList[i].initiate();
          timer[place-1] = 0;
          wait[place-1] = random(ranStart, ranEnd);
          break;
        }
      }
    }
    timer[place-1] ++;

    for (int i = 0; i < carList.length; i ++) {
      carList[i].move();
      carList[i].display();
      objectCollisionsCar(frog, carList[i]);
      frog.collisions("car");
    }
  }
}
