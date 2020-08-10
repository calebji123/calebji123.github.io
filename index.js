
var stickyActivated = false;

//run the thing first
var scrollTop = $(window).scrollTop(),
  elementOffset = $('#menuBar').offset().top,
  distance = (elementOffset - scrollTop);
sideTitle.style.opacity = (50 - distance) / 51;
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


projectsButton.onclick = function () {
  window.scrollTo({
    top: $("#heading").height(),
    behavior: 'smooth'
  })

  changeTab('projectsPage')
}

resumeButton.onclick = function () {
  window.scrollTo({
    top: $("#heading").height(),
    behavior: 'smooth'
  })

  changeTab('resumePage')
}

otherButton.onclick = function () {
  window.scrollTo({
    top: $("#heading").height(),
    behavior: 'smooth'
  })

  changeTab('otherPage')
}


function changeTab(tabName) {
  var tabs = document.getElementsByClassName("page");

  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }

  document.getElementById(tabName).style.display = "block";
  document.getElementById("contentDiv").style.height = "1000px";
  if (tabName == "projectsPage") {
    document.getElementById("contentDiv").style.height = "1500px";
    console.log("yes")
  }

}



// var homeButton = document.getElementById("homeButton");
// var gameButton = document.getElementById("gameButton");
// var gamePage = document.getElementById("gamePage");
// var secretPage = document.getElementById("secretPage");
// var secretButton = document.getElementById("secret");
// gamePage.style.display = "none";
// secretPage.style.display = "none"


// homeButton.onclick = function () {
//   openTab(event, 'homePage')
// }

// gameButton.onclick = function () {
//   openTab(event, 'gamePage')
// }

// secretButton.onclick = function () {
//   openTab(event, 'secretPage')
// }

// function openTab(evt, tabName) {
//   var i, tabContent, tabs;
//   tabContent = document.getElementsByClassName("page");
//   for (i = 0; i < tabContent.length; i++) {
//     tabContent[i].style.display = "none";
//   }
//   tabs = document.getElementsByClassName("tabs");
//   for (i = 0; i < tabs.length; i++) {
//     tabs[i].className = tabs[i].className.replace(" active", "");
//   }
//   document.getElementById(tabName).style.display = "block";
//   evt.currentTarget.tabName += " active";
// }
