
class Log {
  float x, y, speed, w, h, initx;
  Boolean isMove, goingRight;
  String type;
  
  Log ( float yPos, String typeVar, Boolean right) {
    y = yPos + 2.5;
    h = 25;
    type = typeVar;
    //different types
    if (type == "short") {
      speed = 2.3;
      w = 75;
    } else if (type == "long") {
      speed = 4.5;
      w = 175;
    } else if (type == "medium") {
      speed = 3.3;
      w = 125;
    } else if (type == "turtle") {
      speed = 4;
      w = 120;
    }
    if (right) {
      goingRight = true;
    } else {
      goingRight = false;
    }
    if (right) {
      x= 50 -w - 1 ;
    } else {
      x = 750 + w + 1;
    }
    initx = x;
    isMove = false;
  }
  //same as car initiate
  void initiate() {
    isMove = true;
  }
  //move
  void move() {
    if (isMove) {
      if (goingRight) {
        x += speed;
      } else {
        x -= speed;
      }
    }
    if (x > 800 + w && goingRight) {
      x = initx;
      isMove = false;
    } else if (x < -w && !goingRight){
      x = initx;
      isMove = false;
    }
  }
  //display
  void display(){
    fill(210,180,140);
    rect(x, y, w, h);
  }
  //reset
  void reset(){
    x = initx;
    isMove = false;
  }
}
