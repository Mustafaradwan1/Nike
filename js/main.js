let bars = document.querySelector(".barsI");
let navBot = document.querySelector(".nav-bot");
let close = document.querySelector(".nav-bot .close");
var x = window.matchMedia("(max-width: 992px)")


function myFunction(x) {
  if (x.matches) { 
    navBot.classList.add("hide")
      bars.addEventListener("click",()=>{
      navBot.classList.replace("hide","show")
    })
    close.addEventListener("click",()=>{
      navBot.classList.replace("show","hide")
    })
  } else {
    
    navBot.classList.remove("show")
  }
}
myFunction(x);
x.addEventListener("change", function() {
  myFunction(x);
});

