//for frogs and cars
void objectCollisionsCar(Frog f, Car c) {
  float distx = (f.x + f.w/2) - (c.x + c.w/2); // dist from center of frogx to center of carx
  float disty = (f.y + f.h/2) - (c.y + c.h/2); // dist from center of frogy to center of cary

  float twoHalfsx = f.w/2 + c.w/2; //half of width of frog plus half of width of car
  float twoHalfsy = f.h/2 + c.h/2; // same but for height

  if (abs(distx) <= twoHalfsx) { //the dist between centers smaller than the two halves combined. intercepts in x
    if (abs(disty) <= twoHalfsy) { // same intercepts in y
      f.hitCar = true; //hits car
    } else {
      f.hitCar = false;
    }
  } else {
    f.hitCar = false;
  }
} 

//for log and frog
void objectCollisionsLog(Frog f, Log l) {
  //same idea as above
  float distx = (f.x + f.w/2) - (l.x + l.w/2);
  float disty = (f.y + f.h/2) - (l.y); // no l.h/2 because frog can go through log from below

  float twoHalfsx = f.w/2 + l.w/2;
  float twoHalfsy = f.h/2 ;

  if (abs(distx) <= twoHalfsx) {
    if (abs(disty) <= twoHalfsy) {
      float diffx = twoHalfsx - abs(distx); // difference in x
      float diffy = twoHalfsy - abs(disty); //difference in y

      if (diffx >= diffy) { // means it is intercepting from top or bottom
        if (disty >= 0) {
          f.collisionSide = "top";
        } else {
          if (f.vy >= 0 && !f.onLog) { // correct difference
            f.y -= diffy ;
          }
          f.collisionSide = "bottom";
        }
      } else {
        if (distx < 0) { // for left and right intercepting. Not used, but to make sure it is not 'none'
          f.collisionSide = "left";
        } else {
          f.collisionSide = "right";
        }
      }
    } else {
      f.collisionSide = "none";
    }
  } else {
    f.collisionSide = "none";
  }
} 


//frog and platform, same as log
void objectCollisionsPlatform(Frog f, Platform p) {

  float distx = (f.x + f.w/2) - (p.x + p.w/2);
  float disty = (f.y + f.h/2) - (p.y ); 

  float twoHalfsx = f.w/2 + p.w/2;
  float twoHalfsy = f.h/2;

  if (abs(distx) <= twoHalfsx) {
    if (abs(disty) <= twoHalfsy) {
      float diffx = twoHalfsx - abs(distx);
      float diffy = twoHalfsy - abs(disty);

      if (diffx >= diffy) {
        if (disty >= 0) {
          f.collisionSide = "top";
        } else {
          if (f.vy >= 0) {
            f.y -= diffy;
          }
          f.collisionSide = "bottom";
        }
      } else {
        if (distx < 0) {
          f.collisionSide = "left";
        } else {
          f.collisionSide = "right";
        }
      }
    } else {
      f.collisionSide = "none";
    }
  } else {
    f.collisionSide = "none";
  }
}