window.onload = () => {
  main();
};

function main() {
  const icon = document.getElementById("icon");
  const navItems = document.querySelector(".nav__items");

  //listener
  icon.addEventListener("click", handleToggleTheme);
  navItems.addEventListener("click", e => handleActiveNavItem(e.target));
}

const handleToggleTheme = e => {
  const bodyClass = document.body.classList;
  bodyClass.toggle("night");
  if (bodyClass.contains("night")) {
    e.target.src = "./images/sun.png";
  } else {
    e.target.src = "./images/moon.png";
  }
};
const handleActiveNavItem = navLink => {
  const marker = document.querySelector(".nav__marker");
  const navLinks = document.querySelectorAll(".nav__link");

  marker.style.left = navLink.offsetLeft + "px";
  marker.style.width = navLink.offsetWidth + "px";

  navLinks.forEach(link => {
    link.classList.contains("nav__link-active") &&
      link.classList.remove("nav__link-active");
  });

  navLink.classList.add("nav__link-active");
};
