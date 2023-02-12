const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
const isMenuOpen = false;
const document2 = document.querySelector("#root");


menuButton.addEventListener("click", () => {
  menu.classList.toggle("open");
  isMenuOpen = !isMenuOpen;
});

document2.addEventListener("click", function() { 
    if (menu.classList.contains("open")) {
    menu.classList.toggle("open");
    isMenuOpen = !isMenuOpen;
    }
});

window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrolldown-menu").style.top = "50";
  } else {
    document.getElementById("scrolldown-menu").style.top = "30px";
  }
}