
var stickyActivated = false;
var menuBarUnder = document.getElementById("menuBarUnder")
//run the thing first
var scrollTop = $(window).scrollTop(),
  elementOffset = $('#menuBar').offset().top,
  distance = (elementOffset - scrollTop);
sideTitle.style.opacity = (50 - distance) / 51;
menuBarUnder.style.width = ((50 - distance) / 51).toString() + "%";
if (distance <= 0) {
  stickyActivated = true;
} else {
  stickyActivated = false;
}

//set scroll on reload
window.onbeforeunload = function () {
  if (!stickyActivated) {
    window.scrollTo(0, 0);
  }
  else {
    window.scrollTo(0, $("#heading").height())
  }

}


//scroll thing might be better

$(window).on('scroll', function () {
  var scrollTop = $(window).scrollTop(),
    elementOffset = $('#menuBar').offset().top,
    distance = (elementOffset - scrollTop);
  sideTitle.style.opacity = (50 - distance) / 51;
  if (distance >= 492) {
    menuBarUnder.style.width = "0%"
  } else {
    menuBarUnder.style.width = ((450 - distance) / 450 * 100).toString() + "%"
  }

  if (distance <= 0) {
    stickyActivated = true;
  } else {
    stickyActivated = false;
  }
});



//tabs
var projectsButton = document.getElementById("projectsButton");
var resumeButton = document.getElementById("resumeButton");
var otherButton = document.getElementById("otherButton");


// projectsButton.onclick = function () {
//   window.scrollTo({
//     top: $("#heading").height(),
//     behavior: 'smooth'
//   })

//   changeTab('projectsPage')
// }

// resumeButton.onclick = function () {
//   window.scrollTo({
//     top: $("#heading").height(),
//     behavior: 'smooth'
//   })

//   changeTab('resumePage')
// }

// otherButton.onclick = function () {
//   window.scrollTo({
//     top: $("#heading").height(),
//     behavior: 'smooth'
//   })

//   changeTab('otherPage')
// }

//change tabs
function changeTab(tabName) {
  var tabs = document.getElementsByClassName("page");

  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }

  document.getElementById(tabName).style.display = "block";
  document.getElementById("contentDiv").style.height = "1000px";
  if (tabName == "projectsPage") {
    document.getElementById("contentDiv").style.height = "1500px";
  }

}



//other functions

function rabbitActivate() {

}

var colorCycle = 0

function colorChange() {

  if (colorCycle == 0) {
    doTheColorThing("#a044cf")
    colorCycle = 1;
  } else if (colorCycle == 1) {
    doTheColorThing("#3f78f2")
    colorCycle = 2;
  } else if (colorCycle == 2) {
    doTheColorThing("#41d941")
    colorCycle = 0;
  }
}


function doTheColorThing(color) {
  var backChangers = document.getElementsByClassName("backColored")
  var projectBoxes = document.getElementsByClassName("projectsBox")
  var projectsTitle = document.getElementById("projectsTitle")
  var bottomBarBorder = document.getElementById("bottomBar")

  for (i = 0; i < backChangers.length; i++) {
    backChangers[i].style.backgroundColor = color;
  }
  for (i = 0; i < projectBoxes.length; i++) {
    projectBoxes[i].style.border = color + " dotted 3px";
  }
  projectsTitle.style.textDecoration = color + " underline";
  bottomBarBorder.style.borderTop = color + " solid 7px"
}
