//title
document.getElementById("title").innerHTML = ("A Lone Field");

//Html elements
var infor = document.getElementById("info");
var alertBox = document.getElementById("alertMain");
var alertCloseButton = document.getElementById("alertCloseButton");

//main vars
var maxMarket = 6;
var isAdmin = false;

//progress tracking vars
var firstClick = true;
var eventOn = 0;
var sndBarn = false;
var sndBarnBacklog = []
var mansionBuilt = false;
var manifesto = false;






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
let Grain = new MaterialButton("grain", 5000, "Harvest the wheat. Increase the production.", "grains");
let Wood = new MaterialButton("wood", 12000, "The tree goes oof. Wait you did this without a tool? wowza", "woods");
let Stone = new MaterialButton("stone", 20000, "Mine the stone! You will work harder!", "stones");
let Corn = new MaterialButton("corn", 8000, "What ripe juicy corn", "corns");

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
      if (buttonClass.amt >= 5) {
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

function changeClickAmt(amt) {
  Grain.clickAmt = Grain.clickAmt + amt
  Wood.clickAmt = Wood.clickAmt + amt
  Stone.clickAmt = Stone.clickAmt + amt
  Corn.clickAmt = Corn.clickAmt + amt
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
let rw2clm1 = new MapTile(150, "rw2clm1", "newBarn", "Another barn appears, ideas of expansion fill your head. You're skills won't be enough to repair this", "s");
let rw2clm2 = new MapTile(100, "rw2clm2", "animals", "You see a party of animals hanging out, you convince them to join your farm<br>+1 horse<br>+1 poultry<br>+1 cow", "m");
let rw2clm3 = new MapTile(15, "rw2clm3", "barn", "An old rickety worn down barn stands in a clearing. You see some animals roaming, and an idea pops into your head. You grab a chicken and a sheep.", "m");
let rw2clm4 = new MapTile(60, "rw2clm4", "anotherField1", "A field is seen spanning an acre. already planted and overripe are corn. You learn about this valuable food source. The sheep agree to help you out.<br>+1 sheep", "m");
let rw2clm5 = new MapTile(90, "rw2clm5", "dealer", "A shady dealer tells you to meet him in the market if you want to grow strong", "s");
let rw3clm2 = new MapTile(7, "rw3clm2", "birchForest", "You found a Birch Forest! You learned how to gather wood!", "s");
let rw3clm4 = new MapTile(10, "rw3clm4", "quarry", "You found a quarry! You learned how to gather stone!", "s");
let rw4clm1 = new MapTile(150, "rw4clm1", "builder", "A quaint shop is along the side of the road. In it a skilled builder tells you to make any request you want, at a price.", "m");
let rw4clm2 = new MapTile(50, "rw4clm2", "market", "You reach a town, it's bustling market road entices you. The sheer amount of resources make your senses tingle", "m");
let rw4clm3 = new MapTile(40, "rw4clm3", "pastureRoad", "There is an expanse of green meadows. You find some old grain on the floor. Off in the distance is a road. It seems to go somewhere. You find 10 pounds off the side of the road<br>+10 pounds", "m");
let rw4clm4 = new MapTile(70, "rw4clm4", "roadNothing", "The road continues on for miles. Nothing happens and nothing is happening, is there nothing here?", "s");
let rw4clm5 = new MapTile(200, "rw4clm5", "machine", "The road did lead somewhere, a worn down machine. You're skills won't be enough to repair this", "s");

rw1clm3.run()
rw2clm1.run()
rw2clm2.run()
rw2clm3.run()
rw2clm4.run()
rw2clm5.run()
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
    Horse.increment(1);
    Cow.increment(1);
    Dog.increment(1);
  }
}
rw2clm1.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm1.cost) {
    buyTile(rw2clm1);
    sndBarn = true;
    for (let i = 0; i < sndBarnBacklog.length; i++) {
      BuilderStall.add(sndBarnBacklog[i]);
    }
  }
}
rw2clm2.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm2.cost) {
    buyTile(rw2clm2);
    Horse.increment(1);
    Cow.increment(1);
    Poultry.increment(1);
    rw2clm1.unlock();
  }
}
rw2clm3.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm3.cost) {
    buyTile(rw2clm3);
    document.getElementById("title").innerHTML = ("A small farm");
    barnUnlock();
    rw1clm3.unlock()
    rw2clm2.unlock()
    rw2clm4.unlock()
  }
}
rw2clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm4.cost) {
    buyTile(rw2clm4);
    Sheep.increment(1);
    Corn.htmlElem.style.display = "inline-block";
    rw2clm5.unlock()
  }
}
rw2clm5.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm5.cost) {
    buyTile(rw2clm5);
    document.getElementById("switchButton").style.display = "inline-block";
    document.getElementById("dealerStall").style.display = "inline-block";
    ShadyStall.unlocked = true;
    ShadyStall.new();
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
    document.getElementById("switchButton").style.display = "inline-block";
    document.getElementById("builderStall").style.display = "inline-block";
    BuilderStall.unlocked = true;
    BuilderStall.new();
  }
}
rw4clm2.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm2.cost) {
    buyTile(rw4clm2);
    marketUnlock();
    document.getElementById("title").innerHTML = ("A profitable business");
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
    BuilderStall.add(10);
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
    this.max = 5;

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
    if (this.amt >= 1 && barnFixed) {
      this.shedElem.style.display = "inline-block";
    }
    if (this.amt >= 2 && barnFixed) {
      this.breedElem.style.display = "inline-block";
    }
    this.numberElem.innerHTML = this.amt + " / " + this.max + " " + this.id
    for (let i = 0; i < this.produces.length; i++) {
      document.getElementById(this.produces[i][3]).innerHTML = this.amt + " " + this.produces[i][2] + " / " + (this.produces[i][1] / 1000) + " sec"
    }
  }

  increment(addAmt) {
    this.amt = this.amt + addAmt;
    if (this.amt > this.max) {
      this.amt = this.max;
      newAlert("s", "The barn is too full for newcomers")
    }
    this.check();
  }

  produce(product) {
    if (barnFixed) {
      product.increment(this.amt);
    }
  }

  changeMax(inc) {
    this.max = this.max + inc;
    this.check();
  }
}

//animals
Poultry = new Animal("poultry", "poultryShed", "breedPoultry", 15000, 10, [[Grain, 12000, "grain", "poultryProduction"]], "poultryNumber");
Sheep = new Animal("sheep", "sheepShed", "breedSheep", 30000, 15, [[Corn, 20000, "corn", "sheepProduction1"]], "sheepNumber");
Horse = new Animal("horse", "horseShed", "breedHorses", 30000, 10, [[Stone, 30000, "stone", "horseProduction"]], "horseNumber");
Cow = new Animal("cow", "cowShed", "breedCows", 30000, 20, [[Wood, 20000, "wood", "cowProduction"]], "cowNumber");
Dog = new Animal("dog", "dogShed", "breedDogs", 60000, 40, [[Money, 30000, "pounds", "dogProduction1"]], "dogNumber");

Poultry.run()
Sheep.run()
Horse.run()
Cow.run()
Dog.run()

//functions
function barnUnlock() {
  barnButton.style.display = "inline-block";
  Poultry.increment(1);
  Sheep.increment(1);
}

var barnFixed = false;
document.getElementById("fixBarn").onclick = function () {
  if (Wood.amt >= 25 && Stone.amt >= 15) {
    Wood.increment(-25);
    Stone.increment(-15);
    barnFixed = true;
    document.getElementsByClassName("sheds")[0].style.display = "inline-block"
    document.getElementsByClassName("brokenBarn")[0].style.display = "none"
    animalIntervals()
    checkAnimals();
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

    this.ranges = [[10, 20, 5, 1, 15, 43, 10, 1, 25, 75, 15, 1], [10, 20, 5, 1.5, 15, 43, 10, 1.5, 25, 75, 15, 1.5], [10, 20, 5, 2, 15, 43, 10, 2, 25, 75, 15, 2], [10, 20, 5, 1.7, 15, 43, 10, 1.7, 25, 87, 15, 1.7], [10, 45], [10, 90], [10, 105], [10, 80], [20, 120]];
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
    var rand = Math.floor(Math.random() * 5 + 1);
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
        this.price = Math.floor(Math.random() * this.ranges[listIndex][2] + this.amount * this.ranges[listIndex][3])
        //reduce sell price
        if (!this.buy) {
          this.price = this.price - 5;
        }
      } else if (rand == 1) {
        this.amount = Math.floor(Math.random() * this.ranges[listIndex][4] + this.ranges[listIndex][5])
        this.price = Math.floor(Math.random() * this.ranges[listIndex][6] + this.amount * this.ranges[listIndex][7])
        //reduce sell price
        if (!this.buy) {
          this.price = this.price - 10;
        }
      } else {
        this.amount = Math.floor(Math.random() * this.ranges[listIndex][8] + this.ranges[listIndex][9])
        this.price = Math.floor(Math.random() * this.ranges[listIndex][10] + this.amount * this.ranges[listIndex][11])
        //reduce sell price
        if (!this.buy) {
          this.price = this.price - 15;
        }
      }
    } else {
      //animals
      rand = Math.floor(Math.random() * 5)
      if (rand == 0) {
        this.type = Dog;
        this.amount = 1
        listIndex = 8
      } else if (rand == 1) {
        this.type = Sheep;
        this.amount = 1
        listIndex = 5
      } else if (rand == 2) {
        this.type = Horse;
        this.amount = 1
        listIndex = 6
      } else if (rand == 3) {
        this.type = Cow;
        this.amount = 1
        listIndex = 7
      } else {
        this.type = Poultry;
        this.amount = 1
        listIndex = 4
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
    if (currentMarketInteraction < maxMarket) {
      if (this.buy) {
        if (Money.amt >= this.price) {
          Money.increment(-this.price)
          this.type.increment(this.amount)
          green(this)
          currentMarketInteraction++;
          document.getElementById("interactionsLeft").innerHTML = "Can buy/sell " + (maxMarket - currentMarketInteraction) + " more times";
        } else {
          red(this)
        }
      } else {
        if (this.type.amt >= this.amount) {
          Money.increment(this.price);
          this.type.increment(-this.amount)
          green(this)
          currentMarketInteraction++;
          document.getElementById("interactionsLeft").innerHTML = "Can buy/sell " + (maxMarket - currentMarketInteraction) + " more times";
        } else {
          red(this)
        }
      }
    } else {
      red(this);
      newAlert("s", "Used up daily interactions, cannot buy/sell anymore");
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
var currentMarketInteraction = 0

//functions
function green(stall) {
  stall.divElem.classList.add("marketGreen");
  setTimeout(function () {
    stall.divElem.classList.remove("marketGreen");
  }, 500)
}

function red(stall) {
  stall.divElem.classList.add("marketRed");
  setTimeout(function () {
    stall.divElem.classList.remove("marketRed");
  }, 500)
}

function marketUnlock() {
  marketButton.style.display = "inline-block";
  marketIsOpen();
}

setInterval(function () {
  if (marketButton.style.display == "inline-block") {
    marketIsOpen()
    newAlert("s", "A new day brings new stock to the market")
  }
}, 180000);

function marketIsOpen() {
  for (let i = 0; i < stalls.length; i++) {
    stalls[i].generate()
  }
  currentMarketInteraction = 0;
  document.getElementById("interactionsLeft").innerHTML = "Can buy/sell " + (maxMarket - currentMarketInteraction) + " more times";
  BuilderStall.new();
  ShadyStall.new();
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


//other side
class otherStall {
  constructor(offers, titleId, descId, talkId, buyId, divId) {
    this.offers = offers;
    this.titleId = titleId;
    this.descId = descId;
    this.talkId = talkId;
    this.buyId = buyId;
    this.divId = divId;

    this.activatedOffers = [];
    this.offerNow;
    this.offerIndex;
    this.noOffer = new otherOffers("", [], "Sorry nothing more to offer you today", function () { })
    this.unlocked = false;
    this.titleElem = document.getElementById(titleId);
    this.descElem = document.getElementById(descId);
    this.talkElem = document.getElementById(talkId);
    this.buyElem = document.getElementById(buyId);
    this.divElem = document.getElementById(divId);
  }

  initiate(start, end) {
    this.activatedOffers = this.offers.slice(start, end);
  }

  new() {
    if (this.unlocked) {
      if (this.activatedOffers.length > 0) {
        var newIndex = Math.floor(Math.random() * this.activatedOffers.length)
        this.offerIndex = newIndex
        this.changeOffer(this.activatedOffers[newIndex])
      } else {
        this.changeOffer(this.noOffer);
      }
    }
  }

  changeOffer(offerClass) {
    this.offerNow = offerClass
    this.titleElem.innerHTML = this.offerNow.id
    if (this.offerNow.id != "") {
      var prices = "Cost:"
    } else {
      prices = ""
    }
    for (let i = 0; i < this.offerNow.price.length; i++) {
      prices = prices + "<br>" + this.offerNow.price[i][1] + " " + this.offerNow.price[i][0].id;
    }
    this.descElem.innerHTML = prices
  }

  add(index) {
    this.activatedOffers.push(this.offers[index]);
  }

  talk() {
    newAlert("s", this.offerNow.message);
  }

  buy() {
    var enough = true;
    for (let i = 0; i < this.offerNow.price.length; i++) {
      if (this.offerNow.price[i][0].amt < this.offerNow.price[i][1]) {
        enough = false;
      }
    }
    if (enough && !this.offerNow.bought) {
      for (let i = 0; i < this.offerNow.price.length; i++) {
        this.offerNow.price[i][0].increment(-1 * this.offerNow.price[i][1])
      }
      this.offerNow.func();
      this.activatedOffers.splice(this.offerIndex, 1);
      green(this);
      this.new()
    } else {
      red(this);
    }
  }

}

class otherOffers {
  constructor(id, price, message, func) {
    this.id = id;
    this.price = price;
    this.message = message;
    this.func = func
    this.bought = false;
  }
}

BuilderStall = new otherStall([
  new otherOffers("Poultry Upgrade", [[Wood, 20], [Grain, 30], [Money, 5], [Stone, 10]], "Let me help you upgrade that poultry coop. It'll house 5 more.", function () { Poultry.changeMax(5); if (sndBarn) { BuilderStall.add(5); } else { sndBarnBacklog.push(5); } }),
  new otherOffers("Sheep Upgrade", [[Wood, 40], [Grain, 40], [Money, 5], [Stone, 20]], "Let me help you upgrade that sheep house. It'll house 5 more.", function () { Sheep.changeMax(5); if (sndBarn) { BuilderStall.add(6); } else { sndBarnBacklog.push(6); } }),
  new otherOffers("Horse Upgrade", [[Wood, 10], [Grain, 40], [Money, 5], [Stone, 30]], "Let me help you upgrade that horse Stable. It'll house 5 more.", function () { Horse.changeMax(5); if (sndBarn) { BuilderStall.add(7); } else { sndBarnBacklog.push(7); } }),
  new otherOffers("Cow Upgrade", [[Wood, 60], [Grain, 25], [Money, 5], [Stone, 5]], "Let me help you upgrade that cow barn. It'll house 5 more.", function () { Cow.changeMax(5); if (sndBarn) { BuilderStall.add(8); } else { sndBarnBacklog.push(8); } }),
  new otherOffers("Dog Upgrade", [[Wood, 50], [Grain, 40], [Money, 5], [Stone, 30]], "Let me help you upgrade that dog pennel. It'll house 5 more.", function () { Dog.changeMax(5); if (sndBarn) { BuilderStall.add(9); } else { sndBarnBacklog.push(9); } }),
  new otherOffers("Poultry Upgrade II", [[Wood, 50], [Grain, 60], [Money, 30], [Stone, 30]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 10 more poultry.", function () { Poultry.changeMax(10) }),
  new otherOffers("Sheep Upgrade II", [[Wood, 60], [Grain, 70], [Money, 30], [Stone, 50]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 10 more sheep.", function () { Sheep.changeMax(10) }),
  new otherOffers("Horse Upgrade II", [[Wood, 30], [Grain, 70], [Money, 30], [Stone, 70]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 10 more horses.", function () { Horse.changeMax(10) }),
  new otherOffers("Cow Upgrade II", [[Wood, 100], [Grain, 60], [Money, 30], [Stone, 20]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 10 more cows.", function () { Cow.changeMax(10) }),
  new otherOffers("Dog Upgrade II", [[Wood, 90], [Grain, 100], [Money, 30], [Stone, 80]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 10 more dogs.", function () { Dog.changeMax(10) }),
  new otherOffers("Machine Fix", [[Wood, 20], [Grain, 30], [Money, 40], [Stone, 50]], "That's a fancy machine, something to do with making glue. I think I could fix that.", function () { Poultry.changeMax(5) }),
  new otherOffers("Mansion build", [[Wood, 20], [Grain, 30], [Money, 40], [Stone, 50]], "You know what, you've been a loyal customer. I'll help you fix up that shabby house.", function () { mansionBuilt = true; document.getElementById("yourFields"); }),
], "builderOfferTitle", "builderOfferDesc", "builderTalkButton", "builderBuyButton", "builderStall")

ShadyStall = new otherStall([
  new otherOffers("Upgrade", [[Money, 125]], "Take this pill. You'll grow strong, harvest 1 more resource per click", function () { changeClickAmt(1); ShadyStall.add(1); }),
  new otherOffers("Upgrade II", [[Money, 200]], "Drink this up. You'll grow strong, harvest 2 more resources per click", function () { changeClickAmt(2); ShadyStall.add(2); }),
  new otherOffers("Upgrade III", [[Money, 400]], "Say this incantation. You'll grow strong, harvest 3 more resources per click", function () { changeClickAmt(3); ShadyStall.add(3); }),
  new otherOffers("Upgrade IV", [[Money, 1000]], "Inject this serum. You'll grow stronger, harvest 4 more resources per click", function () { changeClickAmt(4); ShadyStall.add(4); }),
  new otherOffers("Manifesto", [[Money, 3000]], "You've upgraded well. One last thing to give, it'll change you're life but it requires a lot. You'll also need a better house than that shabby little field", function () { manifesto = true; }),
], "shadyOfferTitle", "shadyOfferDesc", "shadyTalkButton", "shadyBuyButton", "dealerStall")

BuilderStall.initiate(0, 5);
ShadyStall.initiate(0, 1);

BuilderStall.buyElem.onclick = function () {
  BuilderStall.buy()
}
BuilderStall.talkElem.onclick = function () {
  BuilderStall.talk()
}
ShadyStall.buyElem.onclick = function () {
  ShadyStall.buy()
}
ShadyStall.talkElem.onclick = function () {
  ShadyStall.talk()
}


var onBright = true;
function switchMarket() {
  if (onBright) {
    document.getElementsByClassName("marketOffers")[0].style.display = "none";
    document.getElementById("interactionsLeft").style.display = "none";
    document.getElementsByClassName("extraMarket")[0].style.display = "block";
    document.getElementById("marketSide").innerHTML = "The Other Side<button id=\"switchButton\"onclick=\"switchMarket()\"><i class=\"fas fa-sync-alt\"></i></button>";
    onBright = false;
  } else {
    document.getElementsByClassName("marketOffers")[0].style.display = "block";
    document.getElementById("interactionsLeft").style.display = "block";
    document.getElementsByClassName("extraMarket")[0].style.display = "none";
    document.getElementById("marketSide").innerHTML = "Today's Offers<button id=\"switchButton\"onclick=\"switchMarket()\"><i class=\"fas fa-sync-alt\"></i></button>";
    onBright = true;
  }
}







if (isAdmin) {
  Grain.amt = 1000;
  Wood.amt = 1000;
  Stone.amt = 1000;
  Corn.amt = 1000;
  Money.amt = 1000;
  rw1clm3.buttonHtmlElem.style.display = "inline-block"
  rw2clm1.buttonHtmlElem.style.display = "inline-block"
  rw2clm2.buttonHtmlElem.style.display = "inline-block"
  rw2clm4.buttonHtmlElem.style.display = "inline-block"
  rw2clm5.buttonHtmlElem.style.display = "inline-block"
  rw4clm1.buttonHtmlElem.style.display = "inline-block"
  rw4clm2.buttonHtmlElem.style.display = "inline-block"
  rw4clm4.buttonHtmlElem.style.display = "inline-block"
  rw4clm5.buttonHtmlElem.style.display = "inline-block"
  exploreButton.style.display = "inline-block"
  barnButton.style.display = "inline-block";
  marketButton.style.display = "inline-block";
  BuilderStall.unlocked = true;
  ShadyStall.unlocked = true;
}