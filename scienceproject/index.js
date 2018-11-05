

var slide1 = document.getElementById("slide1")
var slide2 = document.getElementById("slide2")
var slide3 = document.getElementById("slide3")
var slide4 = document.getElementById("slide4")
slide1.style.display = "none"
slide2.style.display = "none"
slide3.style.display = "none"
slide4.style.display = "none"


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
