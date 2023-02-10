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



/*
var menuToggleButton = document.querySelector(".menu-button");
var menuContainer = document.querySelector(".menu");
var isMenuOpen = false;

menuToggleButton.addEventListener("click", function() {
    isMenuOpen = !isMenuOpen;
    menuContainer.style.display = isMenuOpen ? "block" : "none";
  });


  document.addEventListener("click", function(event) {
    if (isMenuOpen && event.target !== menuButton && menu.contains(event.target)) {
      isMenuOpen = false;
      menu.classList.toggle("open");
    }
  });
*/