//scroll
window.scrollTo(0, 0);
function disableScrolling() {
   var x = window.scrollX;
   var y = window.scrollY;
   window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
   window.onscroll = function () { scrollCheck(); };
}

function scrollCheck() {
   var scrollTop = $(window).scrollTop();
   var maxScroll = 600;
   var buffer = 300;
   var scrollUse = scrollTop - buffer;
   //bottom bar
   var unLen = "clamp(20vw, " + (40 + (scrollUse / maxScroll * 60)).toString() + "rem, 98vw)";
   if (scrollUse < maxScroll && scrollUse > 0) {
      document.documentElement.style.setProperty('--underbarlength', unLen);
   }
   //grid
   var xCoor = (((maxScroll - scrollUse) / maxScroll * 14) - 15).toString() + "vw";
   var yCoor = (((maxScroll - scrollUse) / maxScroll * 29) - 30).toString() + "vh";
   if (scrollUse < maxScroll && scrollUse > 0) {
      document.getElementById("nameCnt").style.transform = "translate(" + xCoor + "," + yCoor + ")"
   }
   //change when scroll is finished
   if (scrollUse > maxScroll) {
      document.getElementById("main").style.display = "none";
      document.getElementById("content").style.display = "grid";
   } else if (scrollUse < maxScroll) {
      document.getElementById("main").style.display = "grid";
      document.getElementById("content").style.display = "none";
   }

}



disableScrolling();
setTimeout(function () { enableScrolling() }, 6000);










