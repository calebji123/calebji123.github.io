
class Car {
  float x, y, speed, w, h, initx;
  Boolean isMove, goingRight;
  String colour;

  Car ( float yPos, String type, Boolean right) {
    y = yPos;
    h = 30;
    //different types of cars
    if (type == "suv") {
      speed = 1.5;
      w = 50;
      colour = "blue";
    } else if (type == "truck") {
      speed = 1.3;
      w = 100;
      colour = "gray";
    } else if (type == "racecar") {
      speed = 4.7;
      w = 50;
      colour = "red";
    } else if (type == "bulldozer") {
      speed = 1.5;
      w = 60;
      colour = "yellow";
    } else if (type == "mini") {
      speed = 2.8;
      w = 30;
      colour = "orange";
    }
    //which way it is going
    if (right) {
      goingRight = true;
    } else {
      goingRight = false;
    }

    if (right) {
      x= -w - 1;
    } else {
      x = 800 + w + 1;
    }
    initx = x;
    isMove = false;
  }
  
  //for cars that are currently inactive, waiting to be initiated. 
  void initiate() {
    isMove = true;
  }
  //isMove
  void move() {
    if (isMove) {
      if (goingRight) {
        x += speed;
      } else {
        x -= speed;
      }
    }
    //reset car to start when past wall
    if (x > 800 + w && goingRight) {
      x = initx;
      isMove = false;
    } else if (x < -w && !goingRight) {
      x = initx;
      isMove = false;
    }
  }
  //display
  void display() {
    noStroke();
    //if (colour != "blue") {
      if (colour == "blue") {
        fill(0, 0, 255);
      } else if (colour == "gray") {
        fill(125);
      } else if (colour == "red") {
        fill(255, 0, 0);
      } else if (colour == "yellow") {
        fill(225, 225, 0);
      } else if (colour == "orange") {
        fill(255, 165, 0 );
      }
      rect(x, y, w, h);
    //} else {
    //  if (goingRight) {
    //    image(blueCar, x, y);
    //  } else {
    //    image(blueCarLeft, x, y);
    //  }
    //}
  }

  void reset() {
    x = initx;
    isMove = false;
  }
}
