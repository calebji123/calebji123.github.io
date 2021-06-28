
//constant vars
var infor = document.getElementById("info");
var alertBox = document.getElementById("alertMain");
var alertCloseButton = document.getElementById("alertCloseButton");
var alertMain = document.getElementById("alertMain");
var settingsContent = document.getElementById("settingsContent");
var mess = document.getElementById("alertText");
document.getElementsByClassName("version")[0].innerHTML = "version 0.7.0";
var maxMarket = 6;
var isAdmin = false;


//alert function
var onAlert = false;
var queue = []
function newAlert(size, message) {
  if (message != "Settings") {
    if (!onAlert) {
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
      mess.innerHTML = message;

      alertBox.style.display = "block";
      onAlert = true;
    } else {
      if (mess.innerHTML != message) {
        queue.push([size, message])
      }
    }
  } else {
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
    settingsContent.style.display = "inline-block"
    mess.innerHTML = "";
    alertBox.style.display = "block";
    onAlert = true;
  }
}
alertCloseButton.onclick = function () { closeAlert(); }

function closeAlert() {
  alertBox.style.display = "none";
  settingsContent.style.display = "none"
  onAlert = false;
  if (queue.length > 0) {
    newAlert(queue[0][0], queue[0][1]);
    queue.shift();
  }
}


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



//material buttons class
class MaterialButton {
  constructor(Sdata, id, timeout, message) {
    //input
    this.id = id;
    this.timeoutTime = timeout;
    this.hoverMsg = message;
    //ids
    this.destId = this.id + "s";
    this.barId = this.id + "Bar";
    this.divId = this.id + "ButtonDiv";
    //elements to keep track of
    this.clickAmt = Sdata.clickAmt;
    this.amt = Sdata.amt;
    this.unlocked = Sdata.unlocked;
    this.barWidth = Sdata.barWidth;
    this.disabled = Sdata.disabled;

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
    this.barWidth = 0;
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

  changeClickAmount(amount) {
    this.clickAmt += amount;
  }

  refreshAmount() {
    this.amtDisplayElem.innerHTML = this.amt + " " + this.id;
  }

  unlock() {
    this.divElem.style.display = "inline-block";
  }

  lock() {
    this.divElem.style.display = "none";
  }

  refresh(Sdata) {
    this.clickAmt = Sdata.clickAmt;
    this.amt = Sdata.amt;
    this.unlocked = Sdata.unlocked;
    this.disabled = Sdata.disabled;
    this.barWidth = Sdata.barWidth;
    this.refreshAmount();
    if (this.amt == 0) {
      this.amtDisplayElem.innerHTML = "";
    }
    if (this.unlocked) {
      this.unlock();
    } else {
      this.lock()
    }
    if (this.barWidth != 0) {
      progress(this)
    } else {
      this.barElem.style.width = "0%"
      this.disabled = false
    }
  }

}

//other items class
class Item {
  constructor(Sdata, id, amtId) {
    this.id = id
    this.destId = amtId;
    this.amt = Sdata.amt;
    this.data = Sdata;

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

  refresh(Sdata) {
    this.amt = Sdata.amt;
    if (this.amt > 0) {
      this.refreshAmount();
    } else {
      this.amtDisplayElem.innerHTML = ""
    }
  }
}

//map tile class
class MapTile {
  constructor(Sdata, cost, id, nameId, message, messageSize) {
    this.cost = cost;
    this.id = id;
    this.buttonId = id + "button";
    this.nameId = nameId;
    this.message = message;
    this.messageSize = messageSize;
    this.toolId = "textTooltip" + this.id;
    this.divHtmlElem = document.getElementById(this.id);
    this.buttonHtmlElem = document.getElementById(this.buttonId);
    this.nameHtmlElem = document.getElementById(this.nameId);
    this.toolElem = document.getElementById(this.toolId);
    //keep track
    this.unlocked = Sdata.unlocked;
    this.bought = Sdata.bought;

    this.divHtmlElem.style.border = "none"
    this.nameHtmlElem.style.display = "none";
    this.buttonHtmlElem.style.display = "none";
    this.toolElem.innerHTML = this.cost + " grain";
    if (this.unlocked) {
      this.unlock();
    }
  }

  unlock() {
    this.divHtmlElem.style.border = "1px solid black";
    if (!this.bought) {
      this.buttonHtmlElem.style.display = "inline-block";
    }
    this.unlocked = true;
  }

  lock() {
    this.divHtmlElem.style.border = "none";
    this.buttonHtmlElem.style.display = "none";
    this.unlocked = false;
  }

  boughtDis() {
    this.buttonHtmlElem.style.display = "none";
    this.nameHtmlElem.style.display = "inline-block";
  }

  unBought() {
    this.buttonHtmlElem.style.display = "inline-block";
    this.nameHtmlElem.style.display = "none";
  }

  refresh(Sdata) {
    this.unlocked = Sdata.unlocked;
    this.bought = Sdata.bought;
    if (this.bought) {
      this.boughtDis();
    } else {
      this.unBought();
    }
    if (this.unlocked) {
      this.unlock();
    } else {
      this.lock()
    }
  }
}

//animal classes
class Animal {
  constructor(Sdata, id, breedTimeout, produces) {
    this.id = id
    this.timeoutTime = breedTimeout;
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
    this.amt = Sdata.amt;
    this.max = Sdata.max;
    this.breedCost = Sdata.breedCost;
    this.barWidth = Sdata.barWidth;
    this.isBreeding = Sdata.isBreeding;

    //htmlElems
    this.breedElem = document.getElementById(this.breedId);
    this.shedElem = document.getElementById(this.shedId);
    this.numberElem = document.getElementById(this.numberId);
    this.barElem = document.getElementById(this.barId);
    this.productionElem = document.getElementById(this.productionId);
    this.breedDivElem = document.getElementById(this.breedDivId);
    this.breedInfoElem = document.getElementById(this.breedInfoId);

    this.breedDivElem.style.display = "none";
    this.shedElem.style.display = "none";
  }

  check() {
    if (this.amt >= 1 && tData.barnFixed) {
      this.shedElem.style.display = "inline-block";
    }
    if (this.amt >= 2 && tData.barnFixed) {
      this.breedDivElem.style.display = "inline-block";
    }
    this.breedInfoElem.innerHTML = this.breedCost + " corn<br>" + (this.timeoutTime / 1000) + " seconds";
    this.numberElem.innerHTML = this.amt + " / " + this.max + " " + this.id
    var producesString = ""
    for (let i = 0; i < this.produces.length; i++) {
      producesString = producesString + "<br>" + (this.amt * tData.animalMult) + " " + this.produces[i][0].id + " / " + (this.produces[i][1] / 1000) + " sec"
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
    product.increment(this.amt * tData.animalMult);
  }

  changeMax(inc) {
    this.max = this.max + inc;
    this.check();
  }

  breedCostIncrement() {
    this.breedCost++;
    this.check();
  }

  refresh(Sdata) {
    this.amt = Sdata.amt;
    this.max = Sdata.max;
    this.barWidth = Sdata.barWidth;
    this.isBreeding = Sdata.isBreeding;
    if (this.isBreeding) {
      this.breedDivElem.style.display = "inline-block";
      this.shedElem.style.display = "inline-block";
      breedProgress(this);
    }
    this.check();
  }
}

//market stall class
class Stall {
  constructor(Sdata, buy, nameId, priceId, divId, buttonId) {
    this.buy = buy;
    this.nameId = nameId;
    this.priceId = priceId;
    this.divId = divId;
    this.buttonId = buttonId;
    this.ranges = [1, 1.3, 1.8, 1.5, 25, 30, 27, 28, 32];
    //keep track
    this.type = Sdata.type;
    this.price = Sdata.price;
    this.amount = Sdata.amount;

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
        this.type = 0;
        listIndex = 0;
      } else if (rand == 1) {
        this.type = 1;
        listIndex = 1;
      } else if (rand == 2) {
        this.type = 2;
        listIndex = 2;
      } else {
        this.type = 3;
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
        this.type = 6;
        this.amount = 1;
        listIndex = 4;
      } else if (rand == 1) {
        this.type = 7;
        this.amount = 1;
        listIndex = 5;
      } else if (rand == 2) {
        this.type = 8;
        this.amount = 1;
        listIndex = 6;
      } else if (rand == 3) {
        this.type = 9;
        this.amount = 1;
        listIndex = 7;
      } else {
        this.type = 10;
        this.amount = 1;
        listIndex = 8;
      }
      this.price = Math.floor(Math.random() * 5 + this.ranges[listIndex])
    }
    this.display()
  }

  display() {
    if (tData.marketOpen) {
      this.nameElem.innerHTML = this.amount + " " + marketTypes[this.type].id;
      this.priceElem.innerHTML = this.price + " pounds";
    }
  }

  interact() {
    if (currentMarketInteraction < maxMarket) {
      if (this.buy) {
        if (Money.amt >= this.price) {
          Money.increment(-this.price)
          marketTypes[this.type].increment(this.amount)
          green(this)
          currentMarketInteraction++;
          document.getElementById("interactionsLeft").innerHTML = "Can buy/sell " + (maxMarket - currentMarketInteraction) + " more times";
        } else {
          red(this, [[Money.id, this.price - Money.amt]])
        }
      } else {
        if (marketTypes[this.type].amt >= this.amount) {
          Money.increment(this.price);
          marketTypes[this.type].increment(-this.amount)
          green(this)
          currentMarketInteraction++;
          document.getElementById("interactionsLeft").innerHTML = "Can buy/sell " + (maxMarket - currentMarketInteraction) + " more times";
        } else {
          red(this, [[marketTypes[this.type].id, this.amount - marketTypes[this.type].amt]])
        }
      }
    } else {
      red(this, []);
      newAlert("s", "Used up daily interactions, cannot buy/sell anymore")
    }
  }

  refresh(Sdata) {
    this.type = Sdata.type;
    this.price = Sdata.price;
    this.amount = Sdata.amount;
    this.display();
  }
}

//other side market stall class
class otherStall {
  constructor(Sdata, offers, id) {
    this.offers = offers;
    this.id = id;
    this.titleId = this.id + "OfferTitle";
    this.descId = this.id + "OfferDesc";
    this.talkId = this.id + "TalkButton";
    this.buyId = this.id + "BuyButton";
    this.divId = this.id + "Stall";
    this.talked = false;
    //keep track
    this.activatedOffers = Sdata.activatedOffers;
    this.offerNow = Sdata.offerNow;
    this.offerIndex = Sdata.offerIndex;
    this.unlocked = Sdata.unlocked;

    this.noOffer = new otherOffers(false, "", [], "Sorry nothing more to offer you today", function () { })
    this.titleElem = document.getElementById(this.titleId);
    this.descElem = document.getElementById(this.descId);
    this.talkElem = document.getElementById(this.talkId);
    this.buyElem = document.getElementById(this.buyId);
    this.divElem = document.getElementById(this.divId);
  }

  new() {
    if (this.unlocked) {
      if (this.activatedOffers.length > 0) {
        var newIndex = Math.floor(Math.random() * this.activatedOffers.length)
        this.offerIndex = newIndex;
        this.changeOffer(this.offers[this.activatedOffers[newIndex]])
      } else {
        this.changeOffer(this.noOffer);
      }
      this.talked = false
    }
  }

  changeOffer(offerClass) {
    this.offerNow = offerClass
    this.titleElem.innerHTML = this.offerNow.id
    if (this.offerNow.id != "") {
      var prices = "Cost:"
      for (let i = 0; i < this.offerNow.price.length; i++) {
        prices = prices + "<br>" + this.offerNow.price[i][1] + " " + this.offerNow.price[i][0].id;
      }
    } else {
      prices = ""
    }
    this.descElem.innerHTML = prices
  }

  add(index) {
    this.activatedOffers.push(index);
    if (this.offerNow.id == "") {
      this.new();
    }
  }

  talk() {
    var msg = [
      "You're doing great!",
      "You're cool.",
      "Keep on pushing through",
      "Why don't you buy something already?",
      "I like you",
      "How are you doing?",
      "I do like money",
      "Please give me your money",
      "I was involved in a cult once",
      "Howdy Do?"
    ]
    if (!this.talked) {
      newAlert("s", this.offerNow.message);
      this.talked = true;
    } else {
      if (Math.floor(Math.random() * 4) == 0) {
        newAlert("s", this.offerNow.message);
      } else {
        newAlert("s", msg[Math.floor(Math.random() * msg.length)])
      }
    }
  }

  unlock() {
    document.getElementById("switchButton").style.display = "inline-block";
    this.divElem.style.display = "inline-block";
  }

  buy() {
    var enough = true;
    var missing = [];
    for (let i = 0; i < this.offerNow.price.length; i++) {
      if (this.offerNow.price[i][0].amt < this.offerNow.price[i][1]) {
        enough = false;
        missing.push([this.offerNow.price[i][0].id, this.offerNow.price[i][1] - this.offerNow.price[i][0].amt]);
      }
    }

    if (enough && !this.offerNow.bought && this.offerNow.id != "") {
      if (this.offerNow.id != "Manifesto") {
        for (let i = 0; i < this.offerNow.price.length; i++) {
          var price = this.offerNow.price[i][0]
          price.increment(-1 * this.offerNow.price[i][1])
        }
        this.offerNow.func();
        this.activatedOffers.splice(this.offerIndex, 1);
        green(this);
        this.new()
      } else {
        if (tData.mansionBuilt) {
          for (let i = 0; i < this.offerNow.price.length; i++) {
            this.offerNow.price[i][0].increment(-1 * this.offerNow.price[i][1])
          }
          this.offerNow.func();
          this.activatedOffers.splice(this.offerIndex, 1);
          green(this);
          this.new()
        } else {
          red(this, missing);
        }
      }
    } else {
      red(this, missing);
    }
  }

  refresh(Sdata, stallData) {
    this.activatedOffers = Sdata.activatedOffers;
    this.offerNow = Sdata.offerNow;
    this.offerIndex = Sdata.offerIndex;
    this.unlocked = Sdata.unlocked;
    if (this.unlocked) {
      this.unlock();
      if (this.offerIndex != -1) {
        this.changeOffer(this.offers[this.activatedOffers[this.offerIndex]]);
      } else {
        this.changeOffer(this.noOffer);
      }
    }

    for (let i = 0; i < this.offers.length; i++) {
      this.offers[i].refresh(stallData[i]);
    }
  }
}

class otherOffers {
  constructor(Sdata, id, price, message, func) {
    this.id = id;
    this.price = price;
    this.message = message;
    this.func = func;
    this.bought = Sdata;
  }

  refresh(Sdata) {
    this.bought = Sdata;
  }
}

const startingData = {
  Resources: {
    Money: {
      amt: 0
    },
    Glue: {
      amt: 0
    },
    Grain: {
      clickAmt: 1,
      amt: 0,
      unlocked: true,
      disabled: false,
      barWidth: 0,
    },
    Wood: {
      clickAmt: 1,
      amt: 0,
      unlocked: false,
      disabled: false,
      barWidth: 0,
    },
    Stone: {
      clickAmt: 1,
      amt: 0,
      unlocked: false,
      disabled: false,
      barWidth: 0,
    },
    Corn: {
      clickAmt: 1,
      amt: 0,
      unlocked: false,
      disabled: false,
      barWidth: 0,
    },
  },
  MapTiles: {
    rw1clm2: {
      unlocked: false,
      bought: false,
    },
    rw1clm3: {
      unlocked: false,
      bought: false,
    },
    rw1clm4: {
      unlocked: false,
      bought: false,
    },
    rw2clm1: {
      unlocked: false,
      bought: false,
    },
    rw2clm2: {
      unlocked: false,
      bought: false,
    },
    rw2clm3: {
      unlocked: true,
      bought: false,
    },
    rw2clm4: {
      unlocked: false,
      bought: false,
    },
    rw2clm5: {
      unlocked: false,
      bought: false,
    },
    rw3clm2: {
      unlocked: true,
      bought: false,
    },
    rw3clm4: {
      unlocked: true,
      bought: false,
    },
    rw4clm1: {
      unlocked: false,
      bought: false,
    },
    rw4clm2: {
      unlocked: false,
      bought: false,
    },
    rw4clm3: {
      unlocked: true,
      bought: false,
    },
    rw4clm4: {
      unlocked: false,
      bought: false,
    },
    rw4clm5: {
      unlocked: false,
      bought: false,
    },
  },
  Animals: {
    Poultry: {
      amt: 0,
      max: 4,
      breedCost: 15,
      barWidth: 0,
      isBreeding: false,
    },
    Sheep: {
      amt: 0,
      max: 4,
      breedCost: 20,
      barWidth: 0,
      isBreeding: false,
    },
    Horse: {
      amt: 0,
      max: 4,
      breedCost: 17,
      barWidth: 0,
      isBreeding: false,
    },
    Cow: {
      amt: 0,
      max: 4,
      breedCost: 17,
      barWidth: 0,
      isBreeding: false,
    },
    Dog: {
      amt: 0,
      max: 4,
      breedCost: 20,
      barWidth: 0,
      isBreeding: false,
    },
  },
  MarketStalls: {
    BuyStall1: {
      type: null,
      price: null,
      amount: null,
    },
    BuyStall2: {
      type: null,
      price: null,
      amount: null,
    },
    BuyStall3: {
      type: null,
      price: null,
      amount: null,
    },
    SellStall1: {
      type: null,
      price: null,
      amount: null,
    },
    SellStall2: {
      type: null,
      price: null,
      amount: null,
    },
    SellStall3: {
      type: null,
      price: null,
      amount: null,
    },
  },
  OtherSideMarket: {
    BuilderStall: {
      activatedOffers: [],
      offerNow: new otherOffers(false, "", [], "Sorry nothing more to offer you today", function () { }),
      unlocked: false,
      offerIndex: -1,
    },
    BuilderStallOffers: {
      Poultry: false,
      Sheep: false,
      Horse: false,
      Cow: false,
      Dog: false,
      Poultry2: false,
      Sheep2: false,
      Horse2: false,
      Cow2: false,
      Dog2: false,
      Machine: false,
      Mansion: false,
    },
    ShadyStallOffers: {
      Upgrade: false,
      Upgrade2: false,
      Upgrade3: false,
      Upgrade4: false,
      Manifesto: false
    },
    ShadyStall: {
      activatedOffers: [],
      offerNow: new otherOffers(false, "", [], "Sorry nothing more to offer you today", function () { }),
      unlocked: false,
      offerIndex: -1,
    },
  },
  TrackedVars: {
    clicked: false,
    findMap: false,
    barnFixed: false,
    barnUnlocked: false,
    marketOpen: false,

    sndBarn: false,
    sndBarnBacklog: [],
    mansionBuilt: false,
    animalMult: 1,
    title: "A Lone Field"
  },
  TimingVars: {
    MarketTime: 180000,
  }
};

var data = JSON.parse(JSON.stringify(startingData));

function newData() {
  dataNew = {
    Resources: {
      Money: {
        amt: Money.amt
      },
      Glue: {
        amt: Glue.amt
      },
      Grain: {
        clickAmt: Grain.clickAmt,
        amt: Grain.amt,
        unlocked: Grain.unlocked,
        disabled: Grain.disabled,
        barWidth: Grain.barWidth,
      },
      Wood: {
        clickAmt: Wood.clickAmt,
        amt: Wood.amt,
        unlocked: Wood.unlocked,
        disabled: Wood.disabled,
        barWidth: Wood.barWidth,
      },
      Stone: {
        clickAmt: Stone.clickAmt,
        amt: Stone.amt,
        unlocked: Stone.unlocked,
        disabled: Stone.disabled,
        barWidth: Stone.barWidth,
      },
      Corn: {
        clickAmt: Corn.clickAmt,
        amt: Corn.amt,
        unlocked: Corn.unlocked,
        disabled: Corn.disabled,
        barWidth: Corn.barWidth,
      },
    },
    MapTiles: {
      rw1clm2: {
        unlocked: rw1clm2.unlocked,
        bought: rw1clm2.bought,
      },
      rw1clm3: {
        unlocked: rw1clm3.unlocked,
        bought: rw1clm3.bought,
      },
      rw1clm4: {
        unlocked: rw1clm4.unlocked,
        bought: rw1clm4.bought,
      },
      rw2clm1: {
        unlocked: rw2clm1.unlocked,
        bought: rw2clm1.bought,
      },
      rw2clm2: {
        unlocked: rw2clm2.unlocked,
        bought: rw2clm2.bought,
      },
      rw2clm3: {
        unlocked: rw2clm3.unlocked,
        bought: rw2clm3.bought,
      },
      rw2clm4: {
        unlocked: rw2clm4.unlocked,
        bought: rw2clm4.bought,
      },
      rw2clm5: {
        unlocked: rw2clm5.unlocked,
        bought: rw2clm5.bought,
      },
      rw3clm2: {
        unlocked: rw3clm2.unlocked,
        bought: rw3clm2.bought,
      },
      rw3clm4: {
        unlocked: rw3clm4.unlocked,
        bought: rw3clm4.bought,
      },
      rw4clm1: {
        unlocked: rw4clm1.unlocked,
        bought: rw4clm1.bought,
      },
      rw4clm2: {
        unlocked: rw4clm2.unlocked,
        bought: rw4clm2.bought,
      },
      rw4clm3: {
        unlocked: rw4clm3.unlocked,
        bought: rw4clm3.bought,
      },
      rw4clm4: {
        unlocked: rw4clm4.unlocked,
        bought: rw4clm4.bought,
      },
      rw4clm5: {
        unlocked: rw4clm5.unlocked,
        bought: rw4clm5.bought,
      },
    },
    Animals: {
      Poultry: {
        amt: Poultry.amt,
        max: Poultry.max,
        breedCost: Poultry.breedCost,
        barWidth: Poultry.barWidth,
        isBreeding: Poultry.isBreeding,
      },
      Sheep: {
        amt: Sheep.amt,
        max: Sheep.max,
        breedCost: Sheep.breedCost,
        barWidth: Sheep.barWidth,
        isBreeding: Sheep.isBreeding,
      },
      Horse: {
        amt: Horse.amt,
        max: Horse.max,
        breedCost: Horse.breedCost,
        barWidth: Horse.barWidth,
        isBreeding: Horse.isBreeding,
      },
      Cow: {
        amt: Cow.amt,
        max: Cow.max,
        breedCost: Cow.breedCost,
        barWidth: Cow.barWidth,
        isBreeding: Cow.isBreeding,
      },
      Dog: {
        amt: Dog.amt,
        max: Dog.max,
        breedCost: Dog.breedCost,
        barWidth: Dog.barWidth,
        isBreeding: Dog.isBreeding,
      },
    },
    MarketStalls: {
      BuyStall1: {
        type: BuyStall1.type,
        price: BuyStall1.price,
        amount: BuyStall1.amount,
      },
      BuyStall2: {
        type: BuyStall2.type,
        price: BuyStall2.price,
        amount: BuyStall2.amount,
      },
      BuyStall3: {
        type: BuyStall3.type,
        price: BuyStall3.price,
        amount: BuyStall3.amount,
      },
      SellStall1: {
        type: SellStall1.type,
        price: SellStall1.price,
        amount: SellStall1.amount,
      },
      SellStall2: {
        type: SellStall2.type,
        price: SellStall2.price,
        amount: SellStall2.amount,
      },
      SellStall3: {
        type: SellStall3.type,
        price: SellStall3.price,
        amount: SellStall3.amount,
      },
    },
    OtherSideMarket: {
      BuilderStall: {
        activatedOffers: BuilderStall.activatedOffers,
        offerNow: BuilderStall.offerNow,
        unlocked: BuilderStall.unlocked,
        offerIndex: BuilderStall.offerIndex,
      },
      BuilderStallOffers: {
        Poultry: BuilderStall.offers[0].bought,
        Sheep: BuilderStall.offers[1].bought,
        Horse: BuilderStall.offers[2].bought,
        Cow: BuilderStall.offers[3].bought,
        Dog: BuilderStall.offers[4].bought,
        Poultry2: BuilderStall.offers[5].bought,
        Sheep2: BuilderStall.offers[6].bought,
        Horse2: BuilderStall.offers[7].bought,
        Cow2: BuilderStall.offers[8].bought,
        Dog2: BuilderStall.offers[9].bought,
        Machine: BuilderStall.offers[10].bought,
        Mansion: BuilderStall.offers[11].bought,
      },
      ShadyStallOffers: {
        Upgrade: ShadyStall.offers[0].bought,
        Upgrade2: ShadyStall.offers[1].bought,
        Upgrade3: ShadyStall.offers[2].bought,
        Upgrade4: ShadyStall.offers[3].bought,
        Manifesto: ShadyStall.offers[4].bought
      },
      ShadyStall: {
        activatedOffers: ShadyStall.activatedOffers,
        offerNow: ShadyStall.offerNow,
        unlocked: ShadyStall.unlocked,
        offerIndex: ShadyStall.offerIndex,
      },
    },
    TrackedVars: {
      clicked: tData.clicked,
      findMap: tData.findMap,
      barnFixed: tData.barnFixed,
      barnUnlocked: tData.barnUnlocked,
      marketOpen: tData.marketOpen,
      sndBarn: tData.sndBarn,
      sndBarnBacklog: tData.sndBarnBacklog,
      mansionBuilt: tData.mansionBuilt,
      animalMult: tData.animalMult,
      title: tData.title
    },
    TimingVars: {
      MarketTime: timData.MarketTime,
    }
  }
  return dataNew;
}

var resData = data.Resources;
var mapData = data.MapTiles;
var animData = data.Animals;
var markData = data.MarketStalls;
var othData = data.OtherSideMarket;
var tData = data.TrackedVars;
var timData = data.TimingVars;
var bstall = othData.BuilderStallOffers
var sstall = othData.ShadyStallOffers

function setVars() {
  resData = data.Resources;
  mapData = data.MapTiles;
  animData = data.Animals;
  markData = data.MarketStalls;
  othData = data.OtherSideMarket;
  tData = data.TrackedVars;
  timData = data.TimingVars;
  bstall = othData.BuilderStallOffers
  sstall = othData.ShadyStallOffers
}


//title
document.getElementById("title").innerHTML = tData.title;

//items
let Money = new Item(resData.Money, "pounds", "money");
let Glue = new Item(resData.Glue, "glue", "glue");

//the four button classes
let Grain = new MaterialButton(resData.Grain, "grain", 5000, "Harvest the wheat. Increase the production.");
let Wood = new MaterialButton(resData.Wood, "wood", 12000, "The tree goes oof. Wait you did this without a tool? wowza");
let Stone = new MaterialButton(resData.Stone, "stone", 20000, "Mine the stone! You will work harder!");
let Corn = new MaterialButton(resData.Corn, "corn", 8000, "What ripe juicy corn");
var resources = [Grain, Wood, Stone, Corn, Money, Glue];

//map classes
let rw1clm2 = new MapTile(mapData.rw1clm2, 25, "rw1clm2", "cowField", "Another cow is seen in the distance. You call to him, he decides to work for you<br>+1 cow", "s");
let rw1clm3 = new MapTile(mapData.rw1clm3, 40, "rw1clm3", "stable", "A stable is seen in the distance. Around it, a number of animals mill, barely surviving in the field and stable. More comrades join your society. <br>+1 horse <br>+1 cow", "m");
let rw1clm4 = new MapTile(mapData.rw1clm4, 25, "rw1clm4", "sheepField", "A sheep is milling around, you tell him about your up and coming society <br>+1 sheep", "s");
let rw2clm1 = new MapTile(mapData.rw2clm1, 75, "rw2clm1", "newBarn", "Another barn appears, ideas of expansion fill your head. You're skills won't be enough to repair this. <br>lvl 2 barn upgrades unlocked", "s");
let rw2clm2 = new MapTile(mapData.rw2clm2, 30, "rw2clm2", "animals", "You see a party of animals hanging out, you convince them to join your farm<br>+1 horse<br>+1 poultry", "m");
let rw2clm3 = new MapTile(mapData.rw2clm3, 16, "rw2clm3", "barn", "An old rickety worn down barn stands in a clearing. You see some animals roaming, and an idea pops into your head. You promise the nearest poultry to you equality and freedom<br>+1 poultry", "m");
let rw2clm4 = new MapTile(mapData.rw2clm4, 20, "rw2clm4", "cornField", "A field is seen spanning an acre. It's already planted and overripe are corn. Animals seem to love this food in many ways. A sheep and a chicken join your cause<br>+1 sheep<br>+1 poultry", "m");
let rw2clm5 = new MapTile(mapData.rw2clm5, 60, "rw2clm5", "dealer", "A shady dealer tells you to meet him in the market if you want to grow strong", "s");
let rw3clm2 = new MapTile(mapData.rw3clm2, 10, "rw3clm2", "birchForest", "You found a Birch Forest! You learned how to gather wood!", "s");
let rw3clm4 = new MapTile(mapData.rw3clm4, 12, "rw3clm4", "quarry", "You found a quarry! You learned how to gather stone!", "s");
let rw4clm1 = new MapTile(mapData.rw4clm1, 50, "rw4clm1", "builder", "A quaint shop is along the side of the road. In it a skilled builder tells you to make any request you want, at a price.", "m");
let rw4clm2 = new MapTile(mapData.rw4clm2, 25, "rw4clm2", "market", "You reach a town, it's bustling market road entices you. The sheer amount of resources make your senses tingle", "m");
let rw4clm3 = new MapTile(mapData.rw4clm3, 20, "rw4clm3", "road", "This seems like a main road. On the side is a dog, looking cute. He agrees to join your society, giving you his busking earnings.<br>+10 pounds<br>+1 dog", "m");
let rw4clm4 = new MapTile(mapData.rw4clm4, 40, "rw4clm4", "roadNothing", "The road continues on for miles. Nothing happens and nothing is happening, is there nothing here?<br>+1 dog", "s");
let rw4clm5 = new MapTile(mapData.rw4clm5, 150, "rw4clm5", "machine", "The road did lead somewhere, a worn down machine. You're skills won't be enough to repair this. You convince the guard dog to help you out", "s");
var mapTiles = [rw1clm2, rw1clm3, rw1clm4, rw2clm1, rw2clm2, rw2clm3, rw2clm4, rw2clm5, rw3clm2, rw3clm4, rw4clm1, rw4clm2, rw4clm3, rw4clm4, rw4clm5];

//barn classes
let Poultry = new Animal(animData.Poultry, "poultry", 60000, [[Grain, 12000, "grain"]]);
let Sheep = new Animal(animData.Sheep, "sheep", 90000, [[Corn, 20000, "corn"], [Grain, 120000, "grain"]]);
let Horse = new Animal(animData.Horse, "horse", 75000, [[Stone, 30000, "stone"], [Wood, 200000, "wood"]]);
let Cow = new Animal(animData.Cow, "cow", 90000, [[Wood, 20000, "wood"], [Stone, 200000, "stone"]]);
let Dog = new Animal(animData.Dog, "dog", 105000, [[Money, 15000, "pounds"]]);
var animals = [Poultry, Sheep, Horse, Cow, Dog];
var marketTypes = [Grain, Wood, Stone, Corn, Money, Glue, Poultry, Sheep, Horse, Cow, Dog]

//market stall classes
let BuyStall1 = new Stall(markData.BuyStall1, true, "marketItemNameStall1", "marketItemPriceStall1", "marketBuy1", "buyStall1")
let BuyStall2 = new Stall(markData.BuyStall2, true, "marketItemNameStall2", "marketItemPriceStall2", "marketBuy2", "buyStall2")
let BuyStall3 = new Stall(markData.BuyStall3, true, "marketItemNameStall3", "marketItemPriceStall3", "marketBuy3", "buyStall3")
let SellStall1 = new Stall(markData.SellStall1, false, "marketItemNameStallSell1", "marketItemPriceStallSell1", "marketSell1", "sellStall1")
let SellStall2 = new Stall(markData.SellStall2, false, "marketItemNameStallSell2", "marketItemPriceStallSell2", "marketSell2", "sellStall2")
let SellStall3 = new Stall(markData.SellStall3, false, "marketItemNameStallSell3", "marketItemPriceStallSell3", "marketSell3", "sellStall3")
var stalls = [BuyStall1, BuyStall2, BuyStall3, SellStall1, SellStall2, SellStall3]
  ;
var bstall = othData.BuilderStallOffers
let BuilderStall = new otherStall(othData.BuilderStall, [
  new otherOffers(bstall.Poultry, "Poultry Upgrade", [[Money, 10], [Grain, 20], [Wood, 20], [Stone, 10]], "Let me help you upgrade that poultry coop. It'll house 2 more.", function () { Poultry.changeMax(2); if (tData.sndBarn) { BuilderStall.add(5); } else { tData.sndBarnBacklog.push(5); } }),
  new otherOffers(bstall.Sheep, "Sheep Upgrade", [[Money, 10], [Grain, 40], [Wood, 35], [Stone, 20]], "Let me help you upgrade that sheep house. It'll house 2 more.", function () { Sheep.changeMax(2); if (tData.sndBarn) { BuilderStall.add(6); } else { tData.sndBarnBacklog.push(6); } }),
  new otherOffers(bstall.Horse, "Horse Upgrade", [[Money, 10], [Grain, 20], [Wood, 10], [Stone, 30]], "Let me help you upgrade that horse Stable. It'll house 2 more.", function () { Horse.changeMax(2); if (tData.sndBarn) { BuilderStall.add(7); } else { tData.sndBarnBacklog.push(7); } }),
  new otherOffers(bstall.Cow, "Cow Upgrade", [[Money, 10], [Grain, 25], [Wood, 50], [Stone, 5]], "Let me help you upgrade that cow barn. It'll house 2 more.", function () { Cow.changeMax(2); if (tData.sndBarn) { BuilderStall.add(8); } else { tData.sndBarnBacklog.push(8); } }),
  new otherOffers(bstall.Dog, "Dog Upgrade", [[Money, 10], [Grain, 40], [Wood, 50], [Stone, 30]], "Let me help you upgrade that dog kennel. It'll house 2 more.", function () { Dog.changeMax(2); if (tData.sndBarn) { BuilderStall.add(9); } else { tData.sndBarnBacklog.push(9); } }),
  new otherOffers(bstall.Poultry2, "Poultry Upgrade II", [[Money, 30], [Grain, 30], [Wood, 30], [Stone, 15]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more poultry.", function () { Poultry.changeMax(4) }),
  new otherOffers(bstall.Sheep2, "Sheep Upgrade II", [[Money, 30], [Grain, 45], [Wood, 40], [Stone, 35]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more sheep.", function () { Sheep.changeMax(4) }),
  new otherOffers(bstall.Horse2, "Horse Upgrade II", [[Money, 30], [Grain, 25], [Wood, 15], [Stone, 40]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more horses.", function () { Horse.changeMax(4) }),
  new otherOffers(bstall.Cow2, "Cow Upgrade II", [[Money, 30], [Grain, 60], [Wood, 60], [Stone, 20]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more cows.", function () { Cow.changeMax(4) }),
  new otherOffers(bstall.Dog2, "Dog Upgrade II", [[Money, 30], [Grain, 60], [Wood, 50], [Stone, 40]], "I see you got another wrecked barn, let me help you fix part of that. It'll house 3 more dogs.", function () { Dog.changeMax(4) }),
  new otherOffers(bstall.Machine, "Machine Fix", [[Money, 100], [Grain, 100], [Wood, 100], [Stone, 100]], "That's a fancy machine, something to do with making glue. I think I could fix that.", function () { glueButtonDiv.style.display = "inline-block"; BuilderStall.add(11) }),
  new otherOffers(bstall.Mansion, "Mansion build", [[Money, 100], [Grain, 200], [Wood, 200], [Stone, 200], [Glue, 2]], "You know what, you've been a loyal customer. I'll help you fix up that shabby house.", function () { tData.mansionBuilt = true; document.getElementById("yourFields").innerHTML = "Your Mansion"; }),
], "builder")
var sstall = othData.ShadyStallOffers
let ShadyStall = new otherStall(othData.ShadyStall, [
  new otherOffers(sstall.Upgrade, "Upgrade", [[Money, 50]], "Take this pill. You'll grow strong, harvest 1 more resource per click", function () { changeClickAmt(1); ShadyStall.add(1); }),
  new otherOffers(sstall.Upgrade2, "Upgrade II", [[Money, 125]], "Drink this up. You'll grow strong, harvest 1 more resource per click", function () { changeClickAmt(1); ShadyStall.add(2); }),
  new otherOffers(sstall.Upgrade3, "Upgrade III", [[Money, 200]], "Say this incantation. You'll grow strong, harvest 1 more resources per click", function () { changeClickAmt(1); ShadyStall.add(3); }),
  new otherOffers(sstall.Upgrade4, "Upgrade IV", [[Money, 250]], "Inject this serum. You'll grow stronger, harvest 1 more resources per click", function () { changeClickAmt(1); ShadyStall.add(4); }),
  new otherOffers(sstall.Maifesto, "Manifesto", [[Money, 700]], "You've upgraded well. One last thing to give, it'll change you're life but it requires a lot. You'll also need a better house than that shabby little field", function () { manifestoBought() }),
], "shady")
var othStalls = [BuilderStall, ShadyStall];

//save and load
function save() {
  data = newData()
  localStorage.setItem("saveData", JSON.stringify(data));
  console.log("saved", localStorage.getItem("saveData"))
  var saveText = document.getElementById("saveText")
  saveText.style.opacity = "1";
  var opacity = 1
  setTimeout(function () {
    var reduce = setInterval(function () {
      opacity -= 0.01;
      saveText.style.opacity = String(opacity);
      if (opacity <= 0) {
        clearInterval(reduce)
      }
    }, 25)
  }, 2000)
}
function clearSave() {
  data = JSON.parse(JSON.stringify(startingData));
  localStorage.setItem("saveData", JSON.stringify(data));
  console.log(startingData);
  stopIntervals();
  startSaving();
  useData();
}
function load() {
  var gameLoad = localStorage.getItem("saveData");
  if (gameLoad != null) {
    data = JSON.parse(gameLoad);
    console.log("loaded", data)
    useData();
  }
}
load();

function startSaving() {
  setInterval(function () {
    save();
  }, 16000)
}

startSaving();


function stopIntervals() {
  var highestIntervalId = setInterval(";");
  for (var i = 0; i < highestIntervalId; i++) {
    clearInterval(i);
  }
}

function useData() {
  setVars();
  //title
  document.getElementById("title").innerHTML = tData.title;

  Money.refresh(resData.Money);
  Glue.refresh(resData.Glue)
  Grain.refresh(resData.Grain);
  Wood.refresh(resData.Wood);
  Stone.refresh(resData.Stone);
  Corn.refresh(resData.Corn);

  rw1clm2.refresh(mapData.rw1clm2)
  rw1clm3.refresh(mapData.rw1clm3)
  rw1clm4.refresh(mapData.rw1clm4)
  rw2clm1.refresh(mapData.rw2clm1)
  rw2clm2.refresh(mapData.rw2clm2)
  rw2clm3.refresh(mapData.rw2clm3)
  rw2clm4.refresh(mapData.rw2clm4)
  rw2clm5.refresh(mapData.rw2clm5)
  rw3clm2.refresh(mapData.rw3clm2)
  rw3clm4.refresh(mapData.rw3clm4)
  rw4clm1.refresh(mapData.rw4clm1)
  rw4clm2.refresh(mapData.rw4clm2)
  rw4clm3.refresh(mapData.rw4clm3)
  rw4clm4.refresh(mapData.rw4clm4)
  rw4clm5.refresh(mapData.rw4clm5)

  Poultry.refresh(animData.Poultry);
  Sheep.refresh(animData.Sheep);
  Horse.refresh(animData.Horse);
  Cow.refresh(animData.Cow);
  Dog.refresh(animData.Dog);

  //market stall classes
  BuyStall1.refresh(markData.BuyStall1)
  BuyStall2.refresh(markData.BuyStall2)
  BuyStall3.refresh(markData.BuyStall3)
  SellStall1.refresh(markData.SellStall1)
  SellStall2.refresh(markData.SellStall2)
  SellStall3.refresh(markData.SellStall3)

  BuilderStall.refresh(othData.BuilderStall, [bstall.Poultry, bstall.Sheep, bstall.Horse, bstall.Cow, bstall.Dog, bstall.Poultry2, bstall.Sheep2, bstall.Horse2, bstall.Cow2, bstall.Dog2, bstall.Machine, bstall.Mansion])

  ShadyStall.refresh(othData.ShadyStall, [sstall.Upgrade, sstall.Upgrade2, sstall.Upgrade3, sstall.Upgrade4, sstall.Maifesto,])

  if (tData.clicked) {
    infor.style.display = "inline-block";
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].amt > 0)
        resources[i].amtDisplayElem.innerHTML = resources[i].amt + " " + resources[i].id;

    }
  } else {
    infor.style.display = "none";
  }
  if (tData.findMap) {
    exploreButton.style.display = "inline-block";
  } else {
    exploreButton.style.display = "none";
  }
  if (tData.barnUnlocked) {
    barnButton.style.display = "inline-block";
  } else {
    barnButton.style.display = "none";
  }
  if (tData.barnFixed) {
    document.getElementsByClassName("sheds")[0].style.display = "inline-block"
    document.getElementsByClassName("brokenBarn")[0].style.display = "none"
  } else {
    document.getElementsByClassName("sheds")[0].style.display = "none"
    document.getElementsByClassName("brokenBarn")[0].style.display = "block"
  }
  if (tData.marketOpen) {
    marketButton.style.display = "inline-block";
    setTimeout(function () {
      startMarket();
    }, timData.MarketTime)
    startMarketCountdown();
  } else {
    marketButton.style.display = "none";
  }

  openTab("resourcesPage");

}

//settings button 
var settingsButton = document.getElementById("settingsButton");
settingsButton.onclick = function () {
  newAlert("m", "Settings")
}
var clearSaveButton = document.getElementById("clearSaveButton");
clearSaveButton.onclick = function () {
  clearSave();
  closeAlert();
}
var manualSaveButton = document.getElementById("manualSaveButton");
manualSaveButton.onclick = function () {
  save();
  closeAlert();
}


//resource buttons functions
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

function check(buttonClass) {
  //check first click
  if (!tData.clicked) {
    tData.clicked = true;
    infor.style.display = "inline-block";
  }

  if (buttonClass == Grain) {
    if (!tData.findMap) {
      if (buttonClass.amt >= 7) {
        tData.findMap = true;
        newAlert("s", "While threshing the floor, you find a old piece of paper on the floor. It is a map.");
        exploreButton.style.display = "inline-block"
      }
    }
  }
}

function progress(buttonClass) {
  buttonClass.htmlElem.classList.add("timeout");
  var id = setInterval(function frame() {
    if (buttonClass.barWidth >= 100) {
      clearInterval(id);
      buttonClass.barElem.style.width = "100%";
      buttonClass.reenable();
    } else {
      buttonClass.barWidth = buttonClass.barWidth + (2500 / buttonClass.timeoutTime);
      buttonClass.barElem.style.width = (100 - buttonClass.barWidth) + "%";
    }
  }, 25);
}

function changeClickAmt(amt) {
  Grain.changeClickAmount(amt);
  Wood.changeClickAmount(amt);
  Stone.changeClickAmount(amt);
  Corn.changeClickAmount(amt);
}


//map button functions

function buttonRed(button) {
  button.classList.add("marketRed");
  setTimeout(function () {
    button.classList.remove("marketRed");
  }, 500)
}

function buyTile(tileClass) {
  Grain.increment(-tileClass.cost);
  newAlert(tileClass.messageSize, tileClass.message);
  tileClass.bought = true;
  tileClass.boughtDis();
}


rw1clm2.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw1clm2.cost) {
    buyTile(rw1clm2);
    Cow.increment(1);
  }
  else {
    buttonRed(rw1clm2.buttonHtmlElem);
  }
}
rw1clm3.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw1clm3.cost) {
    buyTile(rw1clm3);
    Horse.increment(1);
    Cow.increment(1);
  }
  else {
    buttonRed(rw1clm3.buttonHtmlElem);
  }
}
rw1clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw1clm4.cost) {
    buyTile(rw1clm4);
    Sheep.increment(1);
  }
  else {
    buttonRed(rw1clm4.buttonHtmlElem);
  }
}
rw2clm1.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm1.cost) {
    buyTile(rw2clm1);
    tData.sndBarn = true;
    for (let i = 0; i < tData.sndBarnBacklog.length; i++) {
      BuilderStall.add(tData.sndBarnBacklog[i]);
    }
  }
  else {
    buttonRed(rw2clm1.buttonHtmlElem);
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
  else {
    buttonRed(rw2clm2.buttonHtmlElem);
  }
}
rw2clm3.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm3.cost) {
    buyTile(rw2clm3);
    tData.title = "A small farm"
    document.getElementById("title").innerHTML = tData.title;
    barnUnlock();
    rw1clm3.unlock()
    rw2clm2.unlock()
    rw2clm4.unlock()
  }
  else {
    buttonRed(rw2clm3.buttonHtmlElem);
  }
}
rw2clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm4.cost) {
    buyTile(rw2clm4);
    Sheep.increment(1);
    Poultry.increment(1);
    Corn.unlocked = true;
    Corn.unlock();
    rw2clm5.unlock();
    rw1clm4.unlock();
  }
  else {
    buttonRed(rw2clm4.buttonHtmlElem);
  }
}
rw2clm5.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw2clm5.cost) {
    buyTile(rw2clm5);
    document.getElementById("switchButton").style.display = "inline-block";
    ShadyStall.divElem.style.display = "inline-block";
    ShadyStall.unlocked = true;
    othData.ShadyStall.unlocked = true;
    ShadyStall.activatedOffers = [0, 1]
    ShadyStall.new();
  }
  else {
    buttonRed(rw2clm5.buttonHtmlElem);
  }
}
rw3clm2.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw3clm2.cost) {
    buyTile(rw3clm2);
    Wood.unlocked = true;
    Wood.unlock();
    tData.title = "A few plots";
    document.getElementById("title").innerHTML = tData.title;
  }
  else {
    buttonRed(rw3clm2.buttonHtmlElem);
  }
}
rw3clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw3clm4.cost) {
    buyTile(rw3clm4);
    Stone.unlocked = true;
    Stone.unlock();
    Stone.divElem.style.display = "inline-block";
  }
  else {
    buttonRed(rw3clm4.buttonHtmlElem);
  }
}
rw4clm1.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm1.cost) {
    buyTile(rw4clm1);
    BuilderStall.unlocked = true;
    othData.BuilderStall.unlocked = true;
    BuilderStall.activatedOffers = [0, 1, 2, 3, 4, 5];
    BuilderStall.unlock();
    BuilderStall.new();
  }
  else {
    buttonRed(rw4clm1.buttonHtmlElem);
  }
}
rw4clm2.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm2.cost) {
    buyTile(rw4clm2);
    tData.marketOpen = true;
    marketUnlock();
    tData.title = "A profitable business";
    document.getElementById("title").innerHTML = tData.title;
    rw4clm1.unlock()
  }
  else {
    buttonRed(rw4clm2.buttonHtmlElem);
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
  else {
    buttonRed(rw4clm3.buttonHtmlElem);
  }
}
rw4clm4.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm4.cost) {
    buyTile(rw4clm4);
    Dog.increment(1);
    rw4clm5.unlock()
  } else {
    buttonRed(rw4clm4.buttonHtmlElem);
  }
}
rw4clm5.buttonHtmlElem.onclick = function () {
  if (Grain.amt >= rw4clm5.cost) {
    buyTile(rw4clm5);
    BuilderStall.add(10);
  }
  else {
    buttonRed(rw4clm5.buttonHtmlElem);
  }
}


//barn functions

function barnUnlock() {
  tData.barnUnlocked = true;
  barnButton.style.display = "inline-block";
  Poultry.increment(1);
}

document.getElementById("fixBarn").onclick = function () {
  if (Wood.amt >= 12 && Stone.amt >= 5) {
    Wood.increment(-12);
    Stone.increment(-5);
    tData.barnFixed = true;
    document.getElementsByClassName("sheds")[0].style.display = "inline-block"
    document.getElementsByClassName("brokenBarn")[0].style.display = "none"
    animalIntervals()
    checkAnimals();
  }
  else {
    buttonRed(document.getElementById("fixBarn"))
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
    animalBreedCostIncrease();
    breedProgress(animalClass);
  }
  else {
    buttonRed(animalClass.breedElem)
  }
}

function breedProgress(animalClass) {
  animalClass.breedElem.disable = "true";
  animalClass.breedElem.classList.add("timeout");
  animalClass.isBreeding = true;
  var id = setInterval(function frame() {
    if (animalClass.barWidth >= 100) {
      clearInterval(id);
      animalClass.barElem.style.width = "100%";
      animalClass.breedElem.disable = "false";
      animalClass.breedElem.classList.remove("timeout");
      animalClass.barWidth = 0;
      animalClass.increment(3)
      animalClass.isBreeding = false;
    } else {
      animalClass.barWidth = animalClass.barWidth + (2500 / animalClass.timeoutTime);
      animalClass.barElem.style.width = (100 - animalClass.barWidth) + "%";
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
      if (animalClass.amt > 0 && tData.barnFixed) {
        animalClass.produce(animalClass.produces[i][0])
      }
    }, animalClass.produces[i][1])
  }
}


Poultry.breedElem.onclick = function () {
  if (!Poultry.isBreeding) {
    if (Poultry.amt + 1 > Poultry.max) {
      newAlert("s", "The barn is too full for newcomers")
    } else {
      breed(Poultry);
    }
  }
}
Sheep.breedElem.onclick = function () {
  if (!Sheep.isBreeding) {
    if (Sheep.amt + 1 > Sheep.max) {
      newAlert("s", "The barn is too full for newcomers")
    } else {
      breed(Sheep);
    }
  }
}
Horse.breedElem.onclick = function () {
  if (!Horse.isBreeding) {
    if (Horse.amt + 1 > Horse.max) {
      newAlert("s", "The barn is too full for newcomers")
    } else {
      breed(Horse);
    }
  }
}
Cow.breedElem.onclick = function () {
  if (!Cow.isBreeding) {
    if (Cow.amt + 1 > Cow.max) {
      newAlert("s", "The barn is too full for newcomers")
    } else {
      breed(Cow);
    }
  }
}
Dog.breedElem.onclick = function () {
  if (!Dog.isBreeding) {
    if (Dog.amt + 1 > Dog.max) {
      newAlert("s", "The barn is too full for newcomers")
    } else {
      breed(Dog);
    }
  }
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


// market stall functions

var currentMarketInteraction = 0

function green(stall) {
  stall.divElem.classList.add("marketGreen");
  setTimeout(function () {
    stall.divElem.classList.remove("marketGreen");
  }, 500)
}

function red(stall, missing) {
  stall.divElem.classList.add("marketRed");
  setTimeout(function () {
    stall.divElem.classList.remove("marketRed");
  }, 500)
  if (missing.length > 0) {
    var message = "Missing: <br>"
    for (let i = 0; i < missing.length; i++) {
      message += missing[i][1] + " " + missing[i][0] + "<br>"
    }
    newAlert("s", message)
  }

}

function marketUnlock() {
  marketButton.style.display = "inline-block";
  marketIsOpen();
  startMarket();
}

function startMarket() {
  setInterval(function () {
    if (marketButton.style.display == "inline-block") {
      marketIsOpen();
      newAlert("s", "A new day brings new stock to the market")
    }
  }, 180000);
}

function startMarketCountdown() {
  setInterval(function () {
    timData.MarketTime -= 1000;
    if (timData.MarketTime == 0) {
      timData.MarketTime = 180000;
    }
    updateMarketTime()
  }, 1000)
}

function marketIsOpen() {
  for (let i = 0; i < stalls.length; i++) {
    stalls[i].generate()
  }
  currentMarketInteraction = 0;
  document.getElementById("interactionsLeft").innerHTML = "Can buy/sell " + (maxMarket - currentMarketInteraction) + " more times";
  BuilderStall.new();
  ShadyStall.new();
}

function updateMarketTime() {
  var marketTimeElem = document.getElementById("marketTime");
  var time = Math.ceil(timData.MarketTime / 60000)
  if (time == 1) {
    marketTimeElem.innerHTML = "Refreshes in " + time + " min"
  } else {
    marketTimeElem.innerHTML = "Refreshes in " + time + " mins"
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


//other side market functions

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
  tData.title = "Animal Farm 2.0";
  document.getElementById("title").innerHTML = tData.title;
}



//admin things
if (isAdmin) {
  Grain.amt = 1000;
  Wood.amt = 10000;
  Stone.amt = 1000;
  Corn.amt = 1000;
  Money.amt = 2000;
  rw1clm2.unlock()
  rw1clm3.unlock()
  rw1clm4.unlock()
  rw2clm1.unlock()
  rw2clm2.unlock()
  rw2clm4.unlock()
  rw2clm5.unlock()
  rw4clm1.unlock()
  rw4clm2.unlock()
  rw4clm4.unlock()
  rw4clm5.unlock()
  exploreButton.style.display = "inline-block"
  barnButton.style.display = "inline-block";
  marketButton.style.display = "inline-block";
  BuilderStall.unlocked = true;
  ShadyStall.unlocked = true;
  tData.mansionBuilt = false;
}

function admin() {
  Grain.increment(1000);
  Wood.increment(1000);
  Stone.increment(1000);
  Corn.increment(1000);
  Money.increment(1000);
}