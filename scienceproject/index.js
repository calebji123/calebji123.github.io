

var slide1 = document.getElementById("slide1")
var slide2 = document.getElementById("slide2")
var slide3 = document.getElementById("slide3")
var slide4 = document.getElementById("slide4")
var slide5 = document.getElementById("slide5")
slide1.style.display = "none"
slide2.style.display = "none"
slide3.style.display = "none"
slide4.style.display = "none"
slide5.style.display = "none"
document.getElementById("mainMain").style.display = "none"
document.getElementById("mainMain").onclick = function(){
    main.style.display = "block"
    slide1.style.display = "none"
    slide2.style.display = "none"
    slide3.style.display = "none"
    slide4.style.display = "none"
    slide5.style.display = "none"
document.getElementById("mainMain").style.display = "none"
}
document.getElementById("bubble1").onclick = function(){
    main.style.display = "none"
    slide1.style.display = "block"
    document.getElementById("mainMain").style.display = "block"
}
document.getElementById("bubble2").onclick = function(){
    main.style.display = "none"
    slide2.style.display = "block"
    document.getElementById("mainMain").style.display = "block"
}
document.getElementById("bubble3").onclick = function(){
    main.style.display = "none"
    slide3.style.display = "block"
    document.getElementById("mainMain").style.display = "block"
}
document.getElementById("bubble4").onclick = function(){
    main.style.display = "none"
    slide4.style.display = "block"
document.getElementById("mainMain").style.display = "block"
}
document.getElementById("bubble5").onclick = function(){
    main.style.display = "none"
    slide5.style.display = "block"
document.getElementById("mainMain").style.display = "block"
}

var poaching0 = "Poaching"
var poaching1 = poaching0 + "."
var poaching2 = poaching1 + " Even"
var poaching3 = poaching2 + " though"
var poaching4 = poaching3 + " restrictions"
var poaching5 = poaching4 + " are alre"
var poaching6 = poaching5 + "ady set in place, the Wrasse population continues to fa"
var poaching7 = poaching6 + "ll. QBAEAQ"

document.getElementById("SR").onmouseover = function(){
  document.getElementById("SRimg").style.display = "inline-block"
  document.getElementById("HDimg").style.display = "none"
  document.getElementById("OFimg").style.display = "none"
  document.getElementById("PCimg").style.display = "none"
 setTimeout(function(){document.getElementById("SRimg").style.display = "none"}, 3000)
}
document.getElementById("SR").onclick = function(){
  document.getElementById("explain").innerHTML = "Slow Recovery. The Wrasse reproduces slowly, making it more vulnerable to overfishing."
}

document.getElementById("HD").onmouseover = function(){
  document.getElementById("HDimg").style.display = "inline-block"
  document.getElementById("SRimg").style.display = "none"
  document.getElementById("OFimg").style.display = "none"
  document.getElementById("PCimg").style.display = "none"
setTimeout(function(){document.getElementById("HDimg").style.display = "none"}, 3000)
}
document.getElementById("HD").onclick = function(){
  document.getElementById("explain").innerHTML = "Habitat Destruction. The Wrasse is a coral fish, and its survival is closely linked with that of the  struggling coral reefs."
}

document.getElementById("OF").onmouseover = function(){
  document.getElementById("OFimg").style.display = "inline-block"
    document.getElementById("HDimg").style.display = "none"
      document.getElementById("SRimg").style.display = "none"
        document.getElementById("PCimg").style.display = "none"
  setTimeout(function(){document.getElementById("OFimg").style.display = "none"}, 3000)

}

document.getElementById("OF").onclick = function(){
  document.getElementById("explain").innerHTML = "Overfishing. The Wrasse is a prized food fish, popular in SE Asia. Its market price is up to $130.00 per kilogram USD."
}

document.getElementById("PC").onmouseover = function(){
  document.getElementById("PCimg").style.display = "inline-block"
  document.getElementById("HDimg").style.display = "none"
    document.getElementById("SRimg").style.display = "none"
      document.getElementById("OFimg").style.display = "none"
  setTimeout(function(){document.getElementById("PCimg").style.display = "none"}, 3000)

}
document.getElementById("PC").onclick = function(){
  document.getElementById("explain").innerHTML = poaching7
}
