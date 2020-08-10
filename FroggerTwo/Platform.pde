
class Platform {
  float x, y, w, h;

  Platform (float xPos, float yPos, float wid) {
    x = xPos;
    y = yPos;
    w = wid;
    h = 10;
  }
  
  
  //display
  void display () {
    noStroke();
    fill(255, 0, 0);
    rect(x,y,w,h);
  }
  
  
}
