class LevelSetup {

  //levels
  TutorialLevel levelOne;
  FirstSteps levelTwo;
  ARampInDifficulty levelThree;
  MeteorShower levelFour;
  String levelOn;

  //based on level
  int highScore;

  //not based on level
  Boolean loseGame, winGame, paused;

  //hover variables
  int continueTextSize, tryAgainTextSize;
  Boolean overContinue, overTryAgain;

  //start Delay
  Boolean beginStartDelay;
  int startDelayStart;
  int tip;

  LevelSetup() {
    levelOne = new TutorialLevel();
    levelTwo = new FirstSteps();
    levelThree = new ARampInDifficulty();
    levelFour = new MeteorShower();

    levelOn = "zero";

    loseGame = false;
    winGame = false;
    paused = false;

    continueTextSize = 20;
    tryAgainTextSize = 25;
    overContinue = false;
    overTryAgain = false;

    beginStartDelay = false;
    tip = 0;
    startDelayStart = 0;
  }


  void commence(String levelPick) {
    levelOn = levelPick;

    switch(levelOn) {
      case "one":
        highScore = levelOneNormalHighScore;
        levelOne.commence();
        break;
      case "two":
        highScore = levelTwoNormalHighScore;
        levelTwo.commence();
        break;
      case "three":
        highScore = levelThreeNormalHighScore;
        levelThree.commence();
        break;
      case "four":
        highScore = levelFourNormalHighScore;
        levelFour.commence();
      default:
        break;
    }

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

    loseGame = false;
    winGame = false;
    paused = false;

    continueTextSize = 20;
    tryAgainTextSize = 20;
    overContinue = false;
    overTryAgain = false;

    beginStartDelay = true;
    startDelayStart = millis();
    tip = int(random(0, tips.length));
  }

  void run() {
    //keep setting the highscores
    switch(levelOn) {
      case "one":
        highScore = levelOneNormalHighScore;
        break;
      case "two":
        highScore = levelTwoNormalHighScore;
        break;
      case "three":
        highScore = levelThreeNormalHighScore;
        break;
      case "four":
        highScore = levelFourNormalHighScore;
      default:
        break;
    }
    if(!paused){
      //update frog
      if (!frog.gameOver && !beginStartDelay) {
        frog.update();
      }
      //run level
      switch(levelOn) {
        case "one":
          levelOne.run();
          break;
        case "two":
          levelTwo.run();
          break;
        case "three":
          levelThree.run();
          break;
        case "four":
          levelFour.run();
        default:
          break;
      }
    } else {
      switch(levelOn) {
        case "one":
          levelOne.pausedDisplay();
          break;
        case "two":
          levelTwo.pausedDisplay();
          break;
        case "three":
          levelThree.pausedDisplay();
          break;
        case "four":
          levelFour.pausedDisplay();
        default:
          break;
      }
    }

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
    text("HiScore: " + str(highScore), 400, 75);

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
      text("Time: " + str(frog.timeToShow) + " seconds", 300, 500);
      if (millis() - frog.showTimeBegan > 1500) {
        frog.showTime = false;
      }
    }

    //win game Screen
    if (winGame) {
      winGameScreen();
    } else if (loseGame) { // lose game screen
      loseGameScreen();
    } else if (paused) { //pause screen
      pauseScreen();
    }

    //pause button
    fill(200);
    stroke(255, 152, 0);
    ellipse(575, 25, 30, 30);
    image(pauseButton, 560, 10, 30, 30);

    //if gameOver
    if (frog.gameOver) {
      if (frog.lives <= 0) {
        loseGame = true;
      } else {
        winGame = true;
      }
    }
  }

  void winGameScreen() {

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
    text("HiScore: " + str(highScore), 300, 420);
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
  }

  void loseGameScreen() {
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
    text("HiScore: " + str(highScore), 300, 420);
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

  void pauseScreen() {

    fill(255, 244, 224);
    rect(150, 300, 300, 300, 10);
    fill(255);
    rect(160, 310, 280, 280, 10);
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Pause", 300, 350);
    textSize(15);
    fill(0);
    text("Score: " + str(frog.score), 300, 400);
    text("HiScore: " + str(highScore), 300, 420);
    textSize(continueTextSize);
    text("Unpause", 300, 475);
    //circular buttons
    fill(255);
    stroke(0);
    ellipse(250, 550, 50, 50);
    image(levelSelectIcon, 226, 526);
    ellipse(350, 550, 50, 50);
    image(mainScreenIcon, 325, 526);

    //hover over continue
    if (mouseX >= 248 && mouseX <= 352 && mouseY >= 468 && mouseY <= 488) {
      overContinue = true;
      continueTextSize = 25;
    } else {
      overContinue = false;
      continueTextSize = 20;
    }
  }
}
