//title
document.getElementById("title").innerHTML = ("A Lone Field")
//infor threshingvar
var infor = document.getElementById("info");
infor.style.display = "none";
//building, clicking, hovering, etc.
var st = 0;
var wo = 0;
var gr = 0;
var co = 0;
var money = 0;
var click = 1;
var adminTest = 0;
//material buttons
var grainShort = document.getElementById("grain");
var woodShort = document.getElementById("wood");
var stoneShort = document.getElementById("stone")
var cornShort = document.getElementById("corn")
woodShort.style.display = "none";
stoneShort.style.display = "none";
cornShort.style.display = "none";
grainShort.onclick = function(){
  grain()
  grainShort.disabled = true;
  grainShort.classList.add("timeout")
  setTimeout(function() {grainShort.disabled = false; grainShort.classList.remove("timeout");}, 2000)
  infor.style.display = "inline-block";
}
woodShort.onclick = function(){
  wood()
  woodShort.disabled = true;
  woodShort.classList.add("timeout")
  setTimeout(function() {woodShort.disabled = false; woodShort.classList.remove("timeout");}, 8000)
}
stoneShort.onclick = function(){
  stone()
  stoneShort.disabled = true;
  stoneShort.classList.add("timeout")
  setTimeout(function() {stoneShort.disabled = false; stoneShort.classList.remove("timeout");}, 10000)
}
cornShort.onclick = function(){
  corn()
  cornShort.disabled = true;
  cornShort.classList.add("timeout")
  setTimeout(function() {cornShort.disabled = false; cornShort.classList.remove("timeout");}, 3000)
}
function grain() {
  gr = gr + click;
  document.getElementById("grains").innerHTML = gr + " grain";
  refreshEvents()
}
function stone() {
  st = st + click;
  document.getElementById("stones").innerHTML = st + " stone";
}
function wood() {
  wo = wo + click;
  document.getElementById("woods").innerHTML = wo + " wood";
}
function corn() {
  co = co + click;
  document.getElementById("corns").innerHTML = co + " corn";
}
document.getElementById("grain").onmouseover = function() {
  mouseGrain()
}
document.getElementById("grain").onmouseout = function() {
  NotmouseGrain()
}
document.getElementById("wood").onmouseover = function() {
  mouseWood()
}
document.getElementById("wood").onmouseout = function() {
  NotmouseWood()
}
document.getElementById("stone").onmouseover = function() {
  mouseStone()
}
document.getElementById("stone").onmouseout = function() {
  NotmouseStone()
}
function mouseWood() {
  document.getElementById("desc").innerHTML = "The tree goes oof. Wait you did this without a tool? wowza"
}
function NotmouseWood() {
  document.getElementById("desc").innerHTML = " "
}
function mouseGrain() {
  document.getElementById("desc").innerHTML = "Harvest the wheat. Increase the production."

}
function NotmouseGrain() {
  document.getElementById("desc").innerHTML = " "
}
function mouseStone() {
  document.getElementById("desc").innerHTML = "Mine the stone! You will work harder!"
}
function NotmouseStone() {
  document.getElementById("desc").innerHTML = " "

}
//tabs stuff
var tabsdiv = document.getElementsByClassName("tabsdiv");
var resourceButton = document.getElementById("resourcesTab");
var exploreButton = document.getElementById("exploreTab");
var barnButton = document.getElementById("barnTab");
var marketButton = document.getElementById("marketTab");
document.getElementById("explore").style.display = "none";
document.getElementById("barn").style.display = "none";
document.getElementById("market").style.display = "none";
resourceButton.style.display = "inline-block";
exploreButton.style.display = "none"
barnButton.style.display = "none";
marketButton.style.display = "none";
//tabs code
document.getElementById("resourcesTab").onclick = function(){
  openTab(event, 'resources')
}
document.getElementById("exploreTab").onclick = function(){
  openTab(event, 'explore')
}
document.getElementById("barnTab").onclick = function(){
  openTab(event, 'barn')
}
document.getElementById("marketTab").onclick = function(){
  openTab(event, 'market')
}
function openTab(evt, tabName) {
  var i, tabContent, tabs;
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabs = document.getElementsByClassName("tabs");
  for (i = 0; i < tabs.length; i++) {
    tabs[i].className = tabs[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "inline-block";
  evt.currentTarget.tabName += " active";
}
//map stuufs
var costGrain = 15;
var grainInterval = 0;
var landUnlockRoad = 0;
var landUnlockTop = 0;
var costrw1clm3 = 60;
var costrw2clm3 = 35;
var costrw2clm4 = 70;
var costrw3clm2 = 10;
var costrw3clm4 = 15;
var costrw4clm1 = 40;
var costrw4clm2 = 30;
var costrw4clm3 = 20;
var costrw4clm4 = 70;
var buttonrw1clm3 = document.getElementById("rw1clm3");
var buttonrw2clm3 = document.getElementById("rw2clm3");
var buttonrw2clm4 = document.getElementById("rw2clm4");
var buttonrw3clm2 = document.getElementById("rw3clm2");
var buttonrw3clm4 = document.getElementById("rw3clm4");
var buttonrw4clm1 = document.getElementById("rw4clm1");
var buttonrw4clm2 = document.getElementById("rw4clm2");
var buttonrw4clm3 = document.getElementById("rw4clm3");
var buttonrw4clm4 = document.getElementById("rw4clm4");
//land displays
document.getElementsByClassName("quarry")[0].style.display = "none";
document.getElementsByClassName("birchForest")[0].style.display = "none";
document.getElementsByClassName("pastureRoad")[0].style.display = "none";
document.getElementsByClassName("barn")[0].style.display = "none";
document.getElementsByClassName("market")[0].style.display = "none";
document.getElementsByClassName("roadToTown")[0].style.display = "none";
document.getElementsByClassName("roadNothing")[0].style.display = "none";
document.getElementsByClassName("anotherField1")[0].style.display = "none";
document.getElementsByClassName("stable")[0].style.display = "none";
//hide the items
buttonrw1clm3.style.display = "none"
buttonrw2clm4.style.display = "none"
buttonrw4clm1.style.display = "none"
buttonrw4clm2.style.display = "none"
buttonrw4clm4.style.display = "none"
//clicking items
buttonrw1clm3.onclick = function(){
  if (gr >= costrw1clm3) {
    gr = gr - costrw1clm3;
    document.getElementById("grains").innerHTML = gr + " grain";
    buttonrw1clm3.style.display = "none"
    document.getElementsByClassName("stable")[0].style.display = "inline-block";
    alert("A stable is seen in the distance. Around it, a number of animals mill, barely surviving in the field and stable. More comrades join your society.")
    document.getElementById("title").innerHTML = ("Animal Farm 2.0")
    poultryNum = poultryNum + 2
    sheepNum = sheepNum + 2
    horseNum = horseNum + 2
    cowNum = cowNum + 2
    dogNum = dogNum + 2
    barnCheck()
    breedPoultry.style.display = "inline-block"
  }
}
buttonrw2clm3.onclick = function(){
  if (gr >= costrw2clm3){
    gr = gr - costrw2clm3;
    document.getElementById("grains").innerHTML = gr + " grain";
    buttonrw2clm3.style.display = "none"
    document.getElementsByClassName("barn")[0].style.display = "inline-block"
    alert("An old rickety worn down barn stands in a clearing. You see some animals roaming, and an idea pops into your head. You grab a chicken and a sheep.")
    barnUnlock()
    landUnlockTop = 1
    landUnlock()
  }
}
buttonrw2clm4.onclick = function(){
  if (gr >= costrw2clm4) {
    gr = gr - costrw2clm4;
    document.getElementById("grains").innerHTML = gr + " grain";
    buttonrw2clm4.style.display = "none"
    document.getElementsByClassName("anotherField1")[0].style.display = "inline-block";
    alert("A field is seen spanning an acre. already planted and overripe are corn. You learn about this valuable food source.")
    cornShort.style.display = "inline-block";
  }
}
buttonrw3clm2.onclick = function(){
  if (gr >= costrw3clm2){
    gr = gr - costrw3clm2;
    document.getElementById("grains").innerHTML = gr + " grain";
    buttonrw3clm2.style.display = "none"
    document.getElementsByClassName("birchForest")[0].style.display = "inline-block"
    alert("You found a Birch Forest! You learned how to gather wood!")
    woodShort.style.display = "inline-block"
    document.getElementById("title").innerHTML = ("A small farm")
  }
}
buttonrw3clm4.onclick = function(){
  if (gr >= costrw3clm4){
    gr = gr - costrw3clm4
    document.getElementById("grains").innerHTML = gr + " grain";
    buttonrw3clm4.style.display = "none"
    document.getElementsByClassName("quarry")[0].style.display = "inline-block"
    alert("You found a quarry! You learned how to gather stone!")
    stoneShort.style.display = "inline-block"
  }
}
buttonrw4clm1.onclick = function(){
  if (gr >= costrw4clm1){
    gr = gr - costrw4clm1;
    document.getElementById("grains").innerHTML = gr + " grain";
    buttonrw4clm1.style.display = "none"
    document.getElementsByClassName("market")[0].style.display = "inline-block"
    document.getElementById("marketTab").style.display = "inline-block"
    alert("The town looms over you as you stare longinly at the busy market ahead. The sheer amount of resources make your senses tingle.")
    marketIsOpen()
  }
}
buttonrw4clm2.onclick = function(){
  if (gr >= costrw4clm2){
    gr = gr - costrw4clm2;
    document.getElementById("grains").innerHTML = gr + " grain";
    buttonrw4clm2.style.display = "none"
    document.getElementsByClassName("roadToTown")[0].style.display = "inline-block"
    alert("You continue on the road, as it gets messier, busier and louder. You see a town ahead")
    money = money + 20
    gr = gr + 10
    st = st + 10
    wo = wo + 10
    display()
    landUnlockRoad = 2
    landUnlock()
  }
}
buttonrw4clm3.onclick = function(){
  if (gr >= costrw4clm3){
    gr = gr - costrw4clm3;
    document.getElementById("grains").innerHTML = gr + " grain";
    buttonrw4clm3.style.display = "none"
    document.getElementsByClassName("pastureRoad")[0].style.display = "inline-block"
    alert("There is an expanse of green meadows. You find some old grain on the floor. Off in the distance is a road. It seems to go somewhere. You find 10 pounds off the side of the road")
    money = money + 10
    gr = gr + 10
    display()
    landUnlockRoad = 1
    landUnlock()
  }
}
buttonrw4clm4.onclick = function(){
  if (gr >= costrw4clm4){
    gr = gr - costrw4clm4;
    document.getElementById("grains").innerHTML = gr + " grain";
    buttonrw4clm4.style.display = "none"
    document.getElementsByClassName("roadNothing")[0].style.display = "inline-block"
    alert("The road continues on for miles. Nothing happens and nothing is happening, is there nothing here?")
  }
}
//market stuffs
var stall1Price2 = 0
var stall1Amount2 = 0
var stall1Amount = 0
var stall1 = 0
var stall12 = 0
var stall1TypeAmount = 0
var stall1Type = 0
var stall1Price = 0
var stall2Price2 = 0
var stall2Amount2 = 0
var stall2Amount = 0
var stall2 = 0
var stall22 = 0
var stall2TypeAmount= 0
var stall2Type = 0
var stall2Price = 0
var stall3Amount = 0
var stall3 = 0
var stall32 = 0
var stall3TypeAmount = 0
var stall3Type = 0
var stall3Price = 0
//sell
var stallSell1Price2 = 0
var stallSell1Amount2 = 0
var stallSell1Amount = 0
var stallSell1 = 0
var stallSell12 = 0
var stallSell1TypeAmount = 0
var stallSell1Type = 0
var stallSell1Price = 0
var stallSell2Price2 = 0
var stallSell2Amount2 = 0
var stallSell2Amount = 0
var stallSell2 = 0
var stallSell22 = 0
var stallSell2TypeAmount= 0
var stallSell2Type = 0
var stallSell2Price = 0
var stallSell3Amount = 0
var stallSell3 = 0
var stallSell32 = 0
var stallSell3TypeAmount = 0
var stallSell3Type = 0
var stallSell3Price = 0
setInterval(function () {
  console.log("Market is open")
  marketIsOpen()
}, 600000);
function marketIsOpen(){
  stall1 = Math.floor((Math.random() * 3)+ 1)
  if (stall1 == 1) {
    stall1TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stall1Type = " grain"
    if (stall1TypeAmount == 1) {

      stall1Amount = 25
      stall1Price = Math.floor((Math.random() * 10) + 20);
    } else if (stall1TypeAmount == 2) {

      stall1Amount = 50
      stall1Price = Math.floor((Math.random() * 20) + 40);
    } else {
      stall1Amount = 100
      stall1Price = Math.floor((Math.random() * 40) + 80);

    }
  } else if (stall1 == 2) {
     stall1TypeAmount = Math.floor((Math.random() * 3)+ 1)
     stall1Type = " wood"
    if (stall1TypeAmount == 1) {
       stall1Amount = 25
       stall1Price = Math.floor((Math.random() * 10) + 45);

    } else if (stall1TypeAmount == 2) {
       stall1Amount = 50
       stall1Price = Math.floor((Math.random() * 20) + 90);

    } else {
       stall1Amount = 100
       stall1Price = Math.floor((Math.random() * 40) + 180)

    }
  } else {
     stall1TypeAmount = Math.floor((Math.random() * 3)+ 1)
     stall1Type = " stone"
    if (stall1TypeAmount == 1) {
       stall1Amount = 25
       stall1Price = Math.floor((Math.random() * 10) + 70);

    } else if (stall1TypeAmount == 2) {
       stall1Amount = 50
       stall1Price = Math.floor((Math.random() * 20) + 140);

    }else {
       stall1Amount = 100
       stall1Price = Math.floor((Math.random() * 40) + 280);

    }
  }
  stall1Price2 = stall1Price
  stall1Amount2 = stall1Amount
  stall12 = stall1
  document.getElementById("marketItemNameStall1").innerHTML = stall1Amount + stall1Type;
  document.getElementById("marketItemPriceStall1").innerHTML = stall1Price + " pounds"
  stall2 = Math.floor((Math.random() * 3)+ 1)
  if (stall2 == 1) {
    stall2TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stall2Type = " grain"
    if (stall2TypeAmount == 1) {
      stall2Amount = 25
      stall2Price = Math.floor((Math.random() * 10) + 20);
    } else if (stall2TypeAmount == 2) {
      stall2Amount = 50
      stall2Price = Math.floor((Math.random() * 20) + 40);
    } else {
      stall2Amount = 100
      stall2Price = Math.floor((Math.random() * 40) + 80);
    }
  } else if (stall2 == 2) {
    stall2TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stall2Type = " wood"
    if (stall2TypeAmount == 1) {
      stall2Amount = 25
      stall2Price = Math.floor((Math.random() * 10) + 45);
    } else if (stall2TypeAmount == 2) {
      stall2Amount = 50
      stall2Price = Math.floor((Math.random() * 20) + 90);
    } else {
      stall2Amount = 100
      stall2Price = Math.floor((Math.random() * 40) + 180)
    }
  } else {
    stall2TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stall2Type = " stone"
    if (stall2TypeAmount == 1) {
      stall2Amount = 25
      stall2Price = Math.floor((Math.random() * 10) + 70);
    } else if (stall2TypeAmount == 2) {
      stall2Amount = 50
      stall2Price = Math.floor((Math.random() * 20) + 140);
    }else {
      stall2Amount = 100
      stall2Price = Math.floor((Math.random() * 40) + 280);
    }
  }
  stall2Price2 = stall2Price
  stall2Amount2 = stall2Amount
  stall22 = stall2
  document.getElementById("marketItemNameStall2").innerHTML = stall2Amount + stall2Type;
  document.getElementById("marketItemPriceStall2").innerHTML = stall2Price + " pounds"
  stall3 = Math.floor((Math.random() * 3)+ 1)
  if (stall3 == 1) {
    stall3TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stall3Type = " grain"
    if (stall3TypeAmount == 1) {
      stall3Amount = 25
      stall3Price = Math.floor((Math.random() * 10) + 20);
    } else if (stall3TypeAmount == 2) {
      stall3Amount = 50
      stall3Price = Math.floor((Math.random() * 20) + 40);
    } else {
      stall3Amount = 100
      stall3Price = Math.floor((Math.random() * 40) + 80);
    }
  } else if (stall3 == 2) {
    stall3TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stall3Type = " wood"
    if (stall3TypeAmount == 1) {
      stall3Amount = 25
      stall3Price = Math.floor((Math.random() * 10) + 45);
    } else if (stall3TypeAmount == 2) {
      stall3Amount = 50
      stall3Price = Math.floor((Math.random() * 20) + 90);
    } else {
      stall3Amount = 100
      stall3Price = Math.floor((Math.random() * 40) + 180)
    }
  } else {
    stall3TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stall3Type = " stone"
    if (stall3TypeAmount == 1) {
      stall3Amount = 25
      stall3Price = Math.floor((Math.random() * 10) + 70);
    } else if (stall3TypeAmount == 2) {
      stall3Amount = 50
      stall3Price = Math.floor((Math.random() * 20) + 140);
    }else {
      stall3Amount = 100
      stall3Price = Math.floor((Math.random() * 40) + 280);
    }
  }
  stall3Price2 = stall3Price
  stall3Amount2 = stall3Amount
  stall32 = stall3
  document.getElementById("marketItemNameStall3").innerHTML = stall3Amount + stall3Type;
  document.getElementById("marketItemPriceStall3").innerHTML = stall3Price + " pounds"
  //sell
  stallSell1 = Math.floor((Math.random() * 3)+ 1)
  if (stallSell1 == 1) {
    stallSell1TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stallSell1Type = " grain"
    if (stallSell1TypeAmount == 1) {

      stallSell1Amount = 25
      stallSell1Price = Math.floor((Math.random() * 5) + 10);
    } else if (stallSell1TypeAmount == 2) {

      stallSell1Amount = 50
      stallSell1Price = Math.floor((Math.random() * 10) + 20);
    } else {
      stallSell1Amount = 100
      stallSell1Price = Math.floor((Math.random() * 20) + 40);

    }
  } else if (stallSell1 == 2) {
     stallSell1TypeAmount = Math.floor((Math.random() * 3)+ 1)
     stallSell1Type = " wood"
    if (stallSell1TypeAmount == 1) {
       stallSell1Amount = 25
       stallSell1Price = Math.floor((Math.random() * 10) + 45);

    } else if (stallSell1TypeAmount == 2) {
       stallSell1Amount = 50
       stallSell1Price = Math.floor((Math.random() * 20) + 90);

    } else {
       stallSell1Amount = 100
       stallSell1Price = Math.floor((Math.random() * 40) + 180)

    }
  } else {
     stallSell1TypeAmount = Math.floor((Math.random() * 3)+ 1)
     stallSell1Type = " stone"
    if (stallSell1TypeAmount == 1) {
       stallSell1Amount = 25
       stallSell1Price = Math.floor((Math.random() * 10) + 70);

    } else if (stallSell1TypeAmount == 2) {
       stallSell1Amount = 50
       stallSell1Price = Math.floor((Math.random() * 20) + 140);

    }else {
       stallSell1Amount = 100
       stallSell1Price = Math.floor((Math.random() * 40) + 280);

    }
  }
  stallSell1Price2 = stallSell1Price
  stallSell1Amount2 = stallSell1Amount
  stallSell12 = stallSell1
  document.getElementById("marketItemNameStallSell1").innerHTML = stallSell1Amount + stallSell1Type;
  document.getElementById("marketItemPriceStallSell1").innerHTML = stallSell1Price + " pounds"
  stallSell2 = Math.floor((Math.random() * 3)+ 1)
  if (stallSell2 == 1) {
    stallSell2TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stallSell2Type = " grain"
    if (stallSell2TypeAmount == 1) {
      stallSell2Amount = 25
      stallSell2Price = Math.floor((Math.random() * 5) + 10);
    } else if (stallSell2TypeAmount == 2) {
      stallSell2Amount = 50
      stallSell2Price = Math.floor((Math.random() * 10) + 20);
    } else {
      stallSell2Amount = 100
      stallSell2Price = Math.floor((Math.random() * 20) + 40);
    }
  } else if (stallSell2 == 2) {
    stallSell2TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stallSell2Type = " wood"
    if (stallSell2TypeAmount == 1) {
      stallSell2Amount = 25
      stallSell2Price = Math.floor((Math.random() * 10) + 45);
    } else if (stallSell2TypeAmount == 2) {
      stallSell2Amount = 50
      stallSell2Price = Math.floor((Math.random() * 20) + 90);
    } else {
      stallSell2Amount = 100
      stallSell2Price = Math.floor((Math.random() * 40) + 180)
    }
  } else {
    stallSell2TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stallSell2Type = " stone"
    if (stallSell2TypeAmount == 1) {
      stallSell2Amount = 25
      stallSell2Price = Math.floor((Math.random() * 10) + 70);
    } else if (stallSell2TypeAmount == 2) {
      stallSell2Amount = 50
      stallSell2Price = Math.floor((Math.random() * 20) + 140);
    }else {
      stallSell2Amount = 100
      stallSell2Price = Math.floor((Math.random() * 40) + 280);
    }
  }
  stallSell2Price2 = stallSell2Price
  stallSell2Amount2 = stallSell2Amount
  stallSell22 = stallSell2
  document.getElementById("marketItemNameStallSell2").innerHTML = stallSell2Amount + stallSell2Type;
  document.getElementById("marketItemPriceStallSell2").innerHTML = stallSell2Price + " pounds"
  stallSell3 = Math.floor((Math.random() * 3)+ 1)
  if (stallSell3 == 1) {
    stallSell3TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stallSell3Type = " grain"
    if (stallSell3TypeAmount == 1) {
      stallSell3Amount = 25
      stallSell3Price = Math.floor((Math.random() * 5) + 10);
    } else if (stallSell3TypeAmount == 2) {
      stallSell3Amount = 50
      stallSell3Price = Math.floor((Math.random() * 10) + 20);
    } else {
      stallSell3Amount = 100
      stallSell3Price = Math.floor((Math.random() * 20) + 40);
    }
  } else if (stallSell3 == 2) {
    stallSell3TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stallSell3Type = " wood"
    if (stallSell3TypeAmount == 1) {
      stallSell3Amount = 25
      stallSell3Price = Math.floor((Math.random() * 10) + 45);
    } else if (stallSell3TypeAmount == 2) {
      stallSell3Amount = 50
      stallSell3Price = Math.floor((Math.random() * 20) + 90);
    } else {
      stallSell3Amount = 100
      stallSell3Price = Math.floor((Math.random() * 40) + 180)
    }
  } else {
    stallSell3TypeAmount = Math.floor((Math.random() * 3)+ 1)
    stallSell3Type = " stone"
    if (stallSell3TypeAmount == 1) {
      stallSell3Amount = 25
      stallSell3Price = Math.floor((Math.random() * 10) + 70);
    } else if (stallSell3TypeAmount == 2) {
      stallSell3Amount = 50
      stallSell3Price = Math.floor((Math.random() * 20) + 140);
    }else {
      stallSell3Amount = 100
      stallSell3Price = Math.floor((Math.random() * 40) + 280);
    }
  }
  stallSell3Price2 = stallSell3Price
  stallSell3Amount2 = stallSell3Amount
  stallSell32 = stallSell3
  document.getElementById("marketItemNameStallSell3").innerHTML = stallSell3Amount + stallSell3Type;
  document.getElementById("marketItemPriceStallSell3").innerHTML = stallSell3Price + " pounds"
}
function doGreen1(){
  document.getElementById("marketSell1").style.backgroundColor = "green"
  document.getElementById("sellStall1").style.backgroundColor = "green"
  setTimeout(function(){
    document.getElementById("marketSell1").style.backgroundColor = "white"
    document.getElementById("sellStall1").style.backgroundColor = "white"
}, 500)}
function doRed1(){
  document.getElementById("marketSell1").style.backgroundColor = "red"
  document.getElementById("sellStall1").style.backgroundColor = "red"
  setTimeout(function(){
    document.getElementById("marketSell1").style.backgroundColor = "white"
    document.getElementById("sellStall1").style.backgroundColor = "white"
}, 500)}
function doGreen2(){
  document.getElementById("marketSell2").style.backgroundColor = "green"
  document.getElementById("sellStall2").style.backgroundColor = "green"
  setTimeout(function(){
    document.getElementById("marketSell2").style.backgroundColor = "white"
    document.getElementById("sellStall2").style.backgroundColor = "white"
}, 500)}
function doRed2(){
  document.getElementById("marketSell2").style.backgroundColor = "red"
  document.getElementById("sellStall2").style.backgroundColor = "red"
  setTimeout(function(){
    document.getElementById("marketSell2").style.backgroundColor = "white"
    document.getElementById("sellStall2").style.backgroundColor = "white"
}, 500)}
function doGreen3(){
  document.getElementById("marketSell3").style.backgroundColor = "green"
  document.getElementById("sellStall3").style.backgroundColor = "green"
  setTimeout(function(){
    document.getElementById("marketSell3").style.backgroundColor = "white"
    document.getElementById("sellStall3").style.backgroundColor = "white"
}, 500)}
function doRed3(){
  document.getElementById("marketSell3").style.backgroundColor = "red"
  document.getElementById("sellStall3").style.backgroundColor = "red"
  setTimeout(function(){
    document.getElementById("marketSell3").style.backgroundColor = "white"
    document.getElementById("sellStall3").style.backgroundColor = "white"
}, 500)}
document.getElementById("buyStall1").onclick = function(){
  if (money >= stall1Price2) {
    money = money - stall1Price2;
    if (stall12 == 1) {
      gr = gr + stall1Amount2
    }else if (stall12 == 2) {
      wo = wo + stall1Amount2;
    }else{
      st = st + stall1Amount2
    }
    display()
    document.getElementById("marketBuy1").style.backgroundColor = "#008000"
    document.getElementById("buyStall1").style.backgroundColor = "#008000"
    setTimeout(function(){
      document.getElementById("marketBuy1").style.backgroundColor = "white"
      document.getElementById("buyStall1").style.backgroundColor = "white"
  }, 500)
  }
}
document.getElementById("buyStall2").onclick = function(){
  if (money >= stall2Price2) {
    money = money - stall2Price2;
    if (stall22 == 1) {
      gr = gr + stall2Amount2
    }else if (stall22 == 2) {
      wo = wo + stall2Amount2;
    }else{
      st = st + stall2Amount2
    }
    display()
    document.getElementById("marketBuy2").style.backgroundColor = "green"
    document.getElementById("buyStall2").style.backgroundColor = "green"
    setTimeout(function(){
      document.getElementById("marketBuy2").style.backgroundColor = "white"
      document.getElementById("buyStall2").style.backgroundColor = "white"
  }, 500)
  }else{
    document.getElementById("marketBuy2").style.backgroundColor = "red"
    document.getElementById("buyStall2").style.backgroundColor = "red"
    setTimeout(function(){
      document.getElementById("marketBuy2").style.backgroundColor = "white"
      document.getElementById("buyStall2").style.backgroundColor = "white"
  }, 500)
  }
}
document.getElementById("buyStall3").onclick = function(){
  if (money >= stall3Price2) {
    money = money - stall3Price2;
    if (stall32 == 1) {
      gr = gr + stall3Amount2
    }else if (stall32 == 2) {
      wo = wo + stall3Amount2;
    }else{
      st = st + stall3Amount2
    }
    display()
    document.getElementById("marketBuy3").style.backgroundColor = "green"
    document.getElementById("buyStall3").style.backgroundColor = "green"
    setTimeout(function(){
      document.getElementById("marketBuy3").style.backgroundColor = "white"
      document.getElementById("buyStall3").style.backgroundColor = "white"
  }, 500)
  }else{
    document.getElementById("marketBuy3").style.backgroundColor = "red"
    document.getElementById("buyStall3").style.backgroundColor = "red"
    setTimeout(function(){
      document.getElementById("marketBuy3").style.backgroundColor = "white"
      document.getElementById("buyStall3").style.backgroundColor = "white"
  }, 500)
  }
}
document.getElementById("sellStall1").onclick = function(){
  if (stallSell12 == 1) {
    if (gr >= stallSell1Amount2) {
      gr = gr - stallSell1Amount2
      money = money + stallSell1Price2
      doGreen1()
    }else {
      doRed1()
    }
  }else if (stallSell12 == 2) {
    if (wo >= stallSell1Amount2) {
      wo = wo - stallSell1Amount2
      money = money + stallSell1Price2
      doGreen1()
    }else{
      doRed1()
    }
  }else {
    if (st >= stallSell1Amount2) {
      st = st - stallSell1Amount2
      money = money + stallSell1Price2
      doGreen1()
    }else{
      doRed1()
    }
  }
    display()

}
document.getElementById("sellStall2").onclick = function(){
  if (stallSell22 == 1) {
    if (gr >= stallSell2Amount2) {
      gr = gr - stallSell2Amount2
      money = money + stallSell2Price2
      doGreen2()
    }else{
      doRed2()
    }
  }else if (stallSell22 == 2) {
    if (wo >= stallSell2Amount2) {
      wo = wo - stallSell2Amount2
      money = money + stallSell2Price2
      doGreen2()
    }else {
      doRed2()
    }
  }else {
    if (st >= stallSell2Amount2) {
      st = st - stallSell2Amount2
      money = money + stallSell2Price2
      doGreen2()
    }else{
      doRed2()
    }
  }
  display()
}
document.getElementById("sellStall3").onclick = function(){
  if (stallSell32 == 1) {
    if (gr >= stallSell3Amount2) {
      gr = gr - stallSell3Amount2
      money = money + stallSell3Price2
      doGreen3()
    }else{
      doRed3()
    }
  }else if (stallSell32 == 2) {
    if (wo >= stallSell3Amount2) {
      wo = wo - stallSell3Amount2
      money = money + stallSell3Price2
      doGreen3()
    }else {
      doRed3()
    }
  }else {
    if (st >= stallSell3Amount2) {
      st = st - stallSell3Amount2
      money = money + stallSell3Price2
      doGreen3()
    }else {
      doRed3()
    }
  }
    display()
}
//switches
var grainEvent = 0;
function refreshEvents(){
  if (gr == 10 && grainEvent < 1){
    alert("You have found a map on the floor while threshing. It peaks your curiosity")
    grainEvent = 1
  }
  if (grainEvent == 1){
    exploreButton.style.display= "inline-block"
  }
}
//high usage shortcut code
function reloadNumbers() {
  document.getElementById("grains").innerHTML = gr + " grain";
  document.getElementById("stones").innerHTML = st + " stone";
  document.getElementById("woods").innerHTML = wo + " wood";

}
function display(){
  document.getElementById("money").innerHTML = money + " pounds"
  document.getElementById("grains").innerHTML = gr + " grain"
  document.getElementById("stones").innerHTML = st + " stones"
  document.getElementById("woods").innerHTML = wo + " wood"
  if (co >= 1) {
      document.getElementById("corns").innerHTML = co + " corn"
  }
}
function landUnlock(){
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
//barn
var poultryNum = 0
var sheepNum = 0
var horseNum = 0
var cowNum = 0
var dogNum = 0
var breedPoultry = document.getElementById("breedPoultry")
var breedSheep = document.getElementById("breedSheep")
var breedHorses = document.getElementById("breedHorses")
var breedCows = document.getElementById("breedCows")
var breedDogs = document.getElementById("breedDogs")
document.getElementsByClassName("buttonBarn")[0].style.display = "none"
document.getElementsByClassName("sheds")[0].style.display = "none"
document.getElementById("poultryShed").style.display = "none"
document.getElementById("sheepShed").style.display = "none"
document.getElementById("cowShed").style.display = "none"
document.getElementById("horseShed").style.display = "none"
document.getElementById("dogShed").style.display = "none"
document.getElementById("fixBarn").onclick = function(){
  if (wo>=15 && st>=10) {
    document.getElementsByClassName("sheds")[0].style.display = "inline-block"
    document.getElementsByClassName("brokenBarn")[0].style.display = "none"
  }
}
breedPoultry.onclick = function(){
  if (poultryNum >= 2) {
    poultryNum = poultryNum - 2;
    barnCheck()
    breedPoultry.disabled = "true"
    breedPoultry.style.backgroundColor = "#A9A9A9"
    setTimeout(function(){
      breedPoultry.disabled = "false";
      breedPoultry.style.backgroundColor = "white"
      poultryNum = poultryNum + 3
      barnCheck()
    }, 60000)
  }
}
breedSheep.onclick = function(){
  if (sheepNum >= 2) {
    sheepNum = sheepNum - 2;
    barnCheck()
    breedSheep.disabled = "true"
    breedSheep.style.backgroundColor = "#A9A9A9"
    setTimeout(function(){
      breedSheep.disabled = "false";
      breedSheep.style.backgroundColor = "white"
      sheepNum = sheepNum + 3
      barnCheck()
    }, 90000)
  }
}
breedHorses.onclick = function(){
  if (horseNum >= 2) {
    horseNum = horseNum - 2;
    barnCheck()
    breedHorses.disabled = "true"
    breedHorses.style.backgroundColor = "#A9A9A9"
    setTimeout(function(){
      breedHorses.disabled = "false";
      breedHorses.style.backgroundColor = "white"
      horseNum = horseNum + 3
      barnCheck()
    }, 120000)
  }
}
breedCows.onclick = function(){
  if (cowNum >= 2) {
    cowNum = cowNum - 2;
    barnCheck()
    breedCows.disabled = "true"
    breedCows.style.backgroundColor = "#A9A9A9"
    setTimeout(function(){
      breedCows.disabled = "false";
      breedCows.style.backgroundColor = "white"
      cowNum = cowNum + 3
      barnCheck()
    }, 105000)
  }
}
breedDogs.onclick = function(){
  if (dogNum >= 2) {
    dogNum = dogNum - 2;
    barnCheck()
    breedDogs.disabled = "true"
    breedDogs.style.backgroundColor = "#A9A9A9"
    setTimeout(function(){
      breedDogs.disabled = "false";
      breedDogs.style.backgroundColor = "white"
      dogNum = dogNum + 3
      barnCheck()
    }, 75000)
  }
}

function barnUnlock(){
  barnButton.style.display = "inline-block"
  poultryNum = 1
  sheepNum = 1
  barnCheck()
}
function barnCheck(){
  checkAnimallevels()
  checkAnimalNumbers()
  checkAnimalIntervals()
}
function checkAnimallevels(){
  if (poultryNum >= 1){
    document.getElementById("poultryShed").style.display = "inline-block"
  }
  if (horseNum >= 1){
    document.getElementById("horseShed").style.display = "inline-block"
  }
  if (cowNum >= 1){
    document.getElementById("cowShed").style.display = "inline-block"
  }
  if (sheepNum >= 1){
    document.getElementById("sheepShed").style.display = "inline-block"
  }
  if (dogNum >= 1){
    document.getElementById("dogShed").style.display = "inline-block"
  }
}
function checkAnimalNumbers(){
  document.getElementById("poultryNumber").innerHTML = poultryNum + " poultry"
  document.getElementById("sheepNumber").innerHTML = sheepNum + " sheep"
  document.getElementById("horseNumber").innerHTML = horseNum + " horses"
  document.getElementById("cowNumber").innerHTML = cowNum + " cows"
  document.getElementById("dogNumber").innerHTML = dogNum + " dogs"
  document.getElementById("poultryProduction").innerHTML = poultryNum + " grain / 3 sec"
  document.getElementById("sheepProduction1").innerHTML = sheepNum + " grain / 4 sec; "
  document.getElementById("sheepProduction2").innerHTML = sheepNum + " wood / 10 sec"
  document.getElementById("horseProduction").innerHTML = horseNum + " stone / 5 sec"
  document.getElementById("cowProduction").innerHTML = cowNum + " wood / 3 sec"
  document.getElementById("dogProduction1").innerHTML = dogNum + " grain / 8 sec; "
  document.getElementById("dogProduction2").innerHTML = dogNum +" wood / 18 sec; "
  document.getElementById("dogProduction3").innerHTML =  dogNum + " stone / 25 sec"
}
function checkAnimalIntervals(){
  if (poultryNum >= 1){
  window.setInterval(function(){
    gr = gr + poultryNum;
    document.getElementById("grains").innerHTML = gr + " grain"
  }, 3000)
  }
  if (sheepNum >= 1){
  window.setInterval(function(){
    gr = gr + sheepNum;
    document.getElementById("grains").innerHTML = gr + " grain"
  }, 4000)
  window.setInterval(function(){
    wo = wo + sheepNum;
    document.getElementById("woods").innerHTML = wo + " wood"
  }, 10000)
  }
  if (horseNum >= 1){
  window.setInterval(function(){
    st = st + horseNum;
    document.getElementById("stones").innerHTML = st + " stone"
  }, 5000)
  }
  if (cowNum >= 1){
  window.setInterval(function(){
    wo = wo + cowNum;
    document.getElementById("wood").innerHTML = wo + " wood"
  }, 3000)
  }
  if (dogNum >= 1){
  window.setInterval(function(){
    gr = gr + dogNum;
    document.getElementById("grains").innerHTML = gr + " grain"
  }, 10000)
  window.setInterval(function(){
    wo = wo + dogNum;
    document.getElementById("woods").innerHTML = wo + " wood"
  }, 20000)
  window.setInterval(function(){
    st = st + dogNum;
    document.getElementById("stones").innerHTML = st + " stone"
  }, 30000)
  }
}

if (adminTest == 1) {
  var st = 1000;
  var wo = 1000;
  var gr = 1000;
  var co = 1000;
  var money = 1000;
  buttonrw1clm3.style.display = "inline-block"
  buttonrw2clm4.style.display = "inline-block"
  buttonrw4clm1.style.display = "inline-block"
  buttonrw4clm2.style.display = "inline-block"
  buttonrw4clm4.style.display = "inline-block"
  exploreButton.style.display = "inline-block"
  barnButton.style.display = "inline-block";
  marketButton.style.display = "inline-block";
}
