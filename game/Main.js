//title
document.getElementById("title").innerHTML = ("A Lone Field");

//Html elements
var infor = document.getElementById("info");
var alertBox = document.getElementById("alertMain");
var alertCloseButton = document.getElementById("alertCloseButton");

//main vars
var money = 0;
var isAdmin = false;

//progress tracking vars
var firstClick = true;
var eventOn = 0;



function landUnlock() {
  if (landUnlockRoad == 1) {
    buttonrw4clm2.style.display = "inline-block"
    buttonrw4clm4.style.display = "inline-block"
  }
  if (landUnlockRoad == 2) {
    buttonrw4clm1.style.display = "inline-block"
  }
  if (landUnlockTop == 1) {
    buttonrw1clm3.style.display = "inline-block"
    buttonrw2clm4.style.display = "inline-block"
  }
}





//tabs stuff
var tabsdiv = document.getElementsByClassName("tabsdiv");
var resourceButton = document.getElementById("resourcesTab");
var exploreButton = document.getElementById("exploreTab");
var barnButton = document.getElementById("barnTab");
var marketButton = document.getElementById("marketTab");
document.getElementById("explorePage").style.display = "none";
document.getElementById("barnPage").style.display = "none";
document.getElementById("marketPage").style.display = "none";
resourceButton.style.display = "inline-block";
exploreButton.style.display = "none";
barnButton.style.display = "none";
marketButton.style.display = "none";
//tabs code
document.getElementById("resourcesTab").onclick = function () {
  openTab("resourcesPage");
}
document.getElementById("exploreTab").onclick = function () {
  openTab("explorePage");
}
document.getElementById("barnTab").onclick = function () {
  openTab("barnPage");
}
document.getElementById("marketTab").onclick = function () {
  openTab("marketPage");
}

function openTab(tabName) {
  var i, tabContent;
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "inline-block";
}

//other items
class Item {
  constructor(id, amtId) {
    this.id = id
    this.destId = amtId;
    this.amt = 0

    //html ekements
    this.amtDisplayElem = document.getElementById(this.destId);
  }

  increment(amount) {
    this.amt = this.amt + amount;
    this.refreshAmount();
  }

  refreshAmount() {
    this.amtDisplayElem.innerHTML = this.amt + " " + this.id;
  }
}

//items
let Money = new Item("pounds", "money")

//material buttons
class MaterialButton {
  constructor(id, timeout, message, amtId) {
    //input
    this.id = id;
    this.timeoutTime = timeout;
    this.hoverMsg = message;
    this.destId = amtId;
    //elements to keep track of
    this.clickAmt = 1;
    this.amt = 0;
    this.disabled = false;

    //html ekements
    this.htmlElem = document.getElementById(this.id);
    this.amtDisplayElem = document.getElementById(this.destId);

  }

  whenClicked() {
    if (!this.disabled) {
      this.increment(this.clickAmt);
      check(this);
      this.disabled = true;
      this.htmlElem.classList.add("timeout");
      createTimeout(this)
    }
  }

  reenable() {
    this.disabled = false;
    this.htmlElem.classList.remove("timeout");
  }

  hover(on) {
    if (on) {
      document.getElementById("desc").innerHTML = this.hoverMsg;
    } else {
      document.getElementById("desc").innerHTML = "";
    }
  }

  increment(amount) {
    if (amount != 0) {
      this.amt = this.amt + amount;
      this.refreshAmount();
    }
  }

  refreshAmount() {
    this.amtDisplayElem.innerHTML = this.amt + " " + this.id;
  }

}

//the four button classes
let Grain = new MaterialButton("grain", 2500, "Harvest the wheat. Increase the production.", "grains");
let Wood = new MaterialButton("wood", 8000, "The tree goes oof. Wait you did this without a tool? wowza", "woods");
let Stone = new MaterialButton("stone", 10000, "Mine the stone! You will work harder!", "stones");
let Corn = new MaterialButton("corn", 5000, "What ripe juicy corn", "corns");

Grain.htmlElem.onclick = function () { Grain.whenClicked() };
Grain.htmlElem.onmouseover = function () { Grain.hover(true) };
Grain.htmlElem.onmouseout = function () { Grain.hover(false) };

Wood.htmlElem.onclick = function () { Wood.whenClicked() };
Wood.htmlElem.onmouseover = function () { Wood.hover(true) };
Wood.htmlElem.onmouseout = function () { Wood.hover(false) };

Stone.htmlElem.onclick = function () { Stone.whenClicked() };
Stone.htmlElem.onmouseover = function () { Stone.hover(true) };
Stone.htmlElem.onmouseout = function () { Stone.hover(false) };

Corn.htmlElem.onclick = function () { Corn.whenClicked() };
Corn.htmlElem.onmouseover = function () { Corn.hover(true) };
Corn.htmlElem.onmouseout = function () { Corn.hover(false) };

//buttons functions


function check(buttonClass) {
  //check first click
  if (firstClick) {
    firstClick = false;
    infor.style.display = "inline-block";
  }

  if (buttonClass == Grain) {
    if (eventOn == 0) {
      if (buttonClass.amt >= 10) {
        eventOn = 1;
        newAlert("s", "While threshing the floor, you find a old piece of paper on the floor. It is a map.");
        exploreButton.style.display = "inline-block"
      }
    }
  }

}

function createTimeout(buttonClass) {
  setTimeout(function () { buttonClass.reenable() }, buttonClass.timeoutTime);
}


//alert function
function newAlert(size, message) {
  var alertMain = document.getElementById("alertMain");
  //change sizes
  if (size == "s") {
    alertMain.classList = "";
    alertMain.classList.add("small");
  } else if (size == "m") {
    alertMain.classList = "";
    alertMain.classList.add("medium");
  } else if (size == "l") {
    alertMain.classList = ""
    alertMain.classList.add("large")
  }

  //change text
  var mess = document.getElementById("alertText");
  mess.innerHTML = message;

  alertBox.style.display = "block";
}

alertCloseButton.onclick = function () {
  alertBox.style.display = "none";
}






//map tile class
class MapTile {
  constructor(cost, buttonId, nameId, message, messageSize) {
    this.cost = cost;
    this.buttonId = buttonId;
    this.nameId = nameId;
    this.message = message;
    this.messageSize = messageSize;
    this.buttonHtmlElem = document.getElementById(this.buttonId);
    this.nameHtmlElem = document.getElementById(this.nameId);
  }
  run() {
    this.nameHtmlElem.style.display = "none"
    this.buttonHtmlElem.style.display = "none"
  }

  unlock() {
    this.buttonHtmlElem.style.display = "inline-block"
  }
}

//declaring
let rw1clm3 = new MapTile(80, "rw1clm3", "stable", "A stable is seen in the distance. Around it, a number of animals mill, barely surviving in the field and stable. More comrades join your society. <br>+1 horse <br>+1 cow <br>+1 dog", "m");
let rw2clm3 = new MapTile(35, "rw2clm3", "barn", "An old rickety worn down barn stands in a clearing. You see some animals roaming, and an idea pops into your head. You grab a chicken and a sheep.", "m");
let rw2clm4 = new MapTile(70, "rw2clm4", "anotherField1", "A field is seen spanning an acre. already planted and overripe are corn. You learn about this valuable food source. The sheep agree to help you out.<br>+1 sheep", "m");
let rw3clm2 = new MapTile(15, "rw3clm2", "birchForest", "You found a Birch Forest! You learned how to gather wood!", "s");
let rw3clm4 = new MapTile(20, "rw3clm4", "quarry", "You found a quarry! You learned how to gather stone!", "s");
let rw4clm1 = new MapTile(60, "rw4clm1", "market", "The town looms over you as you stare longinly at the busy market ahead. The sheer amount of resources make your senses tingle.", "m");
let rw4clm2 = new MapTile(40, "rw4clm2", "roadToTown", "You continue on the road, as it gets messier, busier and louder. You see a town ahead<br>+10 grain<br>+10 wood<br>+10 stone", "m");
let rw4clm3 = new MapTile(50, "rw4clm3", "pastureRoad", "There is an expanse of green meadows. You find some old grain on the floor. Off in the distance is a road. It seems to go somewhere. You find 10 pounds off the side of the road<br>+10 pounds", "m");
let rw4clm4 = new MapTile(70, "rw4clm4", "furtherRoad", "You trek along the road, it continues", "s");
let rw4clm5 = new MapTile(100, "rw4clm5", "roadNothing", "The road continues on for miles. Nothing happens and nothing is happening, is there nothing here?", "m");

rw1clm3.run()
rw2clm3.run()
rw2clm4.run()
rw3clm2.run()
rw3clm4.run()
rw4clm1.run()
rw4clm2.run()
rw4clm3.run()
rw4clm4.run()
rw4clm5.run()
rw2clm3.unlock()
rw3clm2.unlock()
rw3clm4.unlock()
rw4clm3.unlock()


function buyTile(tileClass) {
  Grain.increment(-tileClass.cost)
  tileClass.buttonHtmlElem.style.display = "none";
  tileClass.nameHtmlElem.style.display = "inline-block";
  newAlert(tileClass.messageSize, tileClass.message);
}

rw1clm3.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw1clm3.cost) {
    buyTile(rw1clm3);
    document.getElementById("title").innerHTML = ("A small farm");
    Horse.increment(1);
    Cow.increment(1);
    Dog.increment(1);
  }
}
rw2clm3.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm3.cost) {
    buyTile(rw2clm3);
    barnUnlock();
    rw1clm3.unlock()
    rw2clm4.unlock()
  }
}
rw2clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm4.cost) {
    buyTile(rw2clm4);
    Sheep.inc(1)
    Corn.htmlElem.style.display = "inline-block";
  }
}
rw3clm2.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw3clm2.cost) {
    buyTile(rw3clm2);
    Wood.htmlElem.style.display = "inline-block";
    document.getElementById("title").innerHTML = ("A few plots");
  }
}
rw3clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw3clm4.cost) {
    buyTile(rw3clm4);
    Stone.htmlElem.style.display = "inline-block";
  }
}
rw4clm1.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm1.cost) {
    buyTile(rw4clm1);
    marketUnlock();
    document.getElementById("title").innerHTML = ("A profitable business");
  }
}
rw4clm2.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm2.cost) {
    buyTile(rw4clm2);
    Grain.increment(10);
    Wood.increment(10);
    Stone.increment(10);
    rw4clm1.unlock()
  }
}
rw4clm3.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm3.cost) {
    buyTile(rw4clm3);
    Money.increment(10);
    Grain.increment(10);
    rw4clm2.unlock();
    rw4clm4.unlock();
  }
}
rw4clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm4.cost) {
    buyTile(rw4clm4);
    rw4clm5.unlock()
  }
}
rw4clm5.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm5.cost) {
    buyTile(rw4clm5);
  }
}







//barn
//animal classes
class Animal {
  constructor(id, shedId, breedId, breedTimeout, breedCost, produces, numberId) {
    this.id = id
    this.shedId = shedId;
    this.breedId = breedId;
    this.breedTimeout = breedTimeout;
    this.breedCost = breedCost;
    this.produces = produces;
    this.numberId = numberId;

    //keep track
    this.amt = 0;

    //htmlElems
    this.breedElem = document.getElementById(breedId);
    this.shedElem = document.getElementById(shedId);
    this.numberElem = document.getElementById(numberId);
  }

  run() {
    this.breedElem.style.display = "none";
    this.shedElem.style.display = "none";
  }

  check() {
    if (this.amt >= 1) {
      this.shedElem.style.display = "inline-block";
    }
    if (this.amt >= 2) {
      this.breedElem.style.display = "inline-block";
    }
    this.numberElem.innerHTML = this.amt + " " + this.id
    for (let i = 0; i < this.produces.length; i++) {
      document.getElementById(this.produces[i][3]).innerHTML = this.amt + " " + this.produces[i][2] + " / " + (this.produces[i][1] / 1000) + " sec"
    }
  }

  increment(addAmt) {
    this.amt = this.amt + addAmt;
    this.check();
  }

  produce(product) {
    product.increment(this.amt);
  }
}

//animals
Poultry = new Animal("poultry", "poultryShed", "breedPoultry", 60000, 30, [[Grain, 6000, "grain", "poultryProduction"]], "poultryNumber");
Sheep = new Animal("sheep", "sheepShed", "breedSheep", 90000, 40, [[Grain, 8000, "grain", "sheepProduction1"], [Wood, 20000, "wood", "sheepProduction2"]], "sheepNumber");
Horse = new Animal("horse", "horseShed", "breedHorses", 120000, 50, [[Stone, 10000, "stone", "horseProduction"]], "horseNumber");
Cow = new Animal("cow", "cowShed", "breedCows", 105000, 60, [[Wood, 6000, "wood", "cowProduction"]], "cowNumber");
Dog = new Animal("dog", "dogShed", "breedDogs", 180000, 80, [[Grain, 20000, "grain", "dogProduction1"], [Wood, 40000, "wood", "dogProduction2"], [Stone, 60000, "stone", "dogProduction3"]], "dogNumber");

Poultry.run()
Sheep.run()
Horse.run()
Cow.run()
Dog.run()

//functions
function barnUnlock() {
  barnButton.style.display = "inline-block";
}

document.getElementById("fixBarn").onclick = function () {
  if (Wood.amt >= 25 && Stone.amt >= 15) {
    document.getElementsByClassName("sheds")[0].style.display = "inline-block"
    document.getElementsByClassName("brokenBarn")[0].style.display = "none"
    Poultry.increment(1);
    Sheep.increment(1);
    animalIntervals()
  }
}

function checkAnimals() {
  Poultry.check()
  Sheep.check()
  Horse.check()
  Cow.check()
  Dog.check()
}

function breed(animalClass) {
  if (animalClass.amt >= 2 && Corn.amt >= animalClass.breedCost) {
    Corn.increment(-animalClass.breedCost)
    animalClass.increment(-2);
    animalClass.breedElem.disable = "true";
    animalClass.breedElem.classList.add("timeout")
    setTimeout(function () {
      animalClass.breedElem.disable = "false";
      animalClass.breedElem.classList.remove("timeout")
      animalClass.increment(3)
    }, animalClass.breedTimeout)
  }
}

function once(fn, context) {
  var result;
  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  };
}

function produceInterval(animalClass) {
  for (let i = 0; i < animalClass.produces.length; i++) {
    window.setInterval(function () {
      animalClass.produce(animalClass.produces[i][0])
    }, animalClass.produces[i][1])
  }
}


Poultry.breedElem.onclick = function () {
  breed(Poultry);
}
Sheep.breedElem.onclick = function () {
  breed(Sheep);
}
Horse.breedElem.onclick = function () {
  breed(Horse);
}
Cow.breedElem.onclick = function () {
  breed(Cow);
}
Dog.breedElem.onclick = function () {
  breed(Dog);
}

var animalIntervals = once(function () {
  produceInterval(Poultry);
  produceInterval(Sheep);
  produceInterval(Horse);
  produceInterval(Cow);
  produceInterval(Dog);
})





//market stall class
class Stall {
  constructor(buy, nameId, priceId, divId, buttonId) {
    this.buy = buy;
    this.nameId = nameId;
    this.priceId = priceId;
    this.divId = divId;
    this.buttonId = buttonId;

    this.ranges = [[3, 24, 8, 21, 5, 48, 14, 43, 10, 95, 25, 87], [3, 24, 10, 20, 5, 48, 20, 40, 10, 95, 30, 85], [3, 24, 8, 71, 5, 48, 14, 148, 10, 95, 25, 287], [3, 24, 8, 56, 5, 48, 14, 105, 10, 95, 25, 204], [10, 45], [10, 90], [10, 105], [10, 80], [20, 300]];
    this.type;
    this.price;
    this.amount;
    this.nameElem = document.getElementById(nameId);
    this.priceElem = document.getElementById(priceId);
    this.divElem = document.getElementById(divId);
    this.buttonElem = document.getElementById(buttonId);
  }

  generate() {
    //determining if plain resource or special resource
    var rand = Math.floor(Math.random() * 5);
    var listIndex;
    if (rand <= 4) {
      //determining types
      rand = Math.floor(Math.random() * 4);
      if (rand == 0) {
        this.type = Grain;
        listIndex = 0;
      } else if (rand == 1) {
        this.type = Wood;
        listIndex = 1;
      } else if (rand == 2) {
        this.type = Stone;
        listIndex = 2;
      } else {
        this.type = Corn;
        listIndex = 3;
      }
      //thresholds
      rand = Math.floor(Math.random() * 3);
      if (rand == 0) {
        this.amount = Math.floor(Math.random() * this.ranges[listIndex][0] + this.ranges[listIndex][1])
        this.price = Math.floor(Math.random() * this.ranges[listIndex][2] + this.ranges[listIndex][3])
      } else if (rand == 1) {
        this.amount = Math.floor(Math.random() * this.ranges[listIndex][4] + this.ranges[listIndex][5])
        this.price = Math.floor(Math.random() * this.ranges[listIndex][6] + this.ranges[listIndex][7])
      } else {
        this.amount = Math.floor(Math.random() * this.ranges[listIndex][8] + this.ranges[listIndex][9])
        this.price = Math.floor(Math.random() * this.ranges[listIndex][10] + this.ranges[listIndex][11])
      }
    } else {
      //animals
      rand = Math.floor(Math.random() * 5)
      switch (rand) {
        case 1:
          this.type = Poultry;
          this.amount = 1
          listIndex = 4
        case 2:
          this.type = Sheep;
          this.amount = 1
          listIndex = 5
        case 3:
          this.type = Horse;
          this.amount = 1
          listIndex = 6
        case 4:
          this.type = Cow;
          this.amount = 1
          listIndex = 7
        case 5:
          this.type = Dog;
          this.amount = 1
          listIndex = 8

        default:
          break;
      }
      this.price = Math.floor(Math.random() * this.ranges[listIndex][0] + this.ranges[listIndex][1])
    }
    this.display()
  }

  display() {
    this.nameElem.innerHTML = this.amount + " " + this.type.id;
    this.priceElem.innerHTML = this.price + " pounds";
  }

  interact() {
    if (this.buy) {
      if (Money.amt >= this.price) {
        Money.increment(-this.price)
        this.type.increment(this.amount)
        green(this)
      } else {
        red(this)
      }
    } else {
      if (this.type.amt >= this.amount) {
        Money.increment(this.price);
        this.type.increment(-this.amount)
        green(this)
      } else {
        red(this)
      }
    }
  }
}

//Create the instances
BuyStall1 = new Stall(true, "marketItemNameStall1", "marketItemPriceStall1", "marketBuy1", "buyStall1")
BuyStall2 = new Stall(true, "marketItemNameStall2", "marketItemPriceStall2", "marketBuy2", "buyStall2")
BuyStall3 = new Stall(true, "marketItemNameStall3", "marketItemPriceStall3", "marketBuy3", "buyStall3")
SellStall1 = new Stall(false, "marketItemNameStallSell1", "marketItemPriceStallSell1", "marketSell1", "sellStall1")
SellStall2 = new Stall(false, "marketItemNameStallSell2", "marketItemPriceStallSell2", "marketSell2", "sellStall2")
SellStall3 = new Stall(false, "marketItemNameStallSell3", "marketItemPriceStallSell3", "marketSell3", "sellStall3")

var stalls = [BuyStall1, BuyStall2, BuyStall3, SellStall1, SellStall2, SellStall3]

//functions
function green(stall) {
  stall.divElem.classList.add("marketGreen");
  stall.buttonElem.classList.add("marketGreen");
  setTimeout(function () {
    stall.divElem.classList.remove("marketGreen");
    stall.buttonElem.classList.remove("marketGreen");
  }, 500)
}

function red(stall) {
  stall.divElem.classList.add("marketRed");
  stall.buttonElem.classList.add("marketRed");
  setTimeout(function () {
    stall.divElem.classList.remove("marketRed");
    stall.buttonElem.classList.remove("marketRed");
  }, 500)
}

function marketUnlock() {
  marketButton.style.display = "inline-block";
  marketIsOpen();
}

setInterval(function () {
  if (marketButton.style.display == "ilnine-block") {
    marketIsOpen()
    newAlert("s", "A new day brings new stock to the market")
  }
}, 360000);

function marketIsOpen() {
  for (let i = 0; i < stalls.length; i++) {
    stalls[i].generate()
  }
}

BuyStall1.buttonElem.onclick = function () {
  BuyStall1.interact()
}
BuyStall2.buttonElem.onclick = function () {
  BuyStall2.interact()
}
BuyStall3.buttonElem.onclick = function () {
  BuyStall3.interact()
}
SellStall1.buttonElem.onclick = function () {
  SellStall1.interact()
}
SellStall2.buttonElem.onclick = function () {
  SellStall2.interact()
}
SellStall3.buttonElem.onclick = function () {
  SellStall3.interact()
}








if (isAdmin) {
  Grain.amt = 1000;
  Wood.amt = 1000;
  Stone.amt = 1000;
  Corn.amt = 1000;
  Money.amt = 1000;
  rw1clm3.buttonHtmlElem.style.display = "inline-block"
  rw2clm4.buttonHtmlElem.style.display = "inline-block"
  rw4clm1.buttonHtmlElem.style.display = "inline-block"
  rw4clm2.buttonHtmlElem.style.display = "inline-block"
  rw4clm4.buttonHtmlElem.style.display = "inline-block"
  exploreButton.style.display = "inline-block"
  barnButton.style.display = "inline-block";
  marketButton.style.display = "inline-block";
}