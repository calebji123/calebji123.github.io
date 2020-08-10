LevelSetup levelSetup;
Frog frog;

//graphics
PImage settingsIcon;
PImage levelSelectIcon;
PImage mainScreenIcon;
PImage pauseButton;
PImage blueCar; // not used right now -- for future
PImage blueCarLeft;

//fonts
PFont font;


//page information
Boolean onMainScreen = true;
Boolean onLevelSelect = false;
Boolean onCredits = false;
Boolean onSettings = false;
Boolean onHelp = false;
Boolean partialMainScreen = false;
int level = 0;

//hover variables
int levelSelectTextSize = 30;
int helpTextSize = 30;
int creditsTextSize = 30;
int exitTextSize = 15;
Boolean overLevelSelect = false;
Boolean overHelp = false;
Boolean overCredits = false;
Boolean overExit = false;

//highScores
int levelOneNormalHighScore = 0;
int levelTwoNormalHighScore = 0;
int levelThreeNormalHighScore = 0;
int levelFourNormalHighScore = 0;

//controls
String up = "up";
String crouch = "down";
String left = "left";
String right = "right";
Strin pause = "p";

Boolean selectUp = false;
Boolean selectCrouch = false;
Boolean selectLeft = false;
Boolean selectRight = false;
Boolean selectPause = false;

//tips
String[] tips = {"You can change your controls in the settings menu", "Use momentum to carry you forward and make further jumps", "You must jump close to the goal in order to score", "Extra points are awarded when completing a set", "The faster you score, the more points you get", "Controls can only be changed to a certain number of options"} ;


void setup() {
  size(600, 800);
  background(255);
  //load classes & images
  levelSetup = new LevelSetup();
  frog = new Frog();
  settingsIcon = loadImage("SettingsIcon.png");
  levelSelectIcon = loadImage("LevelSelectIcon.png");
  mainScreenIcon = loadImage("MainScreenIcon.png");
  pauseButton = loadImage("pauseButton.png")
  blueCar = loadImage("BlueCar.png");
  blueCarLeft = loadImage("BlueCarLeft.png");
  //font = loadFont("Chalkboard.vlw"); //font doesn't work!!!!!!!!!!!!!!!!!!!!!!!!
}

void draw() {
  //textFont(font);
  background(255);
  fill(255);
  if (onMainScreen || partialMainScreen) {
    //main screen
    fill(0);
    textAlign(CENTER);
    textSize(80);
    text("FROGGER 2", 300, 500);
    textSize(levelSelectTextSize);
    text("Level Select", 300, 575);
    textSize(helpTextSize);
    text("How To Play", 300, 625);
    //textSize(creditsTextSize);
    //text("Credits", 300, 675);
    //logo
    stroke(0);
    fill(0,255,0);
    // ellipse(300, 250, 400, 400);
    rect()

    //settings icon
    image(settingsIcon, 555, 15);


    //high score icon
    fill(255);
    ellipse(570, 70, 30, 30);

    //version
    fill(0);
    textSize(10);
    text("Version: Pre Alpha", 60, 790);


    //hover
    if (mouseX >= 225 && mouseX <= 382 && mouseY >= 550 && mouseY <= 575) {
      overLevelSelect = true;
      levelSelectTextSize = 35;
    } else {
      overLevelSelect = false;
      levelSelectTextSize = 30;
    }
    if (mouseX >= 220 && mouseX <= 387 && mouseY >= 600 && mouseY <= 625) {
      overHelp = true;
      helpTextSize = 35;
    } else {
      overHelp = false;
      helpTextSize = 30;
    }
  }
  //level Select
  if (onLevelSelect) {
    noStroke();
    fill(255, 244, 224);
    rect(80, 100, 440, 600, 10);
    fill(255);
    rect(90, 160, 420, 530, 10);
    textAlign(CENTER, CENTER);
    //gray bar
    fill(200);
    rect(80, 100, 440, 50, 10);
    rect(80, 125, 440, 25);
    //title
    fill(0);
    textSize(20);
    text("Level Select", 300, 125);
    //exit
    //rect(472.5, 115, 35, 15);
    fill(255, 50, 0);
    textSize(exitTextSize);
    text("EXIT", 490, 120);
    //gamemode selector - might not do
    stroke(0);
    strokeWeight(1);
    //fill(255);
    //rect(268, 160, 62, 20, 7);
    //fill(0);
    //text("endless", 300, 168);

    //levels
    fill(255);
    //rect(105, 200, 130, 150);
    rect(120, 200, 100, 100, 15);
    fill(0);
    textSize(10);
    text("Level 1:", 170, 310);
    text("Tutorial", 170, 325);
    text("HiScore: " + str(levelOneNormalHighScore), 170, 340);
    //2
    fill(255);
    rect(250, 200, 100, 100, 15);
    fill(0);
    textSize(10);
    text("Level 2:", 300, 310);
    text("First Steps", 300, 325);
    text("HiScore: " + str(levelTwoNormalHighScore), 300, 340);
    //3
    fill(255);
    rect(380, 200, 100, 100, 15);
    fill(0);
    textSize(10);
    text("Level 3:", 430, 310);
    text("A Ramp in Difficulty", 430, 325);
    text("HiScore: " + str(levelThreeNormalHighScore), 430, 340);
    //4
    fill(255);
    rect(120, 360, 100, 100, 15);
    fill(0);
    textSize(10);
    text("Level 4:", 170, 470);
    text("Meteor Shower", 170, 485);
    text("HiScore: " + str(levelThreeNormalHighScore), 170, 500);
  }
  //on how to play screen
  if (onHelp) {
    noStroke();
    fill(255, 244, 224);
    rect(80, 100, 440, 600, 10);
    fill(255);
    rect(90, 160, 420, 530, 10);
    textAlign(CENTER, CENTER);
    //gray bar
    fill(200);
    rect(80, 100, 440, 50, 10);
    rect(80, 125, 440, 25);
    //title
    fill(0);
    textSize(20);
    text("How To Play", 300, 125);
    //exit
    //rect(472.5, 115, 35, 15);
    fill(255, 50, 0);
    textSize(exitTextSize);
    text("EXIT", 490, 120);
    //contents
    fill(0);
    textSize(15);
    text("Press '" + left + "' and '" + right + "' to move left and right", 300, 200);
    text("Press '" + up + "' to jump", 300, 220);
    text("Press '" + crouch + "' to crouch", 300, 240);
    text("Make your way up the level by jumping", 300, 280);
    text("on red platforms and brown logs", 300, 300);
    text("The goal is to get the frog to one of the five slots", 300, 320);
    text("Be careful of moving cars and running out of lives", 300, 340);
    text("Time is also an element too!", 300, 360);
    text("Try to survive as long as possible, and gain the most points", 300, 380);
  }
  //on credits
  if (onCredits) {
    noStroke();
    fill(255, 244, 224);
    rect(80, 100, 440, 600, 10);
    fill(255);
    rect(90, 160, 420, 530, 10);
    textAlign(CENTER, CENTER);
    //gray bar
    fill(200);
    rect(80, 100, 440, 50, 10);
    rect(80, 125, 440, 25);
    //title
    fill(0);
    textSize(20);
    text("Credits", 300, 125);
    //exit
    //rect(472.5, 115, 35, 15);
    fill(255, 50, 0);
    textSize(exitTextSize);
    text("EXIT", 490, 120);
    //content
    fill(0);
    text("Ur mom gae", 300, 200);
  }

  if (onSettings) {
    noStroke();
    fill(255, 244, 224);
    rect(80, 100, 440, 600, 10);
    fill(255);
    rect(90, 160, 420, 530, 10);
    textAlign(CENTER, CENTER);
    //gray bar
    fill(200);
    rect(80, 100, 440, 50, 10);
    rect(80, 125, 440, 25);
    //title
    fill(0);
    textSize(20);
    text("Settings", 300, 125);
    //exit button
    fill(255, 50, 0);
    textSize(exitTextSize);
    text("EXIT", 490, 120);
    //contents
    //controls
    fill(0);
    textSize(18);
    text("Controls:", 300, 200);
    textAlign(LEFT, CENTER);
    textSize(15);
    text("Move Left:", 150, 250);
    text("Move Right:", 150, 275);
    text("Jump:", 150, 300);
    text("Crouch:", 150, 325);
    text("Pause:", 150, 350);
    //buttons to the side to change controls
    fill(255);
    stroke(0);
    rect(375, 240, 75, 20, 20);
    rect(375, 265, 75, 20, 20);
    rect(375, 290, 75, 20, 20);
    rect(375, 315, 75, 20, 20);
    rect(375, 340, 75, 20, 20);
    textAlign(CENTER, CENTER);
    fill(0);
    text(left, 412.5, 250);
    text(right, 412.5, 275);
    text(up, 412.5, 300);
    text(crouch, 412.5, 325);
    text(pause, 412.5, 350);
    //triangles that appear when selected
    if (selectLeft) {
      fill(255);
      beginShape();
      vertex(385, 245);
      vertex(390, 250);
      vertex(385, 255);
      endShape();
      beginShape();
      vertex(440, 245);
      vertex(435, 250);
      vertex(440, 255);
      endShape();
    }
    if (selectRight) {
      fill(255);
      beginShape();
      vertex(385, 270);
      vertex(390, 275);
      vertex(385, 280);
      endShape();
      beginShape();
      vertex(440, 270);
      vertex(435, 275);
      vertex(440, 280);
      endShape();
    }
    if (selectUp) {
      fill(255);
      beginShape();
      vertex(385, 295);
      vertex(390, 300);
      vertex(385, 305);
      endShape();
      beginShape();
      vertex(440, 295);
      vertex(435, 300);
      vertex(440, 305);
      endShape();
    }
    if (selectCrouch) {
      fill(255);
      beginShape();
      vertex(385, 320);
      vertex(390, 325);
      vertex(385, 330);
      endShape();
      beginShape();
      vertex(440, 320);
      vertex(435, 325);
      vertex(440, 330);
      endShape();
    }
    if (selectPause) {
      fill(255);
      beginShape();
      vertex(385, 345);
      vertex(390, 350);
      vertex(385, 355);
      endShape();
      beginShape();
      vertex(440, 345);
      vertex(435, 350);
      vertex(440, 355);
      endShape();
    }
  }
  //exit button hover
  if (mouseX >= 472.5 && mouseX <= 507.5 && mouseY >= 115 && mouseY <= 130) {
    overExit = true;
    exitTextSize = 17;
  } else {
    overExit = false;
    exitTextSize = 15;
  }



  //running levels
  if (level >= 1 && !onMainScreen ) {
    levelSetup.run();
  }
}

void mousePressed() {
  //clicking menu items
  if (overLevelSelect) {
    onLevelSelect = true;
    onMainScreen = false;
    overLevelSelect = false;
    partialMainScreen = true;
  }
  if (overHelp) {
    onHelp = true;
    onMainScreen = false;
    overHelp = false;
    partialMainScreen = true;
  }
  //credits currently not available
  if (overCredits) {
    onCredits = true;
    onMainScreen = false;
    overCredits = false;
    partialMainScreen = true;
  }

  //main menu or partial menu 
  if (onMainScreen || partialMainScreen) {
    if (dist(mouseX, mouseY, 570, 30) <= 27) {
      onSettings = true;
      partialMainScreen = true;
      onMainScreen = false;
      onCredits = false;
      onLevelSelect = false;
    }
  }

  //in level select
  if (onLevelSelect) {
    //exit button
    if (overExit) {
      onMainScreen = true;
      onLevelSelect = false;
      partialMainScreen = false;
    }
    //levels
    if (mouseX >= 120 && mouseX <= 220 && mouseY >= 200 && mouseY <=300) {
      onLevelSelect = false;
      partialMainScreen = false;
      level = 1;
      levelSetup.commence("one");
    }
    if (mouseX >= 250 && mouseX <= 350 && mouseY >= 200 && mouseY <=300) {
      onLevelSelect = false;
      partialMainScreen = false;
      level = 2;
      levelSetup.commence("two");
    }
    if (mouseX >= 380 && mouseX <= 480 && mouseY >= 200 && mouseY <=300) {
      onLevelSelect = false;
      partialMainScreen = false;
      level = 3;
      levelSetup.commence("three");
    }
    if (mouseX >= 120 && mouseX <= 220 && mouseY >= 360 && mouseY <=460) {
      onLevelSelect = false;
      partialMainScreen = false;
      level = 4;
      levelSetup.commence("four");
    }
  }
  //in how to play
  if (onHelp) {
    //exit button
    if (mouseX >= 472.5 && mouseX <= 507.5 && mouseY >= 115 && mouseY <= 130) {
      onMainScreen = true;
      onHelp = false;
      partialMainScreen = false;
    }
  }
  //in credits
  if (onCredits) {
    //exit button
    if (mouseX >= 472.5 && mouseX <= 507.5 && mouseY >= 115 && mouseY <= 130) {
      onMainScreen = true;
      onCredits = false;
      partialMainScreen = false;
    }
  }
  //in settings
  if (onSettings) {
    //exit button
    if (mouseX >= 472.5 && mouseX <= 507.5 && mouseY >= 115 && mouseY <= 130) {
      onMainScreen = true;
      onSettings = false;
      partialMainScreen = false;
      selectLeft = false;
      selectRight = false;
      selectUp = false;
      selectCrouch = false;
      selectPause = false;
    }
    //change selected button for changing controls
    if (mouseX >= 375 && mouseX <= 450 && mouseY >= 240 && mouseY <= 260) {
      if (!selectLeft) {
        selectLeft = true;
        selectRight = false;
        selectUp = false;
        selectCrouch = false;
        selectPause = false;
      } else {
        selectLeft = false;
      }
    }
    if (mouseX >= 375 && mouseX <= 450 && mouseY >= 265 && mouseY <= 285) {
      if (!selectRight) {
        selectRight = true;
        selectLeft = false;
        selectUp = false;
        selectCrouch = false;
        selectPause = false;
      } else {
        selectRight = false;
      }
    }
    if (mouseX >= 375 && mouseX <= 450 && mouseY >= 290 && mouseY <= 315) {
      if (!selectUp) {
        selectUp = true;
        selectRight = false;
        selectLeft = false;
        selectCrouch = false;
        selectPause = false;
      } else {
        selectUp = false;
      }
    }
    if (mouseX >= 375 && mouseX <= 450 && mouseY >= 315 && mouseY <= 340) {
      if (!selectCrouch) {
        selectCrouch = true;
        selectRight = false;
        selectUp = false;
        selectLeft = false;
        selectPause = false;
      } else {
        selectCrouch = false;
      }
    }
    if (mouseX >= 375 && mouseX <= 450 && mouseY >= 340 && mouseY <= 365) {
      if (!selectPause) {
        selectPause = true;
        selectRight = false;
        selectUp = false;
        selectLeft = false;
        selectCrouch = false;
      } else {
        selectPause = false;
      }
    }
  }

  // in levels 
  if (level > 0) {
    //pause
    if (dist(mouseX, mouseY, 575, 25) <= 30 && !levelSetup.beginStartDelay) {
      if(levelSetup.paused){
        levelSetup.paused = false;
      } else{
        levelSetup.paused = true;
      }
      
    } 
    if (level >= 1) {
      //when game over (win or lose) in the menu that pops up
      if (frog.gameOver) {
        //continue & try again buttons for all levels
        if (levelSetup.overContinue) {
          frog.reset();
          frog.gameOver = false;
          levelSetup.winGame = false;
          frog.freePlayMode = true;
          levelSetup.overContinue = false;
        } 
        if (levelSetup.overTryAgain) {
          levelSetup.commence(levelSetup.levelOn);
          levelSetup.overTryAgain = false;
        }

        //menu and level select buttons, ones with icons
        if (dist(mouseX, mouseY, 250, 550)<= 50) {
          level = 0;
          onLevelSelect = true;
          partialMainScreen = true;
        }
        if (dist(mouseX, mouseY, 350, 550) <= 50) {
          level = 0;
          onMainScreen = true;
        }
      } else if (levelSetup.paused) {
        //paused
        if(levelSetup.overContinue){
          levelSetup.paused = false;
          levelSetup.overContinue = false;
        }
        //menu and level select buttons, ones with icons
        if (dist(mouseX, mouseY, 250, 550)<= 50) {
          level = 0;
          onLevelSelect = true;
          partialMainScreen = true;
        }
        if (dist(mouseX, mouseY, 350, 550) <= 50) {
          level = 0;
          onMainScreen = true;
        }
      }
    }
  }
}


void keyPressed () {
  //move frog
  if (level >= 1) {
    // for different types of controls possible
    if (((key == 'a' || key == 'A') && left == "a") || (keyCode == LEFT && left == "left") || ((key == 'j' || key == 'J') && left == "j")) { 
      frog.left = true;
    }
    if (((key == 'd' || key == 'D' ) && right == "d") || (keyCode == RIGHT  && right == "right") || ((key == 'l' || key == 'L') && left == "l") ) {
      frog.right = true;
    }
    if ((key == ' ' && up == "space") || ((key == 'w' || key == 'W') && up == "w") || (keyCode == UP && up == "up") || ((key == 'i' || key == 'I') && left == "i") ) {
      if (!frog.haveJumped) {
        frog.jump = true;
        frog.haveJumped = true;
      }
    } 
    if (((key == 's' || key == 'S') && crouch == "s") || (keyCode == SHIFT && crouch == "shift") || (keyCode == DOWN && crouch == "down") || ((key == 'k' || key == 'K') && left == "k")) {
      if (!frog.haveCrouched) {
        frog.crouch = true;
        frog.haveCrouched = true;
        frog.initiateCrouch();
      }
    }
    if (((key == 'p' || key == 'P') && pause == "p") || (key == ' ' && pause == "space")) {
      if(levelSetup.paused){
        levelSetup.paused = false; 
      } else{
        levelSetup.paused = true;
      }
      
    }
  }

  //change controls
  if (onSettings) {
    if (selectLeft) {
      if (key == 'a') {
        left = "a";
      } else if (keyCode == LEFT) {
        left = "left";
      } else if (key == 'j') {
        left = "j";
      }
    } else if (selectRight) {
      if (key == 'd') {
        right = "d";
      } else if (keyCode == RIGHT) {
        right = "right";
      } else if (key == 'l') {
        right = "l";
      }
    } else if (selectUp) {
      if (key == 'w') {
        up = "w";
      } else if (keyCode == UP) {
        up = "up";
      } else if (key == ' ') {
        up = "space";
      } else if (key == 'i') {
        right = "i";
      }
    } else if (selectCrouch) {
      if (key == 's') {
        crouch = "s";
      } else if (keyCode == DOWN) {
        crouch = "down";
      } else if (keyCode == SHIFT) {
        crouch = "shift";
      } else if (key == 'k') {
        right = "k";
      }
    } else if (selectPause) {
      if(key == 'p') {
        pause = "p";
      } else if (key == ' '){
        pause = "space";
      }
    }
  }
}

//stop moving when released
void keyReleased() {
  if (level >= 1) {

    // for different types of controls possible

    if (((key == 'a' || key == 'A') && left == "a") || (keyCode == LEFT && left == "left") || ((key == 'j' || key == 'J') && left == "j")) { 
      frog.left = false;
    }
    if (((key == 'd' || key == 'D' ) && right == "d") || (keyCode == RIGHT  && right == "right") || ((key == 'l' || key == 'L') && left == "l") ) {
      frog.right = false;
    }
    if ((key == ' ' && up == "space") || ((key == 'w' || key == 'W') && up == "w") || (keyCode == UP && up == "up") || ((key == 'i' || key == 'I') && left == "i") ) {
        frog.jump = false;
        frog.haveJumped = false;
    } 
    if (((key == 's' || key == 'S') && crouch == "s") || (keyCode == SHIFT && crouch == "shift") || (keyCode == DOWN && crouch == "down") || ((key == 'k' || key == 'K') && left == "k")) {
      if (frog.crouch) {
        frog.unCrouch();
        frog.crouch = false;
        frog.haveCrouched = false;
      }
        
    }
  }
}
