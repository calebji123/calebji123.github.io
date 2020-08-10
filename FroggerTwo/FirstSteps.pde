

class FirstSteps {

  Platform[] p;
  Car[] cOne;
  Car[] cTwo;
  Car[] cThree;

  float[] timer, wait;


  FirstSteps () {
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
    //carlane 1
    doCar(cOne, 1, 120, 250);

    //carlane 2
    doCar(cTwo, 2, 120, 250);

    //carlane 3
    doCar(cThree, 3, 80, 200);
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
    
  }



  void commence() { // for initiating level, only when clicking in level select, or trying again


    for (int i = 0; i < cOne.length; i++) {
      cOne[i].reset();
    }
    for (int i = 0; i < cTwo.length; i++) {
      cTwo[i].reset();
    }
    for (int i = 0; i < cThree.length; i++) {
      cThree[i].reset();
    }
    timer = new float[3];
    for (int i = 0; i < 3; i ++) {
      timer[i] = 0;
    }
    wait = new float[3];
    for (int i = 0; i < 3; i ++) {
      wait[i] = 0;
    }
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
