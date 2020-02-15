
var homeButton = document.getElementById("homeButton");
var gameButton = document.getElementById("gameButton");
var gamePage = document.getElementById("gamePage");
gamePage.style.display = "none";

homeButton.onclick =  function(){
    openTab(event, 'homePage')
}

gameButton.onclick =  function(){
    openTab(event, 'gamePage')
}

function openTab(evt, tabName) {
    var i, tabContent, tabs;
    tabContent = document.getElementsByClassName("page");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    tabs = document.getElementsByClassName("tabs");
    for (i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(" active", "");
    }
    console.log(document.getElementById(tabName))
    document.getElementById(tabName).style.display = "inline-block";
    evt.currentTarget.tabName += " active";
  }
