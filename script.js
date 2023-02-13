const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
const isMenuOpen = false;
const document2 = document.querySelector("#root");
const scrolldownConatiner = document.getElementById("scrolldown-menu-container")
const scrolldownNavbar = document.getElementById("scrolldown-menu-navbar")

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
  const fontSize = parseFloat(getComputedStyle(document.body).fontSize);
  const screenWidth = window.innerWidth / fontSize;
  let threshold;

  switch (true) {
    case screenWidth >= 100:
      threshold = 320;
      break;
    case screenWidth >= 80:
      threshold = 250;
      break;
    case screenWidth >= 60:
      threshold = 220;
      break;
    case screenWidth >= 50:
      threshold = 190;
      break;
    case screenWidth >= 20:
      threshold = 0;
      break;
    default:
      threshold = 0;
  }

  if (window.pageYOffset > threshold) {
    scrolldownConatiner.classList.add("open");
  } else {
    scrolldownConatiner.classList.remove("open");
  }
}