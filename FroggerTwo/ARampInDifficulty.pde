

class ARampInDifficulty {

  Platform[] p;
  Car[] cOne;
  Car[] cTwo;
  Car[] cThree;
  Car[] cFour;
  Log[] lOne;
  float[] timer, wait;



  ARampInDifficulty () {
    p = new Platform[19];
    p[0] = new Platform(50, 700, 80);
    p[1] = new Platform(240, 700, 90);
    p[2] = new Platform(460, 700, 90);
    p[3] = new Platform(370, 660, 60);
    p[4] = new Platform(100, 630, 70);
    p[5] = new Platform(260, 600, 70);
    p[6] = new Platform(490, 600, 60);
    p[7] = new Platform(140, 550, 40);
    p[8] = new Platform(430, 530, 60);
    p[9] = new Platform(80, 500, 70);
    p[10] = new Platform(530, 470, 20);
    p[11] = new Platform(300, 460, 80);
    p[12] = new Platform(180, 440, 40);
    p[13] = new Platform(410, 390, 40);
    p[14] = new Platform(50, 360, 210);
    p[15] = new Platform(390, 330, 50);
    p[16] = new Platform(80, 290, 50);
    p[17] = new Platform(250, 280, 40);
    p[18] = new Platform(500, 280, 20);

    cOne = new Car[6];
    for (int i = 0; i < 6; i ++) {
      cOne[i] = new Car(605, "suv", true);
    }
    cTwo = new Car[6];
    for (int i = 0; i < 6; i ++) {
      cTwo[i] = new Car(535, "suv", false);
    }
    cThree = new Car[6];
    for (int i = 0; i < 6; i ++) {
      cThree[i] = new Car(425, "racecar", false);
    }
    cFour = new Car[6];
    for (int i = 0; i < 6; i ++) {
      cFour[i] = new Car(355, "mini", false);
    }
    lOne = new Log[7];
    for (int i = 0; i < 7; i ++) {
      lOne[i] = new Log(220, "short", false);
    }

    timer = new float[5];
    for (int i = 0; i < 5; i ++) {
      timer[i] = 0;
    }
    wait = new float[5];
    for (int i = 0; i < 5; i ++) {
      wait[i] = 0;
    }
  }

  void run() {

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
    doCar(cThree, 3, 80, 200);

    //carLane 4
    doCar(cFour, 4, 60, 175);

    //log lane 1
    if (timer[4] > wait[4]) {
      for (int i = 0; i < lOne.length; i ++) {
        if (!lOne[i].isMove) {
          lOne[i].initiate();
          timer[4] = 0;
          wait[4] = random(60, 100);
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

  }

  void pausedDisplay(){
    for (int i = 0; i < p.length; i ++){
      p[i].display();
    }
    for (int i = 0; i < cOne.length; i++){
      cOne[i].display();
    }
    for (int i = 0; i < cTwo.length; i++){
      cTwo[i].display();
    }
    for (int i = 0; i < cThree.length; i++){
      cThree[i].display();
    }
    for (int i = 0; i < cFour.length; i++){
      cFour[i].display();
    }
    
  }

  void commence() {
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
