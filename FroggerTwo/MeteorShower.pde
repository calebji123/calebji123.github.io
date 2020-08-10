

class MeteorShower {

  Platform[] p;
  Car[] cOne;
  Car[] cTwo;
  Car[] cThree;
  Car[] cFour;
  Car[] cFive;
  Log[] lOne;

  float[] timer, wait;



  MeteorShower () {
    p = new Platform[48];
    p[0] = new Platform(390, 730, 10);
    p[1] = new Platform(470, 730, 30);
    p[2] = new Platform(50, 720, 20);
    p[3] = new Platform(130, 720, 20);
    p[4] = new Platform(350, 720, 10);
    p[5] = new Platform(50, 680, 10);
    p[6] = new Platform(210, 680, 20);
    p[7] = new Platform(120, 660, 20);
    p[8] = new Platform(330, 660, 20);
    p[9] = new Platform(410, 660, 20);
    p[10] = new Platform(190, 650, 10);
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
          wait[4] = random(80, 100);
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
    for (int i = 0; i < cFive.length; i++){
      cFive[i].display();
    }
    for (int i = 0; i < lOne.length; i++){
      lOne[i].display();
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
