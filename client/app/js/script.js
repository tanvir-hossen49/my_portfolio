let activeNav = ["0px", "51px"];

window.onload = () => {
  main();
};

function main() {
  const icon = document.getElementById("icon");
  const navItemContainer = document.querySelector(".nav__items");
  const navItems = document.querySelectorAll(".nav__item");
  const hamburger = document.querySelector(".hamburger");

  //listener
  icon.addEventListener("click", handleToggleTheme);
  navItems.forEach(navItem => {
    navItem.addEventListener("click", e => handleActiveNavItem(e.target));
    navItem.addEventListener("mouseenter", e => showActiveIndicator(e.target));
    navItem.addEventListener("mouseout", () => resetActiveIndicator());
  });
  hamburger.addEventListener("click", () =>
    handleHideAndShowNav(hamburger, navItemContainer)
  );
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

  const offsetLeft = navLink.offsetLeft + "px";
  const offsetWidth = navLink.offsetWidth + "px";

  marker.style.left = offsetLeft;
  marker.style.width = offsetWidth;

  activeNav = [offsetLeft, offsetWidth];

  navLinks.forEach(link => {
    link.classList.contains("nav__link-active") &&
      link.classList.remove("nav__link-active");
  });

  navLink.classList.add("nav__link-active");
};

const handleHideAndShowNav = (hamburger, navItem) => {
  hamburger.classList.toggle("active");
  navItem.classList.toggle("active");
};

const showActiveIndicator = navLink => {
  const marker = document.querySelector(".nav__marker");

  const offsetLeft = navLink.offsetLeft + "px";
  const offsetWidth = navLink.offsetWidth + "px";

  marker.style.left = offsetLeft;
  marker.style.width = offsetWidth;
};

const resetActiveIndicator = () => {
  const marker = document.querySelector(".nav__marker");
  marker.style.left = activeNav[0];
  marker.style.width = activeNav[1];
};
