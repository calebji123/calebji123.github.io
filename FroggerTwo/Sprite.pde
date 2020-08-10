
class Frog {
  //variables to determine position & speed variables
  float w, h, x, y, vx, vy, accelarationX, accelarationY, speedLimit, friction, gravity, logSpeed;
  //for movement and state booleans
  Boolean left, right, jump, crouch, onGround, onPlatform, hitCar, onLog, facingRight, haveJumped, haveCrouched, largeJump;
  float crouchBegin;
  //for platforms and logs
  String collisionSide;
  //other variables that contain info about the stage it is in
  int lives, score;
  float timeLeft, timeStart;
  int millisStart;
  String timeState;
  Boolean[] filled;
  Boolean showTime;
  float timeToShow, showTimeBegan;
  Boolean deathAnimation, gameOver, freePlayMode;
  float deathAnimationTimer;

  Frog () {
    w = 40;
    h = 30;
    x = 300;
    y = 780 - h;

    vx = 0;
    vy = 0;

    accelarationX = 0;
    accelarationY = 0;
    speedLimit = 4;
    //speedLimit = 6;
    friction = 1;
    gravity = 0.75;
    logSpeed = 0;

    left = false;
    right = false;
    jump = false;
    crouch = false;
    onGround = true;
    onPlatform = false;
    hitCar = false;
    onLog = false;
    facingRight = false;
    haveJumped = false;
    haveCrouched = false;
    largeJump = false;
    crouchBegin = 0;

    collisionSide = "";

    lives = 6;
    score = 0;
    timeLeft = 120000;
    timeStart = 120000;
    timeState = "green";
    millisStart = 0;

    filled = new Boolean[5];
    for (int i = 0; i < 5; i ++) {
      filled[i] = false;
    }

    showTime = false;
    timeToShow = 0;
    showTimeBegan = 0;

    deathAnimation = false;
    gameOver = false;
    freePlayMode = false;
    deathAnimationTimer = 0;
  }

  void update () {
    //movement, adds to accelaration, which adds to speed
    if (left) {
      accelarationX = -0.15;
      if (crouch) {
        accelarationX = -0.11;
      }
      friction = 1; // no friction when moving
    } 
    if (right) {
      accelarationX = 0.15;
      if (crouch) {
        accelarationX = 0.11;
      }
      friction = 1;
    }
    if (left && right) { //not move if both are pressed
      accelarationX = 0;
      friction = 0.75;
      if (onLog || crouch) {
        friction = 0.65;
      }
    }
    if (!left && !right) {
      accelarationX = 0;
      friction = 0.75;
      if (onLog || crouch) {
        friction = 0.65;
      }
    }
    //jump
    //crouch large jump
    if (crouch && !deathAnimation) {
      if (millis() - crouchBegin >= 1500) {
        largeJump = true;
      }
    }
    if (jump && (onGround)) {
      if (largeJump) {
        vy += -14;
      } else {
        vy += -12;
      }
      onGround = false;
      jump = false;
      largeJump = false;
      friction = 1;
      crouch = false;
      unCrouch();
      if (!gameOver) {
        score += 1;//score for jumping
      }
    }

    //adding the accelaration
    vx += accelarationX;
    vy += accelarationY;

    //accounting for forces like gravity and friction
    if (onGround) {
      vx *= friction;
    }
    if (!onGround) {
      vy += gravity;
    }
    //reduce top speed on crouch and log
    if (onLog || crouch) {
      speedLimit = 4;
    } else {
      speedLimit = 5;
    }

    //correct speed if over top speed
    if (vx > speedLimit) {
      vx = speedLimit;
    } else if (vx < -speedLimit) {
      vx =  -speedLimit;
    }

    if (vy > speedLimit*3) {
      vy = speedLimit*3;
    } else if (vy < -speedLimit*3) {
      vy =  -speedLimit*3;
    }
    //no move if death animation
    if (deathAnimation) {
      vx = 0;
      vy = 0;
      deathAnimationTimer += 1;
      if (deathAnimationTimer > 40) {
        deathAnimation = false;
        deathAnimationTimer = 0;
        reset();
      }
    }
    //move with log
    if (onLog) {
      x += 2 * logSpeed;
    }
    //move frog
    if (!gameOver) {
      x += vx;
      //print(str(x) + "\n");
      y += vy;
      //print(str(y) + "\n");
    }




    //time
    int millisNow = millis();
    int diffMillis = millisNow - millisStart;
    if (!gameOver) {
      timeLeft = timeStart - diffMillis ;
    }

    if (timeLeft/timeStart <= 0.5) {
      timeState = "yellow";
    }
    if (timeLeft / timeStart <= 0.25) {
      timeState = "red";
    }
    if (timeLeft / timeStart <= 0) {
      die();
    }
  }

  void display() {
    noStroke();
    fill(0, 255, 0);
    if (deathAnimation) {
      fill(255, 0, 0);
    }
    if ((int(millis()/100))%2 == 0 && largeJump) {
      fill(0, 0, 255);
    }
    rect(x, y, w, h);
  }


  void collisions (String type) {
    //routine check (walls and end goal)
    if ( type == "routine") {
      if (x < 50) {
        x = 50;
        vx = 0;
      } else if (x > 510) {
        x = 510;
        vx = 0;
      }
      if (y > 780 - h) {
        y = 780 - h;
        vy = 0;
        onGround = true;
      }
      float centerX = x + w / 2;//center of frogx
      float centerY = y + h/2; // center of frogy
      for (int i = 0; i < 5; i ++) {
        if (dist(centerX, centerY, 120 + 90 * i, 140) <= 10) {//if center is close enough to goal
          if (filled[i] == false) {
            scoring(i);
          }
        }
      }
    } else if (type == "platform") { // for platforms
      if (collisionSide == "bottom" && vy >= 0) {
        vy = 0;
        onGround = true;
        onPlatform = true;
      } else if (collisionSide == "none" && onPlatform) {
        onGround = false;
        onPlatform = false;
      }
    } else if (type == "car") { // for cars
      if (hitCar) {
        if (!deathAnimation) {
          die();
        }
      }
    } else if (type == "log") { // for logs
      if (collisionSide == "bottom" && vy >= 0) {
        vy = 0;
        onGround = true;
        onLog = true;
      } else if (collisionSide == "none" && onLog) {
        onGround = false;
        onLog = false;
      }
    }
  }

  //set varibales to make crouch
  void initiateCrouch() {
    if (!gameOver && !deathAnimation && !levelSetup.paused) {
      y += 10;
      h = 20;
      crouchBegin = millis();
    }
  }
  void unCrouch() {
    if (!gameOver && !deathAnimation && !levelSetup.paused) {
      y -= 10;
      h = 30;
      largeJump = false;
      
    }
  }

  void scoring(int place) {//scoring
    showTime = true;
    timeToShow = round((timeStart - timeLeft) / 100) / 10.0;
    showTimeBegan = millis();
    score += 250; // 500 for completing a place
    score += int(1000/timeToShow);//add for time completed
    filled[place] = true;
    // to see if all gaols are filled
    Boolean good = true;
    for (int i = 0; i < 5; i ++) {
      if (filled[i] == false) {
        good = false;
      }
    }
    if (good) {
      if (!freePlayMode) {
        gameOver = true;
      }
      score += 500; // add 500 or completing a section
      for (int i = 0; i < 5; i ++) {
        filled[i] = false;
      }
    }
    reset();
  }

  void die() { //die
    if (!deathAnimation) { 
      lives -= 1;
      deathAnimation = true;
    }
    if (lives <= 0) {
      gameOver = true;
      switch(level) {
      case 1:
        if (score > levelOneNormalHighScore) {
          levelOneNormalHighScore = score;
        }
        break;
      case 2:
        if (score > levelTwoNormalHighScore) {
          levelTwoNormalHighScore = score;
        }
        break;
      case 3:
        if (score > levelThreeNormalHighScore) {
          levelThreeNormalHighScore = score;
        }
        break;
      case 4:
        if (score > levelFourNormalHighScore) {
          levelFourNormalHighScore = score;
        }
        break;
      default:
        break;
      }
    }
  }
  //reset, usually for dying after scoring 
  void reset() {
    x = 300;
    y = 780 - h;

    vx = 0;
    vy = 0;

    accelarationX = 0;
    accelarationY = 0;

    friction = 1;
    gravity = 0.75;
    logSpeed = 0;

    left = false;
    right = false;
    jump = false;
    crouch = false;
    onGround = true;
    onPlatform = false;
    hitCar = false;
    facingRight = false;

    collisionSide = "";

    timeLeft = 120000;
    timeState = "green";
    millisStart = millis();

    deathAnimation = false;
    deathAnimationTimer = 0;
  }
}
