
var homeButton = document.getElementById("homeButton");
var gameButton = document.getElementById("gameButton");
var gamePage = document.getElementById("gamePage");
var secretPage = document.getElementById("secretPage");
var secretButton = document.getElementById("secret");
gamePage.style.display = "none";
secretPage.style.display = "none"


homeButton.onclick = function () {
  openTab(event, 'homePage')
}

gameButton.onclick = function () {
  openTab(event, 'gamePage')
}

secretButton.onclick = function () {
  openTab(event, 'secretPage')
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
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.tabName += " active";
}
