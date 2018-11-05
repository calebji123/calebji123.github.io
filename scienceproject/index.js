var slideAmount = 3
var slide1 = document.getElementById("slide1")
var slide2 = document.getElementById("slide2")
var slide3 = document.getElementById("slide3")
slide1.style.display = "block"
var slideNum = 1
document.getElementById("slideButtonForward").onclick = function(){
  if (slideNum == 1) {
    slide1.style.display = "none"
    slide2.style.display = "block"
  } else if (slideNum == 2) {
    slide3.style.display = "block"
    slide2.style.display = "none"
  }
  if (slideNum < slideAmount) {
      slideNum = slideNum + 1
  }
}
document.getElementById("slideButtonBack").onclick = function(){
  if (slideNum == 2) {
    slide1.style.display = "block"
    slide2.style.display = "none"
  } else if (slideNum == 3) {
    slide3.style.display = "none"
    slide2.style.display = "block"
  }
  if (slideNum >= 2) {
      slideNum = slideNum - 1
  }
}


document.getElementById("mainMain").onclick = function(){
    main.style.display = "block"
    slide1.style.display = "none"
    slide2.style.display = "none"
    slide3.style.display = "none"
    slide4.style.display = "none"
    slide5.style.display = "none"

}
document.getElementById("bubble1").onclick = function(){
    main.style.display = "none"
    slide1.style.display = "block"
}
document.getElementById("bubble2").onclick = function(){
    main.style.display = "none"
    slide2.style.display = "block"
}
document.getElementById("bubble3").onclick = function(){
    main.style.display = "none"
    slide3.style.display = "block"
}
document.getElementById("bubble4").onclick = function(){
    main.style.display = "none"
    slide4.style.display = "block"
}
document.getElementById("bubble5").onclick = function(){
    main.style.display = "none"
    slide5.style.display = "block"
}
