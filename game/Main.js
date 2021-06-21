//title
document.getElementById("title").innerHTML = ("A Lone Field");

//Html elements
var infor = document.getElementById("info");
var alertBox = document.getElementById("alertMain");
var alertCloseButton = document.getElementById("alertCloseButton");
document.getElementsByClassName("version")[0].innerHTML = "version 0.6.1";

//main vars
var maxMarket = 6;
var isAdmin = true;

//progress tracking vars
var firstClick = true;
var eventOn = 0;
var barnFixed = false;
var sndBarn = false;
var sndBarnBacklog = []
var mansionBuilt = false;
var animalMult = 1;






//tabs stuff
var tabsdiv = document.getElementsByClassName("tabsdiv");
var resourceButton = document.getElementById("resourcesTab");
var exploreButton = document.getElementById("exploreTab");
var barnButton = document.getElementById("barnTab");
var marketButton = document.getElementById("marketTab");
resourceButton.style.display = "inline-block";
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
let Money = new Item("pounds", "money");
let Glue = new Item("glue", "glue");

//material buttons
class MaterialButton {
  constructor(id, timeout, message) {
    //input
    this.id = id;
    this.timeoutTime = timeout;
    this.hoverMsg = message;
    //ids
    this.destId = this.id + "s";
    this.barId = this.id + "Bar";
    this.divId = this.id + "ButtonDiv";
    //elements to keep track of
    this.clickAmt = 1;
    this.amt = 0;
    this.disabled = false;
    this.inProgress = false;

    //html ekements
    this.htmlElem = document.getElementById(this.id);
    this.divElem = document.getElementById(this.divId);
    this.amtDisplayElem = document.getElementById(this.destId);
    this.barElem = document.getElementById(this.barId);
  }

  whenClicked() {
    if (!this.disabled) {
      this.increment(this.clickAmt);
      check(this);
      progress(this);
      this.disabled = true;
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
let Grain = new MaterialButton("grain", 5000, "Harvest the wheat. Increase the production.");
let Wood = new MaterialButton("wood", 12000, "The tree goes oof. Wait you did this without a tool? wowza");
let Stone = new MaterialButton("stone", 20000, "Mine the stone! You will work harder!");
let Corn = new MaterialButton("corn", 8000, "What ripe juicy corn");

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
      if (buttonClass.amt >= 7) {
        eventOn = 1;
        newAlert("s", "While threshing the floor, you find a old piece of paper on the floor. It is a map.");
        exploreButton.style.display = "inline-block"
      }
    }
  }
}

function progress(buttonClass) {
  buttonClass.htmlElem.classList.add("timeout");
  var width = 0;
  var id = setInterval(function frame() {
    if (width >= 100) {
      clearInterval(id);
      buttonClass.barElem.style.width = "100%";
      buttonClass.reenable();
    } else {
      width = width + (2500 / buttonClass.timeoutTime);
      buttonClass.barElem.style.width = (100 - width) + "%";
    }
  }, 25);
}

function changeClickAmt(amt) {
  Grain.clickAmt = Grain.clickAmt + amt
  Wood.clickAmt = Wood.clickAmt + amt
  Stone.clickAmt = Stone.clickAmt + amt
  Corn.clickAmt = Corn.clickAmt + amt
}


//alert function
var onAlert = false;
var queue = []
function newAlert(size, message) {
  if (!onAlert) {
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
    onAlert = true;
  } else {
    queue.push([size, message])
  }

}

alertCloseButton.onclick = function () {
  alertBox.style.display = "none";
  onAlert = false;
  if (queue.length > 0) {
    newAlert(queue[0][0], queue[0][1]);
    queue.shift();
  }
}






//map tile class
class MapTile {
  constructor(cost, buttonId, nameId, message, messageSize) {
    this.cost = cost;
    this.buttonId = buttonId;
    this.nameId = nameId;
    this.message = message;
    this.messageSize = messageSize;
    this.toolId = "textTooltip" + this.buttonId;
    this.buttonHtmlElem = document.getElementById(this.buttonId);
    this.nameHtmlElem = document.getElementById(this.nameId);
    this.toolElem = document.getElementById(this.toolId);

    this.nameHtmlElem.style.display = "none";
    this.buttonHtmlElem.style.display = "none";
    this.toolElem.innerHTML = this.cost + " grain";
  }
  run() {

  }

  unlock() {
    this.buttonHtmlElem.style.display = "inline-block"
  }
}

//declaring
let rw1clm2 = new MapTile(25, "rw1clm2", "cowField", "Another cow is seen in the distance. You call to him, he decides to work for you<br>+1 cow", "s");
let rw1clm3 = new MapTile(40, "rw1clm3", "stable", "A stable is seen in the distance. Around it, a number of animals mill, barely surviving in the field and stable. More comrades join your society. <br>+1 horse <br>+1 cow", "m");
let rw1clm4 = new MapTile(25, "rw1clm4", "sheepField", "A sheep is milling around, you tell him about your up and coming society <br>+1 sheep", "s");
let rw2clm1 = new MapTile(75, "rw2clm1", "newBarn", "Another barn appears, ideas of expansion fill your head. You're skills won't be enough to repair this. <br>lvl 2 barn upgrades unlocked", "s");
let rw2clm2 = new MapTile(30, "rw2clm2", "animals", "You see a party of animals hanging out, you convince them to join your farm<br>+1 horse<br>+1 poultry", "m");
let rw2clm3 = new MapTile(16, "rw2clm3", "barn", "An old rickety worn down barn stands in a clearing. You see some animals roaming, and an idea pops into your head. You promise the nearest poultry to you equality and freedom<br>+1 poultry", "m");
let rw2clm4 = new MapTile(20, "rw2clm4", "cornField", "A field is seen spanning an acre. It's already planted and overripe are corn. Animals seem to love this food in many ways. A sheep and a chicken join your cause<br>+1 sheep<br>+1 poultry", "m");
let rw2clm5 = new MapTile(60, "rw2clm5", "dealer", "A shady dealer tells you to meet him in the market if you want to grow strong", "s");
let rw3clm2 = new MapTile(10, "rw3clm2", "birchForest", "You found a Birch Forest! You learned how to gather wood!", "s");
let rw3clm4 = new MapTile(12, "rw3clm4", "quarry", "You found a quarry! You learned how to gather stone!", "s");
let rw4clm1 = new MapTile(50, "rw4clm1", "builder", "A quaint shop is along the side of the road. In it a skilled builder tells you to make any request you want, at a price.", "m");
let rw4clm2 = new MapTile(25, "rw4clm2", "market", "You reach a town, it's bustling market road entices you. The sheer amount of resources make your senses tingle", "m");
let rw4clm3 = new MapTile(20, "rw4clm3", "road", "This seems like a main road. On the side is a dog, looking cute. He agrees to join your society, giving you his busking earnings.<br>+10 pounds<br>+1 dog", "m");
let rw4clm4 = new MapTile(40, "rw4clm4", "roadNothing", "The road continues on for miles. Nothing happens and nothing is happening, is there nothing here?<br>+1 dog", "s");
let rw4clm5 = new MapTile(150, "rw4clm5", "machine", "The road did lead somewhere, a worn down machine. You're skills won't be enough to repair this. You convince the guard dog to help you out", "s");

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

rw1clm2.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw1clm2.cost) {
    buyTile(rw1clm2);
    Cow.increment(1);
  }
}
rw1clm3.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw1clm3.cost) {
    buyTile(rw1clm3);
    Horse.increment(1);
    Cow.increment(1);
  }
}
rw1clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw1clm4.cost) {
    buyTile(rw1clm4);
    Sheep.increment(1);
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
    Poultry.increment(1);
    rw2clm1.unlock();
    rw1clm2.unlock();
  }
}
rw2clm3.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm3.cost) {
    buyTile(rw2clm3);
    document.getElementById("title").innerHTML = "A small farm";
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
    Poultry.increment(1);
    Corn.divElem.style.display = "inline-block";
    rw2clm5.unlock();
    rw1clm4.unlock();
  }
}
rw2clm5.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm5.cost) {
    buyTile(rw2clm5);
    document.getElementById("switchButton").style.display = "inline-block";
    ShadyStall.divElem.style.display = "inline-block";
    ShadyStall.unlocked = true;
    ShadyStall.new();
  }
}
rw3clm2.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw3clm2.cost) {
    buyTile(rw3clm2);
    Wood.divElem.style.display = "inline-block";
    document.getElementById("title").innerHTML = "A few plots";
  }
}
rw3clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw3clm4.cost) {
    buyTile(rw3clm4);
    Stone.divElem.style.display = "inline-block";
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
    document.getElementById("title").innerHTML = "A profitable business";
    rw4clm1.unlock()
  }
}
rw4clm3.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm3.cost) {
    buyTile(rw4clm3);
    Money.increment(10);
    Dog.increment(1);
    rw4clm2.unlock();
    rw4clm4.unlock();
  }
}
rw4clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm4.cost) {
    buyTile(rw4clm4);
    Dog.increment(1);
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
  constructor(id, breedTimeout, breedCost, produces) {
    this.id = id
    this.timeoutTime = breedTimeout;
    this.breedCost = breedCost;
    this.produces = produces;
    //ids
    this.shedId = this.id + "Shed";
    this.breedId = this.id + "Breed";
    this.numberId = this.id + "Number";
    this.barId = this.id + "Bar";
    this.productionId = this.id + "Production";
    this.breedDivId = this.id + "BreedDiv";
    this.breedInfoId = this.id + "BreedInfo";
    //keep track
    this.amt = 0;
    this.max = 4;

    //htmlElems
    this.breedElem = document.getElementById(this.breedId);
    this.shedElem = document.getElementById(this.shedId);
    this.numberElem = document.getElementById(this.numberId);
    this.barElem = document.getElementById(this.barId);
    this.productionElem = document.getElementById(this.productionId);
    this.breedDivElem = document.getElementById(this.breedDivId);
    this.breedInfoElem = document.getElementById(this.breedInfoId);
  }

  run() {
    this.breedDivElem.style.display = "none";
    this.shedElem.style.display = "none";
  }

  check() {
    if (this.amt >= 1 && barnFixed) {
      this.shedElem.style.display = "inline-block";
    }
    if (this.amt >= 2 && barnFixed) {
      this.breedDivElem.style.display = "inline-block";
    }
    this.breedInfoElem.innerHTML = this.breedCost + " corn<br>" + (this.timeoutTime / 1000) + " seconds";
    this.numberElem.innerHTML = this.amt + " / " + this.max + " " + this.id
    var producesString = ""
    for (let i = 0; i < this.produces.length; i++) {
      producesString = producesString + "<br>" + (this.amt * animalMult) + " " + this.produces[i][0].id + " / " + (this.produces[i][1] / 1000) + " sec"
    }
    this.productionElem.innerHTML = producesString
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
    product.increment(this.amt * animalMult);
  }

  changeMax(inc) {
    this.max = this.max + inc;
    this.check();
  }

  breedCostIncrement() {
    this.breedCost++;
    this.check();
  }
}

//animals
Poultry = new Animal("poultry", 60000, 15, [[Grain, 12000, "grain"]]);
Sheep = new Animal("sheep", 90000, 20, [[Corn, 20000, "corn"], [Grain, 120000, "grain"]]);
Horse = new Animal("horse", 75000, 17, [[Stone, 30000, "stone"], [Wood, 200000, "wood"]]);
Cow = new Animal("cow", 90000, 17, [[Wood, 20000, "wood"], [Stone, 200000, "stone"]]);
Dog = new Animal("dog", 105000, 20, [[Money, 15000, "pounds"]]);

Poultry.run()
Sheep.run()
Horse.run()
Cow.run()
Dog.run()

//functions
function barnUnlock() {
  barnButton.style.display = "inline-block";
  Poultry.increment(1);
}

document.getElementById("fixBarn").onclick = function () {
  if (Wood.amt >= 12 && Stone.amt >= 5) {
    Wood.increment(-12);
    Stone.increment(-5);
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
    animalBreedCostIncrease();
    breedProgress(animalClass);
  }
}

function breedProgress(animalClass) {
  var width = 0;
  var id = setInterval(function frame() {
    if (width >= 100) {
      clearInterval(id);
      animalClass.barElem.style.width = "100%";
      animalClass.breedElem.disable = "false";
      animalClass.breedElem.classList.remove("timeout")
      animalClass.increment(3)
    } else {
      width = width + (2500 / animalClass.timeoutTime);
      animalClass.barElem.style.width = (100 - width) + "%";
    }
  }, 25);
}

function animalBreedCostIncrease() {
  Poultry.breedCostIncrement();
  Sheep.breedCostIncrement();
  Horse.breedCostIncrement();
  Cow.breedCostIncrement();
  Dog.breedCostIncrement();
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
      if (animalClass.amt > 0 && barnFixed) {
        animalClass.produce(animalClass.produces[i][0])
      }
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


//glue
var glueButtonDiv = document.getElementById("horseGlueDiv");
var glueButtonElem = document.getElementById("horseGlue");
var glueInfoElem = document.getElementById("horseGlueInfo");
var glueBarElem = document.getElementById("horseGlueBar");
var glueCost = 4;
var glueTimeout = 60000;
glueInfoElem.innerHTML = glueCost + " horses<br>" + (glueTimeout / 1000) + " seconds";

function glue() {
  if (Horse.amt >= glueCost) {
    Horse.increment(-glueCost)
    glueButtonElem.disable = "true";
    glueButtonElem.classList.add("timeout")
    glueProgress();
  }
}

function glueProgress() {
  var width = 0;
  var id = setInterval(function frame() {
    if (width >= 100) {
      clearInterval(id);
      glueBarElem.style.width = "100%";
      glueButtonElem.disable = "false";
      glueButtonElem.classList.remove("timeout")
      Glue.increment(1)
    } else {
      width = width + (2500 / glueTimeout);
      glueBarElem.style.width = (100 - width) + "%";
    }
  }, 25);
}

glueButtonElem.onclick = function () {
  glue()
}


//market stall class
class Stall {
  constructor(buy, nameId, priceId, divId, buttonId) {
    this.buy = buy;
    this.nameId = nameId;
    this.priceId = priceId;
    this.divId = divId;
    this.buttonId = buttonId;

    this.ranges = [1, 1.3, 1.8, 1.5, 25, 30, 27, 28, 32];
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
        this.amount = Math.floor(Math.random() * 10 + 10)
        this.price = Math.floor(Math.random() * 5 + this.amount * this.ranges[listIndex])
        //reduce sell price
        if (!this.buy) {
          this.price = this.price - 5;
        }
      } else if (rand == 1) {
        this.amount = Math.floor(Math.random() * 15 + 20)
        this.price = Math.floor(Math.random() * 10 + this.amount * this.ranges[listIndex])
        //reduce sell price
        if (!this.buy) {
          this.price = this.price - 10;
        }
      } else {
        this.amount = Math.floor(Math.random() * 20 + 40)
        this.price = Math.floor(Math.random() * 15 + this.amount * this.ranges[listIndex])
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
      this.price = Math.floor(Math.random() * 5 + this.ranges[listIndex])
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
  constructor(offers, id) {
    this.offers = offers;
    this.id = id;

    this.titleId = this.id + "OfferTitle";
    this.descId = this.id + "OfferDesc";
    this.talkId = this.id + "TalkButton";
    this.buyId = this.id + "BuyButton";
    this.divId = this.id + "Stall";

    this.activatedOffers = [];
    this.offerNow;
    this.offerIndex;
    this.noOffer = new otherOffers("", [], "Sorry nothing more to offer you today", function () { })
    this.unlocked = false;
    this.titleElem = document.getElementById(this.titleId);
    this.descElem = document.getElementById(this.descId);
    this.talkElem = document.getElementById(this.talkId);
    this.buyElem = document.getElementById(this.buyId);
    this.divElem = document.getElementById(this.divId);
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
    if (this.offerNow.id == "") {
      this.new();
    }
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
    if (enough && !this.offerNow.bought && this.offerNow.id != "") {
      if (this.offerNow.id != "Manifesto") {
        for (let i = 0; i < this.offerNow.price.length; i++) {
          this.offerNow.price[i][0].increment(-1 * this.offerNow.price[i][1])
        }
        this.offerNow.func();
        this.activatedOffers.splice(this.offerIndex, 1);
        green(this);
        this.new()
      } else {
        if (mansionBuilt) {
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
  new otherOffers("Poultry Upgrade", [[Money, 10], [Grain, 20], [Wood, 20], [Stone, 10]], "Let me help you upgrade that poultry coop. It'll house 2 more.", function () { Poultry.changeMax(2); if (sndBarn) { BuilderStall.add(5); } else { sndBarnBacklog.push(5); } }),
  new otherOffers("Sheep Upgrade", [[Money, 10], [Grain, 40], [Wood, 35], [Stone, 20]], "Let me help you upgrade that sheep house. It'll house 2 more.", function () { Sheep.changeMax(2); if (sndBarn) { BuilderStall.add(6); } else { sndBarnBacklog.push(6); } }),
  new otherOffers("Horse Upgrade", [[Money, 10], [Grain, 20], [Wood, 10], [Stone, 30]], "Let me help you upgrade that horse Stable. It'll house 2 more.", function () { Horse.changeMax(2); if (sndBarn) { BuilderStall.add(7); } else { sndBarnBacklog.push(7); } }),
  new otherOffers("Cow Upgrade", [[Money, 10], [Grain, 25], [Wood, 50], [Stone, 5]], "Let me help you upgrade that cow barn. It'll house 2 more.", function () { Cow.changeMax(2); if (sndBarn) { BuilderStall.add(8); } else { sndBarnBacklog.push(8); } }),
  new otherOffers("Dog Upgrade", [[Money, 10], [Grain, 40], [Wood, 50], [Stone, 30]], "Let me help you upgrade that dog kennel. It'll house 2 more.", function () { Dog.changeMax(2); if (sndBarn) { BuilderStall.add(9); } else { sndBarnBacklog.push(9); } }),
  new otherOffers("Poultry Upgrade II", [[Money, 30], [Grain, 30], [Wood, 30], [Stone, 15]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more poultry.", function () { Poultry.changeMax(4) }),
  new otherOffers("Sheep Upgrade II", [[Money, 30], [Grain, 45], [Wood, 40], [Stone, 35]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more sheep.", function () { Sheep.changeMax(4) }),
  new otherOffers("Horse Upgrade II", [[Money, 30], [Grain, 25], [Wood, 15], [Stone, 40]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more horses.", function () { Horse.changeMax(4) }),
  new otherOffers("Cow Upgrade II", [[Money, 30], [Grain, 60], [Wood, 60], [Stone, 20]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more cows.", function () { Cow.changeMax(4) }),
  new otherOffers("Dog Upgrade II", [[Money, 30], [Grain, 60], [Wood, 50], [Stone, 40]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more dogs.", function () { Dog.changeMax(4) }),
  new otherOffers("Machine Fix", [[Money, 100], [Grain, 100], [Wood, 100], [Stone, 100]], "That's a fancy machine, something to do with making glue. I think I could fix that.", function () { glueButtonDiv.style.display = "inline-block"; BuilderStall.add(11) }),
  new otherOffers("Mansion build", [[Money, 100], [Grain, 200], [Wood, 200], [Stone, 200], [Glue, 2]], "You know what, you've been a loyal customer. I'll help you fix up that shabby house.", function () { mansionBuilt = true; document.getElementById("yourFields").innerHTML = "Your Mansion"; }),
], "builder")

ShadyStall = new otherStall([
  new otherOffers("Upgrade", [[Money, 50]], "Take this pill. You'll grow strong, harvest 1 more resource per click", function () { changeClickAmt(1); ShadyStall.add(1); }),
  new otherOffers("Upgrade II", [[Money, 125]], "Drink this up. You'll grow strong, harvest 1 more resource per click", function () { changeClickAmt(1); ShadyStall.add(2); }),
  new otherOffers("Upgrade III", [[Money, 200]], "Say this incantation. You'll grow strong, harvest 1 more resources per click", function () { changeClickAmt(1); ShadyStall.add(3); }),
  new otherOffers("Upgrade IV", [[Money, 250]], "Inject this serum. You'll grow stronger, harvest 1 more resources per click", function () { changeClickAmt(1); ShadyStall.add(4); }),
  new otherOffers("Manifesto", [[Money, 700]], "You've upgraded well. One last thing to give, it'll change you're life but it requires a lot. You'll also need a better house than that shabby little field", function () { manifestoBought() }),
], "shady")

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

function manifestoBought() {
  newAlert("l", "The shady dealer gives you a dusty book. You feel scammed, having paid way too much for just a book. Taking the chance, you wipe the dust. \"Communist Manifesto\" by Karl Marx. What's this and why does it give you a faint memory of times past? Reading it, your mind buzzes with ideas. This is it, this is the pinnacle. You rush back to make change! <br>THE END")
  document.getElementById("title").innerHTML = "Animal Farm 2.0";
}




if (isAdmin) {
  Grain.amt = 1000;
  Wood.amt = 1000;
  Stone.amt = 1000;
  Corn.amt = 1000;
  Money.amt = 2000;
  rw1clm2.buttonHtmlElem.style.display = "inline-block"
  rw1clm3.buttonHtmlElem.style.display = "inline-block"
  rw1clm4.buttonHtmlElem.style.display = "inline-block"
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
  mansionBuilt = false;
}