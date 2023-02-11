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
