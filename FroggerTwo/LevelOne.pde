

class LevelOne {

  Platform[] p;
  Car[] cOne;
  Car[] cTwo;
  Car[] cThree;

  float[] timer, wait;
  Boolean loseGame, winGame;

  //hover variables
  int continueTextSize, tryAgainTextSize;
  Boolean overContinue, overTryAgain;

  //start Delay
  Boolean beginStartDelay;
  int startDelayStart;
  int tip;


  LevelOne () {
    //initiation
    p = new Platform[16];
    p[0] = new Platform(60, 710, 180);
    p[1] = new Platform(400, 710, 120);
    p[2] = new Platform(110, 650, 40);
    p[3] = new Platform(290, 640, 70);
    p[4] = new Platform(440, 600, 70);
    p[5] = new Platform(110, 570, 90);
    p[6] = new Platform(370, 530, 80);
    p[7] = new Platform(210, 500, 90);
    p[8] = new Platform(520, 480, 30);
    p[9] = new Platform(410, 430, 70);
    p[10] = new Platform(90, 420, 80);
    p[11] = new Platform(250, 360, 80);
    p[12] = new Platform(480, 350, 70);
    p[13] = new Platform(110, 300, 80);
    p[14] = new Platform(420, 270, 90);
    p[15] = new Platform(100, 220, 400);

    cOne = new Car[4];
    for (int i = 0; i < 4; i ++) {
      cOne[i] = new Car(585, "suv", true);
    }
    cTwo = new Car[4];
    for (int i = 0; i < 4; i ++) {
      cTwo[i] = new Car(465, "racecar", false);
    }
    cThree = new Car[4];
    for (int i = 0; i < 4; i ++) {
      cThree[i] = new Car(285, "racecar", true);
    }

    timer = new float[3];
    for (int i = 0; i < 3; i ++) {
      timer[i] = 0;
    }
    wait = new float[3];
    for (int i = 0; i < 3; i ++) {
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
    //carlane 1
    doCar(cOne, 1, 120, 250);

    //carlane 2
    doCar(cTwo, 2, 120, 250);

    //carlane 3
    doCar(cThree, 3, 80, 200);


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
    //fil in with frog
    for (int i = 0; i < 5; i ++) {
      if (frog.filled[i]) {
        rect(104 + 90 * i, 129, 32, 22);
      }
    }
    noStroke();
    frog.display();

    //startDelay / loading screen
    if (beginStartDelay) {
      int millisNow = millis();
      if (millisNow - startDelayStart < 3000) {
        fill(255);
        rect(50, 100, 500, 700);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(30);
        text("Loading...", 300, 400);
        textSize(15);
        text("Tip: " + tips[tip], 300, 500);
      } else {
        beginStartDelay = false;
      }
    }


    //win game Screen
    if (winGame) {

      fill(255, 244, 224);
      rect(150, 300, 300, 300, 10);
      fill(255);
      rect(160, 310, 280, 280, 10);
      fill(0, 255, 0);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("You Win!", 300, 350);
      textSize(15);
      fill(0);
      text("Score: " + str(frog.score), 300, 400);
      text("HiScore: " + str(levelOneNormalHighScore), 300, 420);
      textSize(continueTextSize);
      text("Continue to FreePlay", 300, 475);
      //circular buttons
      fill(255);
      stroke(0);
      ellipse(250, 550, 50, 50);
      image(levelSelectIcon, 226, 526);
      ellipse(350, 550, 50, 50);
      image(mainScreenIcon, 325, 526);

    //hover over continue
      if (mouseX >= 200 && mouseX <= 400 && mouseY >= 468 && mouseY <= 488) {
        overContinue = true;
        continueTextSize = 25;
      } else {
        overContinue = false;
        continueTextSize = 20;
      }
    } else if (loseGame) { // lose game screen
      fill(255, 244, 224);
      rect(150, 300, 300, 300, 10);
      fill(255);
      rect(160, 310, 280, 280, 10);
      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("You Lose :(", 300, 350);
      textSize(15);
      fill(0);
      text("Score: " + str(frog.score), 300, 400);
      text("HiScore: " + str(levelOneNormalHighScore), 300, 420);
      textSize(tryAgainTextSize);
      text("Try Again", 300, 475);
      //circular buttons
      fill(255);
      stroke(0);
      ellipse(250, 550, 50, 50);
      image(levelSelectIcon, 226, 526);
      ellipse(350, 550, 50, 50);
      image(mainScreenIcon, 325, 526);

      //hover over try again
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
    text("HiScore: " + str(levelOneNormalHighScore), 400, 75);

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

  void commence() { // for initiating level, only when clicking in level select, or trying again
    //reset frog variables, and others that are not covered in normal reset
    frog.reset();
    frog.lives = 6;
    frog.score = 0;
    frog.gameOver = false;
    frog.freePlayMode = false;
    for (int i = 0; i < 5; i++) {
      frog.filled[i] = false;
      //frog.filled[i] = true;
      //if(i == 2){
      //  frog.filled[i] = false;
      //}
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

//for reducing repetition in car processing. 
  void doCar(Car[] carList, int place, int ranStart, int ranEnd) {
    //moves car if initiated. wait to provide random car sending
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
    //checks collision
    for (int i = 0; i < carList.length; i ++) {
      carList[i].move();
      carList[i].display();
      objectCollisionsCar(frog, carList[i]);
      frog.collisions("car");
    }
  }
}
